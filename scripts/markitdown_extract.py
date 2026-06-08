#!/usr/bin/env python3
"""
MarkItDown Document Extraction Service

Converts PDF, DOCX, XLSX, PPTX, HTML, and other formats to structured Markdown.
A drop-in replacement for pdftotext/textutil.

Usage:
  python3 markitdown_extract.py <file_path>           # prints markdown to stdout
  python3 markitdown_extract.py <file_path> --json     # prints JSON {text, format, pages}
  python3 markitdown_extract.py --serve --port 8787    # HTTP server mode
"""

import sys
import os
import json
import argparse
from pathlib import Path

try:
    from markitdown import MarkItDown
except ImportError:
    print("Error: markitdown not installed. Run: pip3 install 'markitdown[all]'", file=sys.stderr)
    sys.exit(1)


def extract_file(file_path: str) -> dict:
    """Convert a file to markdown and return metadata."""
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    md = MarkItDown()
    result = md.convert(str(path))

    text = result.text_content or ""

    return {
        "text": text,
        "format": path.suffix.lstrip(".").lower(),
        "filename": path.name,
        "chars": len(text),
    }


def main():
    parser = argparse.ArgumentParser(description="Convert documents to Markdown via MarkItDown")
    parser.add_argument("file", nargs="?", help="File path to convert")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    parser.add_argument("--serve", action="store_true", help="Run as HTTP server")
    parser.add_argument("--port", type=int, default=8787, help="Server port (default: 8787)")

    args = parser.parse_args()

    if args.serve:
        run_server(args.port)
        return

    if not args.file:
        parser.print_help()
        sys.exit(1)

    try:
        result = extract_file(args.file)
        if args.json:
            print(json.dumps(result, ensure_ascii=False))
        else:
            print(result["text"])
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


def run_server(port: int):
    """Simple HTTP server for document extraction."""
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import tempfile
    import cgi

    class Handler(BaseHTTPRequestHandler):
        def do_POST(self):
            if self.path != "/extract":
                self.send_error(404)
                return

            content_type = self.headers.get("Content-Type", "")

            if "multipart/form-data" in content_type:
                # File upload
                form = cgi.FieldStorage(
                    fp=self.rfile,
                    headers=self.headers,
                    environ={"REQUEST_METHOD": "POST",
                             "CONTENT_TYPE": content_type}
                )
                file_item = form["file"]
                if not file_item.filename:
                    self.send_error(400, "No file uploaded")
                    return

                # Save to temp file
                suffix = Path(file_item.filename).suffix
                with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
                    tmp.write(file_item.file.read())
                    tmp_path = tmp.name

                try:
                    result = extract_file(tmp_path)
                    result["filename"] = file_item.filename
                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(json.dumps(result, ensure_ascii=False).encode())
                except Exception as e:
                    self.send_response(500)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": str(e)}).encode())
                finally:
                    os.unlink(tmp_path)
            else:
                self.send_error(400, "Expected multipart/form-data")

        def do_OPTIONS(self):
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()

        def log_message(self, format, *args):
            print(f"[markitdown] {args[0]}", file=sys.stderr)

    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"[markitdown] Extraction server running at http://127.0.0.1:{port}/extract")
    print(f"[markitdown] POST a file to /extract to convert to markdown")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[markitdown] Server stopped")


if __name__ == "__main__":
    main()

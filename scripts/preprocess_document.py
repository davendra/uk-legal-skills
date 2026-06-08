#!/usr/bin/env python3
"""
Document Pre-processor for UK Legal Skills CLI Skills

Converts any supported document to structured Markdown before Claude analyses it.
Called by skills to improve analysis quality — Claude gets headings, tables, and
paragraph numbers instead of flat text.

Usage:
  python3 preprocess_document.py <file_path>              # markdown to stdout
  python3 preprocess_document.py <file_path> --out file.md # save to file
  python3 preprocess_document.py <url>                     # fetch URL and convert

Supports: PDF, DOCX, PPTX, XLSX, HTML, TXT, MD, CSV, JSON, XML
Requires: pip install 'markitdown[all]'
"""

import sys
import os
import tempfile
import argparse
from pathlib import Path

try:
    from markitdown import MarkItDown
except ImportError:
    print("Error: markitdown not installed.", file=sys.stderr)
    print("Install: pip install 'markitdown[all]'", file=sys.stderr)
    sys.exit(1)


def convert_file(file_path: str) -> str:
    """Convert a local file to markdown."""
    md = MarkItDown()
    result = md.convert(file_path)
    return result.text_content or ""


def convert_url(url: str) -> str:
    """Fetch a URL and convert to markdown."""
    import urllib.request

    # Download to temp file
    suffix = ".html"
    if url.endswith(".pdf"):
        suffix = ".pdf"
    elif url.endswith(".docx"):
        suffix = ".docx"

    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        urllib.request.urlretrieve(url, tmp.name)
        tmp_path = tmp.name

    try:
        return convert_file(tmp_path)
    finally:
        os.unlink(tmp_path)


def main():
    parser = argparse.ArgumentParser(
        description="Convert documents to structured Markdown for AI analysis"
    )
    parser.add_argument("input", help="File path or URL")
    parser.add_argument("--out", help="Output file (default: stdout)")
    args = parser.parse_args()

    input_path = args.input

    try:
        if input_path.startswith("http://") or input_path.startswith("https://"):
            text = convert_url(input_path)
        elif Path(input_path).exists():
            text = convert_file(input_path)
        else:
            print(f"Error: '{input_path}' is not a valid file or URL", file=sys.stderr)
            sys.exit(1)

        if not text.strip():
            print("Warning: no text extracted", file=sys.stderr)
            sys.exit(1)

        if args.out:
            Path(args.out).write_text(text, encoding="utf-8")
            print(f"Saved: {args.out} ({len(text)} chars)", file=sys.stderr)
        else:
            print(text)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

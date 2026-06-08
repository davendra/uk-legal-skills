#!/usr/bin/env python3
"""
UK Legal Skills — Branded PDF Report Generator

Generates professional A4 PDF reports from review-result JSON files.
Usage: python3 generate_branded_pdf.py <input.json> [output.pdf]
"""

import json
import sys
import os
import math
from datetime import datetime

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable,
)
from reportlab.graphics.shapes import Drawing, Circle, Wedge, String, Line, Rect
from reportlab.graphics import renderPDF

# ---------------------------------------------------------------------------
# Brand colours
# ---------------------------------------------------------------------------
GOLD = HexColor("#b8941e")
GOLD_LIGHT = HexColor("#f5eedc")
DARK = HexColor("#0f172a")
DARK_CARD = HexColor("#1a2540")
TEXT_PRIMARY = HexColor("#1a1a1a")
TEXT_SECONDARY = HexColor("#555555")
TEXT_MUTED = HexColor("#888888")
BORDER = HexColor("#e0e0e0")
BG_LIGHT = HexColor("#fafbfd")
WHITE = HexColor("#ffffff")

RISK_CRITICAL = HexColor("#dc2626")
RISK_HIGH = HexColor("#ea580c")
RISK_WARNING = HexColor("#d97706")
RISK_ACCEPTABLE = HexColor("#2563eb")
RISK_STRONG = HexColor("#16a34a")

PAGE_W, PAGE_H = A4
MARGIN = 2 * cm


# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------
def make_styles():
    return {
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=22,
                                leading=26, textColor=DARK, spaceAfter=4),
        "subtitle": ParagraphStyle("subtitle", fontName="Helvetica", fontSize=11,
                                   leading=14, textColor=TEXT_SECONDARY, spaceAfter=12),
        "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=14,
                             leading=18, textColor=DARK, spaceBefore=18, spaceAfter=8),
        "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11,
                             leading=14, textColor=DARK, spaceBefore=12, spaceAfter=4),
        "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5,
                               leading=13, textColor=TEXT_PRIMARY, spaceAfter=6),
        "body_muted": ParagraphStyle("body_muted", fontName="Helvetica", fontSize=9,
                                     leading=12, textColor=TEXT_SECONDARY, spaceAfter=4),
        "small": ParagraphStyle("small", fontName="Helvetica", fontSize=8,
                                leading=10, textColor=TEXT_MUTED),
        "disclaimer": ParagraphStyle("disclaimer", fontName="Helvetica-Oblique", fontSize=7.5,
                                     leading=10, textColor=TEXT_MUTED, spaceAfter=6),
        "badge": ParagraphStyle("badge", fontName="Helvetica-Bold", fontSize=8,
                                leading=10, textColor=white),
    }


# ---------------------------------------------------------------------------
# Score gauge drawing
# ---------------------------------------------------------------------------
def draw_score_gauge(score, grade, size=100):
    d = Drawing(size, size + 20)
    cx, cy = size / 2, size / 2 + 10

    # Background circle
    d.add(Circle(cx, cy, size / 2 - 4, fillColor=HexColor("#f0f0f0"),
                 strokeColor=BORDER, strokeWidth=1))

    # Score arc
    angle = 360 * (score / 100)
    colour = RISK_STRONG if score > 80 else RISK_ACCEPTABLE if score > 60 else RISK_WARNING if score > 40 else RISK_CRITICAL
    if angle > 0:
        d.add(Wedge(cx, cy, size / 2 - 4, 90, 90 - angle,
                    fillColor=colour, strokeColor=None, strokeWidth=0))
    # Inner white circle
    d.add(Circle(cx, cy, size / 2 - 14, fillColor=white, strokeColor=None))

    # Score text
    d.add(String(cx, cy + 6, str(score), fontName="Helvetica-Bold",
                 fontSize=28, fillColor=DARK, textAnchor="middle"))
    d.add(String(cx, cy - 12, f"Grade {grade}", fontName="Helvetica",
                 fontSize=10, fillColor=colour, textAnchor="middle"))
    return d


# ---------------------------------------------------------------------------
# Header / footer
# ---------------------------------------------------------------------------
def header_footer(canvas_obj, doc):
    canvas_obj.saveState()

    # Header bar
    canvas_obj.setFillColor(DARK)
    canvas_obj.rect(0, PAGE_H - 18 * mm, PAGE_W, 18 * mm, fill=1, stroke=0)

    # Gold accent line
    canvas_obj.setStrokeColor(GOLD)
    canvas_obj.setLineWidth(2)
    canvas_obj.line(0, PAGE_H - 18 * mm, PAGE_W, PAGE_H - 18 * mm)

    # Brand name
    canvas_obj.setFillColor(white)
    canvas_obj.setFont("Helvetica-Bold", 12)
    canvas_obj.drawString(MARGIN, PAGE_H - 12.5 * mm, "UK Legal Skills")

    # Tagline
    canvas_obj.setFillColor(GOLD)
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.drawRightString(PAGE_W - MARGIN, PAGE_H - 10 * mm,
                               "AI-Powered Legal Analysis")
    canvas_obj.setFillColor(HexColor("#94a3b8"))
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.drawRightString(PAGE_W - MARGIN, PAGE_H - 14 * mm,
                               "England & Wales")

    # Footer
    canvas_obj.setStrokeColor(BORDER)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(MARGIN, 12 * mm, PAGE_W - MARGIN, 12 * mm)

    canvas_obj.setFillColor(TEXT_MUTED)
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.drawString(MARGIN, 8 * mm,
                          "AI-generated analysis. Not legal advice. Always consult a qualified solicitor.")
    canvas_obj.drawRightString(PAGE_W - MARGIN, 8 * mm,
                               f"Page {doc.page}")

    canvas_obj.restoreState()


# ---------------------------------------------------------------------------
# Risk badge colour
# ---------------------------------------------------------------------------
def risk_colour(score):
    if score <= 30:
        return RISK_STRONG
    if score <= 60:
        return RISK_WARNING
    if score <= 80:
        return RISK_HIGH
    return RISK_CRITICAL


def risk_label(score):
    if score <= 30:
        return "Low"
    if score <= 60:
        return "Medium"
    if score <= 80:
        return "High"
    return "Critical"


def priority_colour(priority):
    return {
        "critical": RISK_CRITICAL,
        "high": RISK_HIGH,
        "medium": RISK_WARNING,
        "low": RISK_STRONG,
    }.get(priority, TEXT_MUTED)


# ---------------------------------------------------------------------------
# Table helpers
# ---------------------------------------------------------------------------
def styled_table(data, col_widths=None):
    """Create a professionally styled table."""
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style = [
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 8),
        ("FONTSIZE", (0, 1), (-1, -1), 8.5),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("TEXTCOLOR", (0, 0), (-1, 0), TEXT_SECONDARY),
        ("TEXTCOLOR", (0, 1), (-1, -1), TEXT_PRIMARY),
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#f5f5f5")),
        ("LINEBELOW", (0, 0), (-1, 0), 1.5, GOLD),
        ("LINEBELOW", (0, 1), (-1, -2), 0.5, BORDER),
        ("LINEBELOW", (0, -1), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]
    t.setStyle(TableStyle(style))
    return t


# ---------------------------------------------------------------------------
# Build report
# ---------------------------------------------------------------------------
def build_report(data, output_path):
    styles = make_styles()

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 14 * mm,
        bottomMargin=MARGIN,
    )

    story = []
    review_type = data.get("type", "contract")
    score = data.get("score", data.get("ir35Score", 50))
    grade = data.get("grade", "N/A")
    if review_type == "ir35":
        score = data.get("ir35Score", score)

    # --- Title section ---
    story.append(Paragraph(data.get("documentName", "Untitled"), styles["title"]))

    type_labels = {
        "contract": "Contract Review",
        "employment": "Employment Review",
        "ir35": "IR35 Assessment",
        "compliance": "Compliance Audit",
    }
    date_str = data.get("date", "")
    try:
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        date_display = dt.strftime("%d %B %Y")
    except Exception:
        date_display = date_str

    story.append(Paragraph(
        f"{type_labels.get(review_type, 'Review')}  &middot;  {date_display}",
        styles["subtitle"]
    ))

    # Gold separator
    story.append(HRFlowable(width="100%", thickness=2, color=GOLD, spaceAfter=12))

    # --- Score gauge ---
    gauge = draw_score_gauge(score, grade if review_type != "ir35" else
                             data.get("status", "borderline").title())
    story.append(gauge)
    story.append(Spacer(1, 8))

    # --- Summary ---
    story.append(Paragraph("Executive Summary", styles["h2"]))
    story.append(Paragraph(data.get("summary", ""), styles["body"]))

    # --- Metadata ---
    meta = data.get("metadata", {})
    if meta:
        story.append(Spacer(1, 6))
        meta_data = [["Parties", "Governing Law", "Contract Type", "Effective Date", "Total Value"]]
        meta_data.append([
            ", ".join(meta.get("parties", [])),
            meta.get("governingLaw", ""),
            meta.get("contractType", ""),
            meta.get("effectiveDate", ""),
            meta.get("totalValue", ""),
        ])
        avail = PAGE_W - 2 * MARGIN
        meta_table = styled_table(meta_data, col_widths=[avail * 0.25, avail * 0.18,
                                                          avail * 0.22, avail * 0.17, avail * 0.18])
        story.append(meta_table)

    # --- Clause-by-clause analysis ---
    clauses = data.get("clauses", [])
    if clauses:
        story.append(Spacer(1, 8))
        story.append(Paragraph("Clause-by-Clause Analysis", styles["h2"]))

        # Stats row
        high = sum(1 for c in clauses if c.get("riskScore", 0) > 60)
        med = sum(1 for c in clauses if 30 < c.get("riskScore", 0) <= 60)
        low = sum(1 for c in clauses if c.get("riskScore", 0) <= 30)
        stats_text = (f"<b>{len(clauses)}</b> clauses analysed &nbsp;&middot;&nbsp; "
                      f'<font color="#dc2626"><b>{high}</b> High Risk</font> &nbsp;&middot;&nbsp; '
                      f'<font color="#d97706"><b>{med}</b> Medium</font> &nbsp;&middot;&nbsp; '
                      f'<font color="#16a34a"><b>{low}</b> Low</font>')
        story.append(Paragraph(stats_text, styles["body"]))
        story.append(Spacer(1, 6))

        sorted_clauses = sorted(clauses, key=lambda c: c.get("riskScore", 0), reverse=True)

        for clause in sorted_clauses:
            rs = clause.get("riskScore", 0)
            rc = risk_colour(rs)
            rl = risk_label(rs)

            elements = []
            # Clause header
            header_text = (f'<b>{clause.get("ref", "")} &mdash; {clause.get("title", "")}</b>'
                           f'&nbsp;&nbsp;'
                           f'<font color="{TEXT_MUTED.hexval()}" size="8">{clause.get("category", "")}</font>'
                           f'&nbsp;&nbsp;'
                           f'<font color="{rc.hexval()}" size="8"><b>{rl} ({rs})</b></font>')
            elements.append(Paragraph(header_text, styles["body"]))

            # Clause text
            elements.append(Paragraph(clause.get("text", ""), styles["body_muted"]))

            # Issues
            issues = clause.get("issues", [])
            if issues:
                elements.append(Spacer(1, 3))
                elements.append(Paragraph('<font color="#d97706"><b>Issues:</b></font>', styles["small"]))
                for issue in issues:
                    elements.append(Paragraph(f"&bull; {issue}", styles["body_muted"]))

            # Recommendation
            rec = clause.get("recommendation", "")
            if rec:
                elements.append(Spacer(1, 3))
                elements.append(Paragraph('<font color="#16a34a"><b>Recommendation:</b></font>', styles["small"]))
                elements.append(Paragraph(rec, styles["body_muted"]))

            elements.append(Spacer(1, 8))
            elements.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8))
            story.append(KeepTogether(elements))

    # --- Recommendations ---
    recs = data.get("recommendations", data.get("contractAmendments", []))
    if recs:
        story.append(Paragraph("Prioritised Recommendations", styles["h2"]))

        rec_data = [["Priority", "Clause", "Issue", "Recommended Change"]]
        avail = PAGE_W - 2 * MARGIN
        for r in recs:
            rec_data.append([
                r.get("priority", "").title(),
                r.get("clause", ""),
                Paragraph(r.get("issue", ""), styles["body_muted"]),
                Paragraph(r.get("replacementText", ""), styles["body_muted"]),
            ])
        rec_table = styled_table(rec_data, col_widths=[avail * 0.1, avail * 0.1,
                                                        avail * 0.35, avail * 0.45])
        # Colour the priority cells
        for i, r in enumerate(recs, start=1):
            pc = priority_colour(r.get("priority", ""))
            rec_table.setStyle(TableStyle([
                ("TEXTCOLOR", (0, i), (0, i), pc),
                ("FONTNAME", (0, i), (0, i), "Helvetica-Bold"),
            ]))
        story.append(rec_table)

    # --- Frameworks (compliance type) ---
    frameworks = data.get("frameworks", [])
    if frameworks:
        story.append(Spacer(1, 8))
        story.append(Paragraph("Framework Scores", styles["h2"]))

        fw_data = [["Framework", "Score", "Max", "Weight", "Status"]]
        for fw in frameworks:
            status = fw.get("status", "")
            sc = RISK_STRONG if status == "pass" else RISK_WARNING if status == "warning" else RISK_CRITICAL
            fw_data.append([
                fw.get("name", ""),
                str(fw.get("score", "")),
                str(fw.get("maxScore", "")),
                f'{fw.get("weight", "")}%',
                status.title(),
            ])
        avail = PAGE_W - 2 * MARGIN
        fw_table = styled_table(fw_data, col_widths=[avail * 0.35, avail * 0.12,
                                                      avail * 0.12, avail * 0.12, avail * 0.15])
        # Colour status cells
        for i, fw in enumerate(frameworks, start=1):
            status = fw.get("status", "")
            sc = RISK_STRONG if status == "pass" else RISK_WARNING if status == "warning" else RISK_CRITICAL
            fw_table.setStyle(TableStyle([
                ("TEXTCOLOR", (4, i), (4, i), sc),
                ("FONTNAME", (4, i), (4, i), "Helvetica-Bold"),
            ]))
        story.append(fw_table)

    # --- Check Items (compliance) ---
    checks = data.get("checkItems", [])
    if checks:
        story.append(Spacer(1, 8))
        story.append(Paragraph("Compliance Check Items", styles["h2"]))

        check_data = [["Framework", "Ref", "Check", "Status", "Notes"]]
        for ci in checks:
            check_data.append([
                ci.get("framework", ""),
                ci.get("ref", ""),
                Paragraph(ci.get("check", ""), styles["body_muted"]),
                ci.get("status", "").title(),
                Paragraph(ci.get("notes", ""), styles["body_muted"]),
            ])
        avail = PAGE_W - 2 * MARGIN
        check_table = styled_table(check_data, col_widths=[avail * 0.15, avail * 0.08,
                                                            avail * 0.30, avail * 0.10, avail * 0.37])
        # Colour status
        for i, ci in enumerate(checks, start=1):
            status = ci.get("status", "")
            sc = (RISK_STRONG if status == "pass" else RISK_WARNING if status == "warning"
                  else RISK_CRITICAL if status == "fail" else TEXT_MUTED)
            check_table.setStyle(TableStyle([
                ("TEXTCOLOR", (3, i), (3, i), sc),
                ("FONTNAME", (3, i), (3, i), "Helvetica-Bold"),
            ]))
        story.append(check_table)

    # --- ERA 2025 Dashboard (employment) ---
    era = data.get("era2025Dashboard", [])
    if era:
        story.append(Spacer(1, 8))
        story.append(Paragraph("ERA 2025 Compliance Dashboard", styles["h2"]))

        era_data = [["Right", "Legislation", "Status", "Notes"]]
        for item in era:
            era_data.append([
                item.get("right", ""),
                Paragraph(item.get("legislation", ""), styles["body_muted"]),
                item.get("status", "").title(),
                Paragraph(item.get("notes", ""), styles["body_muted"]),
            ])
        avail = PAGE_W - 2 * MARGIN
        era_table = styled_table(era_data, col_widths=[avail * 0.22, avail * 0.22,
                                                        avail * 0.10, avail * 0.46])
        for i, item in enumerate(era, start=1):
            status = item.get("status", "")
            sc = (RISK_STRONG if status == "pass" else RISK_WARNING if status == "warning"
                  else RISK_CRITICAL if status == "fail" else TEXT_MUTED)
            era_table.setStyle(TableStyle([
                ("TEXTCOLOR", (2, i), (2, i), sc),
                ("FONTNAME", (2, i), (2, i), "Helvetica-Bold"),
            ]))
        story.append(era_table)

    # --- Equality Act Matrix (employment) ---
    eq = data.get("equalityActMatrix", [])
    if eq:
        story.append(Spacer(1, 8))
        story.append(Paragraph("Equality Act 2010 Matrix", styles["h2"]))

        eq_data = [["Characteristic", "Status", "Risk Level", "Notes"]]
        for item in eq:
            eq_data.append([
                item.get("characteristic", ""),
                item.get("status", "").title(),
                item.get("riskLevel", ""),
                Paragraph(item.get("notes", ""), styles["body_muted"]),
            ])
        avail = PAGE_W - 2 * MARGIN
        eq_table = styled_table(eq_data, col_widths=[avail * 0.22, avail * 0.10,
                                                      avail * 0.12, avail * 0.56])
        story.append(eq_table)

    # --- IR35 Factors ---
    factors = data.get("factors", [])
    if factors:
        story.append(Spacer(1, 8))
        story.append(Paragraph("IR35 Factor Analysis", styles["h2"]))

        f_data = [["Status", "Factor", "Score", "Evidence"]]
        for f in factors:
            status = f.get("status", "")
            indicator = ("Inside" if status == "inside" else
                         "Outside" if status == "outside" else "Neutral")
            f_data.append([
                indicator,
                f.get("name", ""),
                str(f.get("score", "")),
                Paragraph(f.get("evidence", ""), styles["body_muted"]),
            ])
        avail = PAGE_W - 2 * MARGIN
        f_table = styled_table(f_data, col_widths=[avail * 0.10, avail * 0.18,
                                                    avail * 0.08, avail * 0.64])
        for i, f in enumerate(factors, start=1):
            status = f.get("status", "")
            sc = RISK_CRITICAL if status == "inside" else RISK_STRONG if status == "outside" else RISK_WARNING
            f_table.setStyle(TableStyle([
                ("TEXTCOLOR", (0, i), (0, i), sc),
                ("FONTNAME", (0, i), (0, i), "Helvetica-Bold"),
            ]))
        story.append(f_table)

    # --- Financial Exposure ---
    fe = data.get("financialExposure", {})
    if fe and fe.get("total"):
        story.append(Spacer(1, 8))
        story.append(Paragraph(f'Financial Exposure: <b>{fe["total"]}</b>', styles["h2"]))
        breakdown = fe.get("breakdown", [])
        if breakdown:
            fe_data = [["Item", "Amount"]]
            for item in breakdown:
                fe_data.append([item.get("item", ""), item.get("amount", "")])
            avail = PAGE_W - 2 * MARGIN
            fe_table = styled_table(fe_data, col_widths=[avail * 0.65, avail * 0.35])
            story.append(fe_table)

    # --- Disclaimer ---
    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8))
    story.append(Paragraph(
        "This analysis was generated by UK Legal Skills and does not constitute legal advice. "
        "It is intended for informational purposes only and should not be relied upon as a "
        "substitute for professional legal counsel. Always consult a qualified solicitor for "
        "advice specific to your circumstances. This analysis applies to the laws of England "
        "&amp; Wales only.",
        styles["disclaimer"]
    ))
    story.append(Paragraph(
        f"Generated: {datetime.now().strftime('%d %B %Y at %H:%M')} &nbsp;&middot;&nbsp; "
        f"UK Legal Skills &nbsp;&middot;&nbsp; https://github.com/davendra/uk-legal-skills",
        styles["disclaimer"]
    ))

    # Build
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f"PDF saved: {output_path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 generate_branded_pdf.py <input.json> [output.pdf]")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else input_path.replace(".json", ".pdf")

    with open(input_path) as f:
        data = json.load(f)

    build_report(data, output_path)

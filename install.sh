#!/bin/bash
# ============================================================================
# AI Legal UK · The Counsel — Claude Code Skills Installer
# A junior counsel in your pocket. 38 Skills · 12 Agents · PDF Reports · Caselaw
# ============================================================================
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                              ║${NC}"
echo -e "${BLUE}║${NC}   ${CYAN}AI Legal UK · The Counsel${NC}                                 ${BLUE}║${NC}"
echo -e "${BLUE}║${NC}   ${YELLOW}A junior counsel in your pocket.${NC}                          ${BLUE}║${NC}"
echo -e "${BLUE}║${NC}   ${GREEN}38 Skills · 12 Agents · 11 Categories · England & Wales${NC}   ${BLUE}║${NC}"
echo -e "${BLUE}║                                                              ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ---------------------------------------------------------------------------
# Detect script directory (handle both local and curl | bash)
# ---------------------------------------------------------------------------
GITHUB_REPO="davendra/uk-legal-skills"
TEMP_DIR=""

if [ -n "${BASH_SOURCE[0]}" ] && [ "${BASH_SOURCE[0]}" != "bash" ]; then
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    if [ -f "$SCRIPT_DIR/install.sh" ] && [ -d "$SCRIPT_DIR/skills" ]; then
        SOURCE_DIR="$SCRIPT_DIR"
        echo -e "${GREEN}Installing from local directory:${NC} $SOURCE_DIR"
    else
        SCRIPT_DIR=""
    fi
fi

if [ -z "${SCRIPT_DIR:-}" ] || [ ! -d "${SOURCE_DIR:-}" ]; then
    echo -e "${YELLOW}Cloning from GitHub...${NC}"
    TEMP_DIR=$(mktemp -d)
    if command -v git &>/dev/null; then
        git clone --depth 1 "https://github.com/$GITHUB_REPO.git" "$TEMP_DIR/repo" 2>/dev/null
        SOURCE_DIR="$TEMP_DIR/repo"
    else
        echo -e "${RED}Error: git is required for remote installation.${NC}"
        echo "Install git or run install.sh from a local clone."
        exit 1
    fi
    echo -e "${GREEN}Cloned successfully.${NC}"
fi

# ---------------------------------------------------------------------------
# Target directories
# ---------------------------------------------------------------------------
SKILLS_DIR="$HOME/.claude/skills"
AGENTS_DIR="$HOME/.claude/agents"

# ---------------------------------------------------------------------------
# Check for Claude Code
# ---------------------------------------------------------------------------
echo -e "${BLUE}Checking prerequisites...${NC}"
if command -v claude &>/dev/null; then
    echo -e "  ${GREEN}✓${NC} Claude Code found"
else
    echo -e "  ${YELLOW}⚠${NC} Claude Code CLI not found (skills will still be installed)"
fi

# ---------------------------------------------------------------------------
# Create directories
# ---------------------------------------------------------------------------
echo -e "${BLUE}Creating directories...${NC}"
mkdir -p "$SKILLS_DIR/legal/scripts"
mkdir -p "$SKILLS_DIR/legal/templates"
echo -e "  ${GREEN}✓${NC} Skills directory ready"

mkdir -p "$AGENTS_DIR"
echo -e "  ${GREEN}✓${NC} Agents directory ready"

# ---------------------------------------------------------------------------
# Install main skill orchestrator
# ---------------------------------------------------------------------------
echo -e "${BLUE}Installing skills...${NC}"

INSTALL_COUNT=0

if [ -f "$SOURCE_DIR/legal/SKILL.md" ]; then
    cp "$SOURCE_DIR/legal/SKILL.md" "$SKILLS_DIR/legal/SKILL.md"
    echo -e "  ${GREEN}✓${NC} legal (orchestrator)"
    INSTALL_COUNT=$((INSTALL_COUNT + 1))
fi

# ---------------------------------------------------------------------------
# Install all sub-skills (auto-detected from skills/ directory)
# ---------------------------------------------------------------------------
for skill_dir in "$SOURCE_DIR"/skills/legal-*/; do
    skill=$(basename "$skill_dir")
    if [ -f "$skill_dir/SKILL.md" ]; then
        mkdir -p "$SKILLS_DIR/$skill"
        cp "$skill_dir/SKILL.md" "$SKILLS_DIR/$skill/SKILL.md"
        echo -e "  ${GREEN}✓${NC} $skill"
        INSTALL_COUNT=$((INSTALL_COUNT + 1))
    fi
done

# ---------------------------------------------------------------------------
# Install all agents (auto-detected from agents/ directory)
# ---------------------------------------------------------------------------
echo -e "${BLUE}Installing agents...${NC}"

AGENT_COUNT=0
for agent_file in "$SOURCE_DIR"/agents/legal-*.md; do
    if [ -f "$agent_file" ]; then
        agent=$(basename "$agent_file" .md)
        cp "$agent_file" "$AGENTS_DIR/$agent.md"
        echo -e "  ${GREEN}✓${NC} $agent"
        AGENT_COUNT=$((AGENT_COUNT + 1))
    fi
done

# ---------------------------------------------------------------------------
# Install Python scripts
# ---------------------------------------------------------------------------
echo -e "${BLUE}Installing scripts...${NC}"

SCRIPT_COUNT=0
for script in "$SOURCE_DIR"/scripts/*.py; do
    if [ -f "$script" ]; then
        cp "$script" "$SKILLS_DIR/legal/scripts/"
        echo -e "  ${GREEN}✓${NC} $(basename "$script")"
        SCRIPT_COUNT=$((SCRIPT_COUNT + 1))
    fi
done

# ---------------------------------------------------------------------------
# Install templates
# ---------------------------------------------------------------------------
echo -e "${BLUE}Installing templates...${NC}"

TEMPLATE_COUNT=0
for template in "$SOURCE_DIR"/templates/*.md; do
    if [ -f "$template" ]; then
        cp "$template" "$SKILLS_DIR/legal/templates/"
        echo -e "  ${GREEN}✓${NC} $(basename "$template")"
        TEMPLATE_COUNT=$((TEMPLATE_COUNT + 1))
    fi
done

# ---------------------------------------------------------------------------
# Check Python dependencies
# ---------------------------------------------------------------------------
echo -e "${BLUE}Checking Python environment...${NC}"

if command -v python3 &>/dev/null; then
    echo -e "  ${GREEN}✓${NC} Python 3 found: $(python3 --version 2>&1)"
else
    echo -e "  ${RED}✗${NC} Python 3 not found — required for PDF reports and MarkItDown"
fi

# Check reportlab
if python3 -c "import reportlab" 2>/dev/null; then
    echo -e "  ${GREEN}✓${NC} reportlab installed (PDF reports)"
else
    echo -e "  ${YELLOW}⚠${NC} reportlab not installed (needed for PDF reports)"
    echo -e "      Install with: ${CYAN}pip3 install reportlab${NC}"
fi

# Check markitdown
if python3 -c "from markitdown import MarkItDown" 2>/dev/null; then
    echo -e "  ${GREEN}✓${NC} markitdown installed (structured document extraction)"
else
    echo -e "  ${YELLOW}⚠${NC} markitdown not installed (optional — improves document analysis)"
    echo -e "      Install with: ${CYAN}pip3 install 'markitdown[all]'${NC}"
fi

# ---------------------------------------------------------------------------
# Cleanup temp dir if used
# ---------------------------------------------------------------------------
if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
    echo -e "  ${GREEN}✓${NC} Cleaned up temporary files"
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Installation Complete!                                      ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${CYAN}Skills:${NC}    $INSTALL_COUNT installed  →  $SKILLS_DIR"
echo -e "  ${CYAN}Agents:${NC}    $AGENT_COUNT installed  →  $AGENTS_DIR"
echo -e "  ${CYAN}Scripts:${NC}   $SCRIPT_COUNT installed  →  $SKILLS_DIR/legal/scripts"
echo -e "  ${CYAN}Templates:${NC} $TEMPLATE_COUNT installed  →  $SKILLS_DIR/legal/templates"
echo ""

# ---------------------------------------------------------------------------
# Command reference (grouped by category)
# ---------------------------------------------------------------------------
echo -e "${BLUE}Command Reference (38 commands):${NC}"
echo ""
echo -e "  ${YELLOW}CASE LAW:${NC}"
echo -e "    ${CYAN}/legal caselaw <query>${NC}         Search 63,000+ UK court judgments"
echo ""
echo -e "  ${YELLOW}CONTRACT ANALYSIS:${NC}"
echo -e "    ${CYAN}/legal first-read <file>${NC}        Senior Counsel triage (<15s)"
echo -e "    ${CYAN}/legal review <file>${NC}            Full contract review (5 agents)"
echo -e "    ${CYAN}/legal risks <file>${NC}             Deep risk analysis (likelihood × tier)"
echo -e "    ${CYAN}/legal compare <f1> <f2>${NC}        Side-by-side comparison"
echo -e "    ${CYAN}/legal plain <file>${NC}             Plain English translation"
echo -e "    ${CYAN}/legal negotiate <file>${NC}         Counter-proposal generator"
echo -e "    ${CYAN}/legal missing <file>${NC}           Missing protections finder"
echo -e "    ${CYAN}/legal benchmark <file>${NC}         Market-standard benchmarking"
echo ""
echo -e "  ${YELLOW}PROPERTY:${NC}"
echo -e "    ${CYAN}/legal property <file>${NC}          Property document analysis"
echo -e "    ${CYAN}/legal tenancy <file>${NC}           Tenancy review (RRA 2025)"
echo ""
echo -e "  ${YELLOW}EMPLOYMENT & CORPORATE:${NC}"
echo -e "    ${CYAN}/legal employment <file>${NC}        Employment review (4 agents)"
echo -e "    ${CYAN}/legal corporate <file>${NC}         Corporate review (3 agents)"
echo -e "    ${CYAN}/legal ir35 <file>${NC}              IR35 status determination"
echo -e "    ${CYAN}/legal aml <file>${NC}               AML/KYC compliance"
echo -e "    ${CYAN}/legal immigration <file>${NC}       Immigration compliance"
echo ""
echo -e "  ${YELLOW}DOCUMENT GENERATION:${NC}"
echo -e "    ${CYAN}/legal nda <description>${NC}        Generate custom NDA"
echo -e "    ${CYAN}/legal terms <url>${NC}              Generate terms of service"
echo -e "    ${CYAN}/legal privacy <url>${NC}            Generate privacy policy"
echo -e "    ${CYAN}/legal agreement <type>${NC}         Generate business agreements"
echo -e "    ${CYAN}/legal freelancer <file>${NC}        Freelancer contract review"
echo -e "    ${CYAN}/legal board-pack <details>${NC}     Board pack generation"
echo ""
echo -e "  ${YELLOW}COMPLIANCE & REPORTING:${NC}"
echo -e "    ${CYAN}/legal compliance <url>${NC}         Compliance gap analysis"
echo -e "    ${CYAN}/legal gdpr <file>${NC}              GDPR deep-dive"
echo -e "    ${CYAN}/legal consumer <file>${NC}          Consumer protection"
echo -e "    ${CYAN}/legal esg <file>${NC}               ESG compliance"
echo -e "    ${CYAN}/legal ai-compliance <file>${NC}     AI compliance"
echo -e "    ${CYAN}/legal legislation-tracker <file>${NC} Legislation currency"
echo -e "    ${CYAN}/legal regulatory-calendar${NC}      Filing calendar"
echo -e "    ${CYAN}/legal pre-launch <product>${NC}     Pre-Launch Counsel — UK regulatory gate"
echo -e "    ${CYAN}/legal report-pdf${NC}               Professional PDF report"
echo ""
echo -e "  ${YELLOW}MATTER MANAGEMENT:${NC}"
echo -e "    ${CYAN}/legal matter-brief <matter>${NC}    State-of-the-matter brief"
echo ""
echo -e "  ${YELLOW}SPECIALIST:${NC}"
echo -e "    ${CYAN}/legal dispute <file>${NC}           Dispute resolution"
echo -e "    ${CYAN}/legal due-diligence <file>${NC}     M&A due diligence"
echo -e "    ${CYAN}/legal ip <file>${NC}                Intellectual property"
echo -e "    ${CYAN}/legal debt <file>${NC}              Debt recovery"
echo -e "    ${CYAN}/legal wills <file>${NC}             Wills & probate"
echo ""
echo -e "  ${YELLOW}UTILITY:${NC}"
echo -e "    ${CYAN}/legal fetch-samples${NC}            Download sample documents"
echo ""
echo -e "  ${YELLOW}Tip:${NC} Start with ${CYAN}/legal review <file>${NC} for a full contract analysis!"
echo ""

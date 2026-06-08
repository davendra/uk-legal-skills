#!/bin/bash
# ============================================================================
# AI Legal Assistant — Uninstaller
# ============================================================================
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SKILLS_DIR="$HOME/.claude/skills"
AGENTS_DIR="$HOME/.claude/agents"

echo ""
echo -e "${BLUE}Uninstalling AI Legal UK...${NC}"
echo ""

# Remove orchestrator
if [ -d "$SKILLS_DIR/legal" ]; then
    rm -rf "$SKILLS_DIR/legal"
    echo -e "  ${GREEN}✓${NC} Removed legal (orchestrator)"
fi

# Remove all legal-* skills
SKILL_COUNT=0
for skill_dir in "$SKILLS_DIR"/legal-*/; do
    if [ -d "$skill_dir" ]; then
        skill=$(basename "$skill_dir")
        rm -rf "$skill_dir"
        echo -e "  ${GREEN}✓${NC} Removed $skill"
        SKILL_COUNT=$((SKILL_COUNT + 1))
    fi
done

# Remove all legal-* agents
AGENT_COUNT=0
for agent_file in "$AGENTS_DIR"/legal-*.md; do
    if [ -f "$agent_file" ]; then
        agent=$(basename "$agent_file" .md)
        rm "$agent_file"
        echo -e "  ${GREEN}✓${NC} Removed agent: $agent"
        AGENT_COUNT=$((AGENT_COUNT + 1))
    fi
done

echo ""
echo -e "${GREEN}Uninstall complete.${NC}"
echo -e "  Removed $SKILL_COUNT skills and $AGENT_COUNT agents."
echo -e "  Your Claude Code installation is otherwise unchanged."
echo ""

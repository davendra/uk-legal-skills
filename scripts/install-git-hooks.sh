#!/usr/bin/env bash
# One-shot installer: copies repo-tracked git hooks into .git/hooks/.
# Run from the repo root: ./scripts/install-git-hooks.sh

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
src="$repo_root/scripts/git-hooks"
dst="$repo_root/.git/hooks"

if [ ! -d "$src" ]; then
  echo "No hooks to install (missing $src)." >&2
  exit 1
fi

for hook in "$src"/*; do
  [ -f "$hook" ] || continue
  name="$(basename "$hook")"
  cp "$hook" "$dst/$name"
  chmod +x "$dst/$name"
  echo "Installed $name"
done

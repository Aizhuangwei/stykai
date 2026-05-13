#!/bin/bash
# Daily Content Generator for STYK Ai
# Generates 1 new English article per day (review / alternatives / comparison)
# Called by cron at 06:00 UTC (14:00 CST) daily

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CONTENT_DIR="$PROJECT_DIR/src/lib/content"
STATE_FILE="$PROJECT_DIR/scripts/content-state.json"
LOG_FILE="$PROJECT_DIR/scripts/content.log"
TODAY=$(date +%Y-%m-%d)

mkdir -p "$CONTENT_DIR" "$(dirname "$LOG_FILE")"

# Content schedule - rotates through categories
# Each entry: type,toolId,targetKeywords
SCHEDULE=(
  "review,grok,grok xai,grok 2026,xAI Grok review"
  "alternatives,perplexity,perplexity free,perplexity pro,elicit ai"
  "comparison,chatgpt,claude vs chatgpt,deepseek vs chatgpt"
  "review,deepseek,deepseek ai,deepseek review 2026"
  "alternatives,n8n,n8n alternatives,workflow automation"
  "review,leonardo,leonardo ai,leonardo ai review"
  "alternatives,github-copilot,github copilot pricing,copilot alternatives"
  "review,veed-io,veed io,veed io review"
  "alternatives,midjourney,dalle alternatives,midjourney alternatives free"
  "review,claude,claude AI,claude review 2026"
)

# Get today's content (cycle through schedule)
DAY_INDEX=$(( $(date +%j) % ${#SCHEDULE[@]} ))
IFS=',' read -ra ENTRY <<< "${SCHEDULE[$DAY_INDEX]}"
TYPE="${ENTRY[0]}"
TOOL_ID="${ENTRY[1]}"
KEYWORDS="${ENTRY[*]:2}"

CONTENT_SLUG="${TYPE}-${TOOL_ID}-${TODAY}"

echo "[$TODAY] Generating: $TYPE/$TOOL_ID ($KEYWORDS)" >> "$LOG_FILE"

# Record state
echo "{\"date\":\"$TODAY\",\"type\":\"$TYPE\",\"toolId\":\"$TOOL_ID\",\"keywords\":\"$KEYWORDS\",\"status\":\"generated\"}" > "$STATE_FILE"

echo "Daily content generation complete: $TYPE - $TOOL_ID"
echo "Next step: Manually write and commit content/article-${TODAY}.md to the project"

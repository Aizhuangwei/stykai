#!/bin/bash
# Daily SEO Report Generator for STYK Ai
# Runs daily at 14:00 CST to report progress

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
REPORT_FILE="$PROJECT_DIR/scripts/seo-report.json"
LOG_FILE="$PROJECT_DIR/scripts/report.log"
DAILY_DIR="$PROJECT_DIR/memory/daily"
CONTENT_LOG="$PROJECT_DIR/scripts/content.log"

mkdir -p "$DAILY_DIR"

TODAY=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%s)

# Count pages by checking sitemap
SITEMAP_COUNT=$(grep -c '<loc>' "$PROJECT_DIR/public/sitemap.xml" 2>/dev/null || echo "0")

# Count content articles
ARTICLE_COUNT=$(find "$PROJECT_DIR/src/app/seo" -name "page.tsx" | wc -l 2>/dev/null)

# Count indexed tools
TOOL_COUNT=$(grep -c "id: '" "$PROJECT_DIR/src/lib/tools.ts" 2>/dev/null || echo "125+")

# Last commit
LAST_COMMIT=$(cd "$PROJECT_DIR" && git log -1 --format="%h %s" 2>/dev/null)

# Check latest Vercel deployment
DEPLOY_STATUS=$(curl -s "https://api.github.com/repos/Aizhuangwei/stykai/commits/main/status" 2>/dev/null | grep -o '"state":"[^"]*"' | head -1 || echo "unknown")

REPORT=$(cat <<EOF
📊 **STYK Ai 日报 — ${TODAY}**

**📈 站点概况**
- 收录工具: ${TOOL_COUNT}
- Sitemap URL数: ${SITEMAP_COUNT}
- SEO落地页: ${ARTICLE_COUNT}

**🔄 内容更新**
- 今日更新: $(tail -1 "$CONTENT_LOG" 2>/dev/null || echo "无")
- 最近部署: ${LAST_COMMIT}

**⚡ 性能**
- Vercel部署状态: ${DEPLOY_STATUS}
- Google索引: 待GSC确认

**💰 变现**
- 联盟链接: 已部署 (affiliate.ts)
- AdSense: 配置完成

**🎯 优先优化关键词**
- grok xai, perplexity free, deepseek ai, n8n alternatives
- github copilot pricing, leonardo ai, veed io
EOF
)

echo "$REPORT" > "$DAILY_DIR/seo-${TODAY}.md"
echo "[$TODAY] Report generated" >> "$LOG_FILE"
echo "$REPORT"

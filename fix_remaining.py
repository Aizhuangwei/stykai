#!/usr/bin/env python3
"""Final translation cleanup - fix remaining Chinese in tools.ts"""
import re

with open('src/lib/tools.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire getSeoPageData and getBestForData blocks
# Find where getSeoPageData starts
seo_start = content.find('export function getSeoPageData()')
bestfor_end = content.find('export function getBestForData()')
# Find end of getBestForData (after the closing })
after_bestfor = content.find('\n}', bestfor_end) + 2

# New SEO data in English
new_seo = """export function getSeoPageData() {
  return {
    'best-ai-tools': {
      title: 'Best AI Tools 2026 - Top 82+ Ranked & Reviewed',
      description: 'Discover 82+ best AI tools across 8 categories with real ratings and pros & cons analysis. Find the perfect AI tool for you.',
      h1: 'Best AI Tools 2026: Top Picks Ranked & Reviewed',
      intro: 'We curated 82+ of the best AI tools across every category. Below are our top recommendations organized by category.',
    },
    'ai-writing-tools': {
      title: 'Best AI Writing Tools 2026 - Top 10 Compared',
      description: 'Compare 10+ best AI writing tools including ChatGPT, Claude, Grammarly, Notion AI and more. Full feature, pricing, and pros & cons analysis.',
      h1: 'Best AI Writing Tools Compared',
      intro: 'AI writing tools help you create content efficiently, optimize copy, and improve grammar. Here are the best AI writing tools ranked by score.',
    },
    'ai-tools-for-students': {
      title: 'Best AI Tools for Students 2026 - Boost Learning Efficiency',
      description: 'Essential AI tools for students covering writing, research, programming, and note management to boost learning efficiency.',
      h1: 'Best AI Tools for Students',
      intro: 'AI tools can help you write papers, do research, learn programming, and manage notes. Here are the best AI tools for students.',
    },
    'ai-tools-for-business': {
      title: 'Best Enterprise AI Tools 2026 - Boost Business Productivity',
      description: 'Curated AI tools for business teams covering marketing, productivity, data analysis, and content creation. Drive team efficiency and growth.',
      h1: 'Best AI Tools for Business',
      intro: 'Business teams can use AI tools to boost productivity, optimize marketing, and automate workflows. Here are the best AI tools for businesses.',
    },
    'chatgpt-alternatives': {
      title: 'Best ChatGPT Alternatives 2026 - Top 10+ Compared',
      description: 'Looking for ChatGPT alternatives? We compared 10+ alternatives including Claude, DeepSeek, Gemini, and more. Full feature, pricing, and pros & cons analysis.',
      h1: 'Best ChatGPT Alternatives',
      intro: 'ChatGPT is powerful, but other excellent AI conversational tools are worth trying. Here are the best ChatGPT alternatives.',
    },
    'midjourney-alternatives': {
      title: 'Best Midjourney Alternatives 2026 - Top Image Tools',
      description: 'Looking for Midjourney alternatives? Compare DALL-E 3, Stable Diffusion, Leonardo, and more to find your best fit.',
      h1: 'Best Midjourney Alternatives',
      intro: 'Midjourney is great, but other AI image generation tools have unique advantages. Here are the best alternatives to consider.',
    },
    'notion-ai-alternatives': {
      title: 'Best Notion AI Alternatives 2026 - Top Note Tools',
      description: 'Looking for Notion AI alternatives? Compare Mem.ai, Taskade and other AI knowledge management tools.',
      h1: 'Best Notion AI Alternatives',
      intro: 'Notion AI is convenient, but other AI note and knowledge management tools each have unique strengths. Here are the best alternatives.',
    },
    'chatgpt-vs-claude': {
      title: 'ChatGPT vs Claude 2026: Detailed Comparison - Which Is Better?',
      description: 'Comprehensive ChatGPT vs Claude comparison: features, pricing, pros & cons, use cases. Decide which AI assistant best fits your needs.',
      h1: 'ChatGPT vs Claude: Detailed Comparison',
      intro: 'ChatGPT and Claude are the two most popular AI assistants. Each has unique strengths. Here is our detailed comparison.',
    },
    'midjourney-vs-dalle': {
      title: 'Midjourney vs DALL-E 3 2026: Which AI Image Generator Is Better?',
      description: 'Comprehensive Midjourney vs DALL-E 3 comparison: image quality, text rendering, pricing, user experience.',
      h1: 'Midjourney vs DALL-E 3: Detailed Comparison',
      intro: 'Midjourney and DALL-E 3 are the two leading AI image generation tools. They have different styles and strengths.',
    },
  };
}

export function getBestForData() {
  return {
    'content-creation': { title: 'Best AI Tools for Content Creation', desc: 'Best AI tools for content creators, covering writing, image, and video generation.', tag: 'Content Creation' },
    'programming': { title: 'Best AI Tools for Programming', desc: 'Best AI programming tools designed for developers to boost code efficiency.', tag: 'Programming' },
    'design': { title: 'Best AI Tools for Design', desc: 'Essential AI tools for designers and creative professionals.', tag: 'Design' },
    'marketing': { title: 'Best AI Tools for Marketing', desc: 'Best AI tools for marketing teams to boost conversions and efficiency.', tag: 'Marketing' },
    'education': { title: 'Best AI Tools for Education', desc: 'Must-see AI tools for students and educators to improve learning efficiency.', tag: 'Education' },
    'research': { title: 'Best AI Tools for Research', desc: 'Best AI tools for academic researchers to accelerate literature review and discovery.', tag: 'Research' },
  };
}"""

# Replace the block
content = content[:seo_start] + new_seo + content[after_bestfor:]

# Fix generateFAQs - replace the Chinese template
# Find the faqs block
faq_markers = [
    ("`${tool.name} 核心功能包括：", "`Core features of ${tool.name} include: "),
    ("${tool.tags.join('、')}", "${tool.tags.join(', ')}"),
    ("${tool.useCases.join('、')}", "${tool.useCases.join(', ')}"),
    ("${tool.prosCons.pros.join('、')}", "${tool.prosCons.pros.join(', ')}"),
    ("${tool.prosCons.cons.join('、')}", "${tool.prosCons.cons.join(', ')}"),
    ("${tool.prosCons.pros.slice(0, 2).join('和')}", "${tool.prosCons.pros.slice(0, 2).join(' and ')}"),
]

for old, new in faq_markers:
    content = content.replace(old, new)

# Fix specific FAQ question/answer patterns
faq_texts = [
    ("`What is ${tool.name}?`", "`What is ${tool.name}?`"),  # already English from earlier
]

# Check for any remaining Chinese
remaining = len(re.findall(r'[\u4e00-\u9fff]', content))
print(f"Remaining Chinese chars: {remaining}")

if remaining > 0:
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if re.search(r'[\u4e00-\u9fff]', line) and not line.strip().startswith('//'):
            print(f"  L{i+1}: {line.strip()[:100]}")

with open('src/lib/tools.ts', 'w', encoding='utf-8') as f:
    f.write(content)

if remaining == 0:
    print("\n✅ SUCCESS: All Chinese content translated to English!")
else:
    print(f"\n⚠️ {remaining} Chinese chars remaining")

#!/usr/bin/env python3
"""Generate fully translated English version of tools.ts"""
import re, json

with open('src/lib/tools.ts.bak', 'r', encoding='utf-8') as f:
    content = f.read()

# Get all tool IDs
tool_ids = re.findall(r"id: '([^']+)'", content)
print(f"Found {len(tool_ids)} tools: {', '.join(tool_ids[:5])}...")

# ===== TRANSLATION DATA =====
# Using a TSV-like approach: tool_id|field=value
# This is the actual translation execution

# For a clean output, we'll directly replace known Chinese patterns
replacements = {
    # Pricing labels
    "'免费'": "'Free'",
    "'免费+付费'": "'Free + Paid'",
    "'付费'": "'Paid'",
    
    # Category names already English - good
    
    # SEO page titles/descriptions/h1 (Chinese -> English)
    "2025年最好用的 AI 工具推荐 Top 82+ | 精选评测排行": "Best AI Tools 2026 - Top 82+ Ranked & Reviewed",
    "精选 82+ 款最好用的 AI 工具，涵盖写作、图像、编程、视频等 8 大分类。真实评分、优缺点分析，帮你找到最适合的 AI 工具。": "Discover 82+ best AI tools across 8 categories. Real ratings, pros & cons to find the perfect AI tool for you.",
    "2025年最好用的 AI 工具推荐": "Best AI Tools 2026: Top Picks Ranked & Reviewed",
    "AI 工具爆发式增长的时代，我们从 82+ 款工具中精选出各分类最值得使用的产品。以下是按分类整理的最佳 AI 工具推荐。": "In the age of AI explosion, we have curated 82+ best AI tools across every category. Below are our top recommendations.",
    
    "AI 写作工具推荐 Top 10 | 2025年最好用的 AI 写作助手": "Best AI Writing Tools 2026 - Top 10 Compared",
    "精选 10+ 款 AI 写作工具，对比 ChatGPT、Claude、Grammarly、Notion AI 等。从功能、定价、优缺点全面评测。": "Compare 10+ best AI writing tools including ChatGPT, Claude, Grammarly, Notion AI and more. Full feature and pricing analysis.",
    "AI 写作工具推荐": "Best AI Writing Tools Compared",
    "AI 写作工具可以帮助你更高效地创作内容、优化文案、改进语法。以下是精选的 AI 写作工具，按评分排序。": "AI writing tools help you create content, optimize copy, and improve grammar. Here are the best AI writing tools ranked by score.",
    
    "适合学生的 AI 工具推荐 | 学习效率提升必备": "Best AI Tools for Students 2026 - Boost Learning Efficiency",
    "学生必备的 AI 工具推荐，涵盖写作辅助、研究搜索、编程学习、笔记管理等场景，帮助提升学习效率。": "Essential AI tools for students covering writing, research, programming, and note management to boost learning efficiency.",
    "学生必看的 AI 工具推荐": "Best AI Tools for Students",
    "作为学生，AI 工具可以帮你写论文、做研究、学编程、管理笔记。以下是专为学生精选的 AI 工具。": "AI tools can help you write papers, do research, learn programming, and manage notes. Here are the best AI tools for students.",
    
    "企业级 AI 工具推荐 | 提升业务效率的 AI 解决方案": "Best Enterprise AI Tools 2026 - Boost Business Productivity",
    "为企业团队精选的 AI 工具，涵盖营销、生产力、数据分析、内容创作等场景。提升团队效率，驱动业务增长。": "Curated AI tools for business teams covering marketing, productivity, data analysis, and content creation.",
    "企业级 AI 工具推荐": "Best AI Tools for Business",
    "企业团队可以使用 AI 工具提高生产力、优化营销、自动化工作流。以下是适合企业的 AI 工具推荐。": "Business teams can use AI tools to boost productivity, optimize marketing, and automate workflows.",
    
    "ChatGPT 替代方案 | 2025年最佳替代工具推荐": "Best ChatGPT Alternatives 2026 - Top 10+ Compared",
    "寻找 ChatGPT 替代品？我们精选了 Claude、DeepSeek、Gemini 等 10+ 款替代工具，从功能、定价、优缺点全面对比。": "Looking for ChatGPT alternatives? We compared 10+ alternatives including Claude, DeepSeek, Gemini, and more.",
    "ChatGPT 替代工具推荐": "Best ChatGPT Alternatives",
    "ChatGPT 虽然强大，但还有其他优秀的 AI 对话工具值得尝试。以下是不错的 ChatGPT 替代方案。": "ChatGPT is powerful, but other excellent AI tools are worth trying. Here are the best ChatGPT alternatives.",
    
    "Midjourney 替代方案 | 2025年最佳 AI 图像生成工具推荐": "Best Midjourney Alternatives 2026 - Top Image Tools",
    "寻找 Midjourney 替代品？对比 DALL-E 3、Stable Diffusion、Leonardo、Canva AI 等图像生成工具，找到最适合你的选择。": "Looking for Midjourney alternatives? Compare DALL-E 3, Stable Diffusion, Leonardo, and more.",
    "Midjourney 替代工具推荐": "Best Midjourney Alternatives",
    "Midjourney 虽好，但其他 AI 图像生成工具也有独特的优势。以下是值得关注的 Midjourney 替代方案。": "Midjourney is great, but other AI image tools have unique advantages. Here are the best alternatives.",
    
    "Notion AI 替代方案 | 2025年最佳 AI 笔记知识管理工具": "Best Notion AI Alternatives 2026 - Top Note Tools",
    "寻找 Notion AI 替代品？对比 Mem.ai、Taskade、Obsidian 等 AI 知识管理工具，找到更适合你的笔记方案。": "Looking for Notion AI alternatives? Compare Mem.ai, Taskade and other AI knowledge management tools.",
    "Notion AI 替代工具推荐": "Best Notion AI Alternatives",
    "Notion AI 虽然集成方便，但其他 AI 笔记和知识管理工具也各具特色。以下是值得尝试的替代方案。": "Notion AI is convenient, but other AI note tools each have unique strengths. Here are the best alternatives.",
    
    "ChatGPT vs Claude 详细对比 | 哪个更适合你？": "ChatGPT vs Claude 2026: Detailed Comparison - Which Is Better?",
    "ChatGPT 和 Claude 全面对比：功能、定价、优缺点、使用场景。帮你决定哪个 AI 助手最适合你的需求。": "Comprehensive ChatGPT vs Claude comparison: features, pricing, pros & cons, use cases.",
    "ChatGPT vs Claude：详细对比评测": "ChatGPT vs Claude: Detailed Comparison",
    "ChatGPT 和 Claude 是当前最受欢迎的两款 AI 对话助手。它们各有特色，适合不同的使用场景。以下是详细对比。": "ChatGPT and Claude are the two most popular AI assistants. Each has unique strengths. Here is our detailed comparison.",
    
    "Midjourney vs DALL-E 3 详细对比 | AI 图像生成工具怎么选？": "Midjourney vs DALL-E 3 2026: Which AI Image Generator Is Better?",
    "Midjourney 和 DALL-E 3 全面对比：图像质量、文字渲染、定价、使用体验。帮你选择最适合的 AI 图像生成工具。": "Comprehensive Midjourney vs DALL-E 3 comparison: image quality, text rendering, pricing, user experience.",
    "Midjourney vs DALL-E 3：详细对比评测": "Midjourney vs DALL-E 3: Detailed Comparison",
    "Midjourney 和 DALL-E 3 是 AI 图像生成领域的两大标杆。它们风格不同，各有擅长领域。以下是详细对比。": "Midjourney and DALL-E 3 are the two leading AI image generation tools. They have different styles and strengths.",
    
    # getPricingLabel
    "免费": "Free",
    "免费+付费": "Free + Paid",
    "付费": "Paid",
    
    # generateFAQs Chinese templates -> English
    " 是什么？": " Overview",
    " 收费吗？": " Pricing",
    " 有哪些主要功能？": " Key Features",
    " 适合哪些人使用？": " Who Is It For?",
    " 有什么优缺点？": " Pros & Cons",
    "采用": "uses",
    "模式。": " pricing model. ",
    "完全免费使用。": "It is completely free to use.",
    "提供免费版本，付费版本有更多功能和额度。": "A free version is available. The paid version offers more features and credits.",
    "需要付费订阅才能使用全部功能。": "A paid subscription is required to access all features.",
    "的核心功能包括：": " core features include: ",
    "。主要应用于": ". Main use cases: ",
    " 等场景。": ".",
    " 适合需要": " is ideal for users who need ",
    " 的用户。": ".",
    " 是其突出优势。": " are its key strengths.",
    "优点包括：": "Pros include: ",
    "。不足之处：": ". Cons: ",
    "。总体评分": ". Overall rating: ",
    
    # getBestForData
    "内容创作最佳 AI 工具": "Best AI Tools for Content Creation",
    "适合内容创作者的最佳 AI 工具，涵盖写作、图像、视频生成等。": "Best AI tools for content creators, covering writing, image, and video generation.",
    "内容创作": "Content Creation",
    "编程开发最佳 AI 工具": "Best AI Tools for Programming",
    "专为开发者设计的最佳 AI 编程工具，提升代码效率。": "Best AI programming tools designed for developers to boost code efficiency.",
    "编程": "Programming",
    "设计创意最佳 AI 工具": "Best AI Tools for Design",
    "设计师和创意工作者必备的 AI 工具推荐。": "Essential AI tools for designers and creative professionals.",
    "设计": "Design",
    "营销推广最佳 AI 工具": "Best AI Tools for Marketing",
    "营销团队的最佳 AI 工具，提升转化和效率。": "Best AI tools for marketing teams to boost conversions and efficiency.",
    "营销": "Marketing",
    "学习教育最佳 AI 工具": "Best AI Tools for Education",
    "学生和教育工作者必看的 AI 工具，提升学习效率。": "Must-see AI tools for students and educators to improve learning efficiency.",
    "教育": "Education",
    "学术研究最佳 AI 工具": "Best AI Tools for Research",
    "学术研究人员的最佳 AI 工具，加速文献综述和研究发现。": "Best AI tools for academic researchers to accelerate literature review and discovery.",
    "研究": "Research",
}

# Apply all replacements
for old, new in replacements.items():
    content = content.replace(old, new)

# Write the output
with open('src/lib/tools.ts', 'w', encoding='utf-8') as f:
    f.write(content)

# Count remaining Chinese
remaining = len(re.findall(r'[\u4e00-\u9fff]', content))
original = len(re.findall(r'[\u4e00-\u9fff]', open('src/lib/tools.ts.bak', encoding='utf-8').read()))
print(f"\nOriginal Chinese chars: {original}")
print(f"Remaining Chinese chars: {remaining}")
print(f"Translated: {original - remaining} chars ({((original-remaining)/original*100):.1f}%)")
print("\nDone! tools.ts has been updated.")
PYEOF

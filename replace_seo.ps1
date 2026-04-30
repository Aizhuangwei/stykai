$f = "src\lib\tools.ts"
$c = [IO.File]::ReadAllText((Resolve-Path $f), [Text.Encoding]::UTF8)

$old = @'
// SEO page descriptions
export function getSeoPageData() {
  return {
    'best-ai-tools': {
      title: '2025年最好用的 AI 工具推荐 Top 82+ | 精选评测排行',
      description: '精选 82+ 款最好用的 AI 工具，涵盖写作、图像、编程、视频等 8 大分类。真实评分、优缺点分析，帮你找到最适合的 AI 工具。',
      h1: '2025年最好用的 AI 工具推荐',
      intro: 'AI 工具爆发式增长的时代，我们从 82+ 款工具中精选出各分类最值得使用的产品。以下是按分类整理的最佳 AI 工具推荐。',
    },
    'ai-writing-tools': {
      title: 'AI 写作工具推荐 Top 10 | 2025年最好用的 AI 写作助手',
      description: '精选 10+ 款 AI 写作工具，对比 ChatGPT、Claude、Grammarly、Notion AI 等。从功能、定价、优缺点全面评测。',
      h1: 'AI 写作工具推荐',
      intro: 'AI 写作工具可以帮助你更高效地创作内容、优化文案、改进语法。以下是精选的 AI 写作工具，按评分排序。',
    },
    'ai-tools-for-students': {
      title: '适合学生的 AI 工具推荐 | 学习效率提升必备',
      description: '学生必备的 AI 工具推荐，涵盖写作辅助、研究搜索、编程学习、笔记管理等场景，帮助提升学习效率。',
      h1: '学生必看的 AI 工具推荐',
      intro: '作为学生，AI 工具可以帮你写论文、做研究、学编程、管理笔记。以下是专为学生精选的 AI 工具。',
    },
    'ai-tools-for-business': {
      title: '企业级 AI 工具推荐 | 提升业务效率的 AI 解决方案',
      description: '为企业团队精选的 AI 工具，涵盖营销、生产力、数据分析、内容创作等场景。提升团队效率，驱动业务增长。',
      h1: '企业级 AI 工具推荐',
      intro: '企业团队可以使用 AI 工具提高生产力、优化营销、自动化工作流。以下是适合企业的 AI 工具推荐。',
    },
    'chatgpt-alternatives': {
      title: 'ChatGPT 替代方案 | 2025年最佳替代工具推荐',
      description: '寻找 ChatGPT 替代品？我们精选了 Claude、DeepSeek、Gemini 等 10+ 款替代工具，从功能、定价、优缺点全面对比。',
      h1: 'ChatGPT 替代工具推荐',
      intro: 'ChatGPT 虽然强大，但还有其他优秀的 AI 对话工具值得尝试。以下是不错的 ChatGPT 替代方案。',
    },
    'midjourney-alternatives': {
      title: 'Midjourney 替代方案 | 2025年最佳 AI 图像生成工具推荐',
      description: '寻找 Midjourney 替代品？对比 DALL-E 3、Stable Diffusion、Leonardo、Canva AI 等图像生成工具，找到最适合你的选择。',
      h1: 'Midjourney 替代工具推荐',
      intro: 'Midjourney 虽好，但其他 AI 图像生成工具也有独特的优势。以下是值得关注的 Midjourney 替代方案。',
    },
    'notion-ai-alternatives': {
      title: 'Notion AI 替代方案 | 2025年最佳 AI 笔记知识管理工具',
      description: '寻找 Notion AI 替代品？对比 Mem.ai、Taskade、Obsidian 等 AI 知识管理工具，找到更适合你的笔记方案。',
      h1: 'Notion AI 替代工具推荐',
      intro: 'Notion AI 虽然集成方便，但其他 AI 笔记和知识管理工具也各具特色。以下是值得尝试的替代方案。',
    },
    'chatgpt-vs-claude': {
      title: 'ChatGPT vs Claude 详细对比 | 哪个更适合你？',
      description: 'ChatGPT 和 Claude 全面对比：功能、定价、优缺点、使用场景。帮你决定哪个 AI 助手最适合你的需求。',
      h1: 'ChatGPT vs Claude：详细对比评测',
      intro: 'ChatGPT 和 Claude 是当前最受欢迎的两款 AI 对话助手。它们各有特色，适合不同的使用场景。以下是详细对比。',
    },
    'midjourney-vs-dalle': {
      title: 'Midjourney vs DALL-E 3 详细对比 | AI 图像生成工具怎么选？',
      description: 'Midjourney 和 DALL-E 3 全面对比：图像质量、文字渲染、定价、使用体验。帮你选择最适合的 AI 图像生成工具。',
      h1: 'Midjourney vs DALL-E 3：详细对比评测',
      intro: 'Midjourney 和 DALL-E 3 是 AI 图像生成领域的两大标杆。它们风格不同，各有擅长领域。以下是详细对比。',
    },
  };
}
'@

$new = @'
// SEO page descriptions
export function getSeoPageData() {
  return {
    'best-ai-tools': {
      title: 'Best AI Tools in 2026 | Top 82+ AI Tools Reviewed & Compared',
      description: 'Discover the best AI tools in 2026. 82+ tools across writing, image, coding, video & more categories. Compare features, pricing, pros & cons.',
      h1: 'Best AI Tools in 2026',
      intro: 'The AI landscape is exploding. We have curated 82+ of the best AI tools across every category — from writing and coding to image generation and video editing. Find the perfect tool for your needs.',
    },
    'ai-writing-tools': {
      title: 'Best AI Writing Tools 2026 | Top 10 Writing Assistants Compared',
      description: 'Compare the best AI writing tools: ChatGPT, Claude, Grammarly, Notion AI, and more. Features, pricing, and detailed reviews.',
      h1: 'Best AI Writing Tools 2026',
      intro: 'AI writing tools help you create content faster, optimize copy, and improve grammar. Here are the best options ranked by quality.',
    },
    'ai-tools-for-students': {
      title: 'Best AI Tools for Students 2026 | Study Smarter with AI',
      description: 'Essential AI tools for students: writing assistance, research, coding help, note-taking. Boost your study efficiency.',
      h1: 'Best AI Tools for Students',
      intro: 'AI can help you write essays, conduct research, learn coding, and manage notes. Here are the best AI tools curated for students.',
    },
    'ai-tools-for-business': {
      title: 'Best AI Tools for Business 2026 | Boost Team Productivity',
      description: 'Enterprise AI tools for marketing, productivity, data analysis, and content creation. Drive growth with AI.',
      h1: 'Best AI Tools for Business',
      intro: 'Business teams can leverage AI to boost productivity, optimize marketing, and automate workflows. Here are the top picks.',
    },
    'chatgpt-alternatives': {
      title: 'Best ChatGPT Alternatives 2026 | Top AI Chatbots Compared',
      description: 'Looking for ChatGPT alternatives? Compare Claude, DeepSeek, Gemini, and 10+ other AI chatbots. Features, pricing, pros & cons.',
      h1: 'Best ChatGPT Alternatives',
      intro: 'ChatGPT is powerful, but other AI chatbots offer unique advantages. Here are the best ChatGPT alternatives worth trying.',
    },
    'midjourney-alternatives': {
      title: 'Best Midjourney Alternatives 2026 | Top AI Image Generators',
      description: 'Compare DALL-E 3, Stable Diffusion, Leonardo, Canva AI and more. Find the best Midjourney alternative for your needs.',
      h1: 'Best Midjourney Alternatives',
      intro: 'Midjourney is great, but other AI image generators have unique strengths. Here are the best alternatives to consider.',
    },
    'notion-ai-alternatives': {
      title: 'Best Notion AI Alternatives 2026 | AI Note-Taking & Knowledge Tools',
      description: 'Compare Mem.ai, Taskade, Obsidian and more. Find the best Notion AI alternative for your note-taking workflow.',
      h1: 'Best Notion AI Alternatives',
      intro: 'Notion AI is convenient, but other AI note-taking and knowledge tools offer compelling features. Here are the top alternatives.',
    },
    'chatgpt-vs-claude': {
      title: 'ChatGPT vs Claude 2026: Detailed Comparison | Which is Better?',
      description: 'ChatGPT vs Claude: comprehensive comparison of features, pricing, pros, cons, and use cases. Find out which AI assistant suits you best.',
      h1: 'ChatGPT vs Claude: Detailed Comparison',
      intro: 'ChatGPT and Claude are the two most popular AI assistants. Each has unique strengths for different use cases. Here is our detailed comparison.',
    },
    'midjourney-vs-dalle': {
      title: 'Midjourney vs DALL-E 3 2026: Comparison | Best AI Image Generator',
      description: 'Midjourney vs DALL-E 3: compare image quality, text rendering, pricing, and user experience. Find your ideal AI image generator.',
      h1: 'Midjourney vs DALL-E 3: Detailed Comparison',
      intro: 'Midjourney and DALL-E 3 are the two leading AI image generators. Each excels in different areas. Here is our full comparison.',
    },
  };
}
'@

$c = $c.Replace($old, $new)
[IO.File]::WriteAllText((Resolve-Path $f), $c, [Text.Encoding]::UTF8)
Write-Host "Done - getSeoPageData updated to English"

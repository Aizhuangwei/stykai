#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'src', 'lib', 'tools.ts');

const tools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: "ChatGPT by OpenAI is the most widely adopted AI chatbot, powered by GPT-4 and GPT-4o models. It excels at natural conversation, code generation, creative writing, data analysis, and image understanding through multimodal capabilities. With custom GPTs and plugins, it serves as the Swiss Army knife of AI tools. The free tier offers GPT-3.5, while ChatGPT Plus unlocks GPT-4, DALL-E 3, and advanced data analysis. Used by over 100 million users, it supports 95+ languages and can process documents, generate images, browse the internet, and execute Python code in real-time.",
    shortDesc: "World's most versatile AI assistant for conversation, coding, and creation",
    url: 'https://chat.openai.com',
    category: 'writing',
    tags: ['AI Chatbot', 'GPT-4', 'Conversational AI', 'Writing Assistant', 'Code Generation'],
    pricing: 'freemium',
    useCases: ['Content creation and copywriting', 'Programming and debugging', 'Data analysis and visualization', 'Language translation', 'Brainstorming and ideation'],
    prosCons: { pros: ['Most versatile AI assistant available', 'Massive ecosystem of custom GPTs and plugins', 'Multimodal capabilities (text, image, voice)', 'Strong reasoning and coding abilities', 'Regular model updates'], cons: ['Free tier limited to GPT-3.5', 'Can produce inaccurate information', 'Context window limits on free tier', 'Heavy usage limits on Plus plan', 'Privacy concerns with data handling'] },
    officialUrl: 'https://chat.openai.com',
    score: 9.8,
    featured: true
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Claude by Anthropic is a next-generation AI assistant designed with safety at its core. The Claude 3.5 model offers an unprecedented 200K token context window, processing entire books in a single conversation. Claude excels at nuanced analysis, careful reasoning, and maintaining context over extremely long interactions. Its Constitutional AI training makes it one of the safest large language models. Claude processes uploaded images, documents (PDF, Word, Excel), and code files with remarkable accuracy.',
    shortDesc: "Best-in-class AI for long documents, analysis, and safe reasoning",
    url: 'https://claude.ai',
    category: 'writing',
    tags: ['AI Chatbot', 'Long Context', 'Document Analysis', 'Safe AI', 'Enterprise'],
    pricing: 'freemium',
    useCases: ['Long document analysis', 'Code review', 'Academic research', 'Legal document review', 'Creative writing'],
    prosCons: { pros: ['200K context window', 'Superior safety', 'Complex instructions', 'Strong analysis', 'Affordable API'], cons: ['No image generation', 'Smaller ecosystem', 'Slower responses', 'Fewer integrations', 'Less brainstorming'] },
    officialUrl: 'https://claude.ai',
    score: 9.6,
    featured: true
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Midjourney is the premier AI image generation platform, producing stunningly artistic images from text prompts. Operating through Discord, it has a massive community of artists and designers. The V6 model delivers realistic lighting, textures, and compositions rivaling professional photography. Midjourney excels at understanding artistic styles from oil painting to anime. Features include inpainting, outpainting, image variation, and style references.',
    shortDesc: 'Premium AI image generation with unmatched artistic quality',
    url: 'https://midjourney.com',
    category: 'image',
    tags: ['AI Image Generation', 'Art Creation', 'Digital Art', 'Design Tool', 'Creative AI'],
    pricing: 'paid',
    useCases: ['Digital art', 'Marketing visuals', 'Game concept art', 'Film storyboarding', 'Product design'],
    prosCons: { pros: ['Best artistic quality', 'Strong community', 'Style understanding', 'High resolution', 'Regular updates'], cons: ['Requires Discord', 'No free tier', 'Steep learning curve', 'Limited composition control', 'Costly subscription'] },
    officialUrl: 'https://midjourney.com',
    score: 9.7,
    featured: true
  },
  {
    id: 'devin',
    name: 'Devin',
    description: "Devin by Cognition Labs is the world's first fully autonomous AI software engineer. It operates with its own IDE, terminal, and browser, planning complex projects and writing thousands of lines of code. Devin handles the full software lifecycle from analysis to deployment. It maintains GitHub repos, manages dependencies, and fixes its own bugs. Set state-of-the-art SWE-bench results for autonomous issue resolution.",
    shortDesc: 'First fully autonomous AI software engineer',
    url: 'https://devin.ai',
    category: 'code',
    tags: ['AI Engineer', 'Autonomous Coding', 'Software Development', 'AI Agent', 'DevOps'],
    pricing: 'paid',
    useCases: ['Autonomous development', 'Bug fixing', 'Project prototyping', 'Code review', 'Deployment automation'],
    prosCons: { pros: ['Fully autonomous', 'Complete IDE', 'Complex planning', 'Self-debugging', 'SWE-bench proven'], cons: ['Very expensive', 'Early stage', 'Limited workflow integration', 'Resource intensive', 'Not universal'] },
    officialUrl: 'https://devin.ai',
    score: 9.3,
    featured: true
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'Cursor is the leading AI-first code editor built on VS Code with deep AI integration at every level: inline completion with project context, natural language code transformations, and AI chat referencing your codebase. The @Codebase feature searches your entire project. Supports GPT-4, Claude 3.5, and custom models. The composer implements features across multiple files from natural language.',
    shortDesc: "AI-first code editor transforming development",
    url: 'https://cursor.sh',
    category: 'code',
    tags: ['AI Code Editor', 'Development Tool', 'IDE', 'Productivity', 'Coding Assistant'],
    pricing: 'freemium',
    useCases: ['Daily development', 'Code refactoring', 'Debugging', 'Learning languages', 'Rapid prototyping'],
    prosCons: { pros: ['VS Code integration', 'Project context', 'Multiple AI models', 'Natural language', 'Productivity boost'], cons: ['Premium needed', 'Privacy concerns', 'Learning curve', 'Can be wrong', 'Latency'] },
    officialUrl: 'https://cursor.sh',
    score: 9.5,
    featured: true
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'Perplexity AI is the most advanced AI search engine combining conversational AI with real-time web search and cited sources. Provides direct answers with inline citations instead of link lists. Pro Search enables deep research asking clarifying questions. Supports file uploads including PDFs. Essential for researchers needing accurate, verifiable information quickly.',
    shortDesc: "AI-powered search engine with citations",
    url: 'https://perplexity.ai',
    category: 'search',
    tags: ['AI Search', 'Research Tool', 'Information Retrieval', 'Real-time Search', 'Citation'],
    pricing: 'freemium',
    useCases: ['Academic research', 'Market analysis', 'Fact checking', 'Learning', 'Professional reporting'],
    prosCons: { pros: ['Real-time with citations', 'Excellent research', 'Collections', 'Deep research', 'Clean interface'], cons: ['Free tier limits', 'Pro needed for advanced', 'Slow complex queries', 'Niche gaps', 'Not creative'] },
    officialUrl: 'https://perplexity.ai',
    score: 9.4,
    featured: true
  },
  {
    id: 'runway',
    name: 'Runway Gen-3',
    description: 'Runway Gen-3 Alpha is the most advanced AI video generation platform creating cinema-quality videos from text, images, or video inputs. Gen-3 delivers temporal coherence, realistic motion, and visual fidelity rivaling professional production. Offers text-to-video, image-to-video, style transfer, inpainting, and motion brush. Used by major studios for music videos and commercials.',
    shortDesc: "Leading AI video generation platform",
    url: 'https://runwayml.com',
    category: 'video',
    tags: ['AI Video', 'Video Editing', 'Creative Tools', 'Content Creation', 'Film Production'],
    pricing: 'freemium',
    useCases: ['Short-form video', 'Advertising', 'Music videos', 'Previsualization', 'Social media'],
    prosCons: { pros: ['Best AI video quality', 'Complete editing suite', 'Multiple modes', 'Professional output', 'Regular updates'], cons: ['Expensive volume', 'Long generation', 'Limited action control', 'Artifacts', 'No offline'] },
    officialUrl: 'https://runwayml.com',
    score: 9.3,
    featured: true
  },
  {
    id: 'suno',
    name: 'Suno AI',
    description: 'Suno AI is the leading AI music generation platform creating complete songs from text descriptions. Produces full compositions with lyrics, melody, and instrumentation across any genre. The V4 model delivers natural vocals and coherent song structures. Supports multiple languages and styles. Features include extending songs, remixing, and custom covers. Democratizes music creation.',
    shortDesc: 'AI music generation with complete songs',
    url: 'https://suno.ai',
    category: 'audio',
    tags: ['AI Music', 'Music Creation', 'Audio AI', 'Creative Tool', 'Song Writing'],
    pricing: 'freemium',
    useCases: ['Song creation', 'Background music', 'Commercial jingles', 'Educational music', 'Music prototyping'],
    prosCons: { pros: ['Complete songs', 'Multiple genres', 'Natural vocals', 'Easy prompts', 'Active community'], cons: ['Prompt quality dependent', 'Free tier limits', 'Copyright concerns', 'Inconsistent', 'Limited musical control'] },
    officialUrl: 'https://suno.ai',
    score: 9.1,
    featured: true
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'Notion AI is the intelligent writing assistant integrated into the Notion workspace. Works within documents, databases, and wikis. Generates drafts, summarizes meetings, translates content, fixes grammar, and creates action items. The AI understands workspace context. Accelerates documentation and knowledge management for teams. One of the most practical AI productivity tools.',
    shortDesc: "AI assistant integrated into Notion workspace",
    url: 'https://notion.so/product/ai',
    category: 'productivity',
    tags: ['AI Writing', 'Productivity Tool', 'Knowledge Management', 'Documentation', 'Team Collaboration'],
    pricing: 'paid',
    useCases: ['Document drafting', 'Meeting summarization', 'Knowledge base creation', 'Project docs', 'Content translation'],
    prosCons: { pros: ['Deep Notion integration', 'Context-aware', 'Multiple features', 'Team collaboration', 'Enhances workflows'], cons: ['Notion sub required', 'Ecosystem locked', 'Slow with big DB', 'Variable quality', 'No standalone'] },
    officialUrl: 'https://notion.so/product/ai',
    score: 8.9,
    featured: true
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    description: "The world's leading AI video platform for professional videos with realistic AI avatars. Creates studio-quality videos from text in minutes. Offers 150+ avatars and supports 120+ languages. Adopted by 50,000+ companies including half the Fortune 100 for training, marketing, and communications.",
    shortDesc: 'Professional AI avatar videos without studios',
    url: 'https://synthesia.io',
    category: 'video',
    tags: ['AI Video Avatar', 'Video Generation', 'Corporate Training', 'Marketing', 'Digital Avatar'],
    pricing: 'paid',
    useCases: ['Training videos', 'Marketing demos', 'Internal comms', 'Support tutorials', 'Video outreach'],
    prosCons: { pros: ['Professional avatars', '120+ languages', 'No equipment', 'Custom avatars', 'Enterprise security'], cons: ['Expensive', 'Avatar artifacts', 'Limited backgrounds', 'Annual contract', 'Not artistic'] },
    officialUrl: 'https://synthesia.io',
    score: 9.0,
    featured: true
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'The most widely adopted AI pair programmer powered by OpenAI Codex. Integrated into VS Code, JetBrains, and Neovim. Understands project context for completions, functions, and algorithms. Supports all major languages. Copilot Chat enables natural language code conversations. Studies show 55% faster task completion.',
    shortDesc: "GitHub's AI pair programmer",
    url: 'https://github.com/features/copilot',
    category: 'code',
    tags: ['AI Code Completion', 'Pair Programming', 'Developer Tools', 'IDE Plugin', 'Coding'],
    pricing: 'paid',
    useCases: ['Daily coding', 'Code completion', 'Debugging', 'Learning', 'Documentation'],
    prosCons: { pros: ['Deep IDE integration', 'Multi-language', 'Context-aware', 'Productivity boost', 'GitHub ecosystem'], cons: ['Paid sub', 'Insecure suggestions', 'New library gaps', 'Privacy', 'Verbose output'] },
    officialUrl: 'https://github.com/features/copilot',
    score: 9.3,
    featured: true
  },
  {
    id: 'dalle-3',
    name: 'DALL-E 3',
    description: "OpenAI's most advanced text-to-image model with superior prompt adherence. Built on ChatGPT's language understanding, renders complex prompts with specific details and text. Generates photorealistic images, illustrations, and logos. Follows multi-part prompts and handles color schemes. Integrated into ChatGPT Plus.",
    shortDesc: "OpenAI's premier text-to-image model",
    url: 'https://openai.com/dall-e-3',
    category: 'image',
    tags: ['AI Image Generation', 'Text-to-Image', 'Digital Art', 'Creative AI', 'OpenAI'],
    pricing: 'paid',
    useCases: ['Marketing visuals', 'Product prototyping', 'Educational illustrations', 'Logo creation', 'Inspiration'],
    prosCons: { pros: ['Prompt understanding', 'ChatGPT integration', 'Photorealistic', 'Text rendering', 'Safety'], cons: ['Limited resolution', 'Less style diversity', 'Requires Plus', 'Limited detail control', 'Content restrictions'] },
    officialUrl: 'https://openai.com/dall-e-3',
    score: 9.1,
    featured: true
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'The most advanced AI voice synthesis platform producing speech indistinguishable from human voices. Emotional range, natural intonation, and consistent quality. Hundreds of voices across 29 languages. Custom voice clones from minutes of audio. Speech-to-Speech transforms audio while preserving emotion. Under 200ms API latency.',
    shortDesc: "Industry-leading AI voice synthesis",
    url: 'https://elevenlabs.io',
    category: 'audio',
    tags: ['AI Voice', 'Text-to-Speech', 'Voice Cloning', 'Audio AI', 'Dubbing'],
    pricing: 'freemium',
    useCases: ['Audiobooks', 'Game voice acting', 'Dubbing', 'Voice assistants', 'Accessibility'],
    prosCons: { pros: ['Most realistic', 'Emotional range', 'Multi-language', 'Custom cloning', 'Low latency'], cons: ['Premium pricing', 'Ethical concerns', 'Free tier limits', 'Voice sample needed', 'Occasional unnaturalness'] },
    officialUrl: 'https://elevenlabs.io',
    score: 9.4,
    featured: true
  },
  {
    id: 'stable-diffusion-3',
    name: 'Stable Diffusion 3',
    description: 'The most advanced open-source image generation model from Stability AI. Runs locally, can be fine-tuned and customized. Excels at typography, accurate prompts, and multi-aspect-ratio generation. Supports text-to-image, image-to-image, inpainting, and ControlNet. Massive community creating custom models.',
    shortDesc: 'Open-source AI image generation',
    url: 'https://stability.ai',
    category: 'image',
    tags: ['Open Source', 'Image Generation', 'Self-hosted', 'AI Art', 'Text-to-Image'],
    pricing: 'free',
    useCases: ['Local generation', 'Fine-tuning', 'Commercial art', 'Research', 'Privacy-focused use'],
    prosCons: { pros: ['Free and open', 'Local privacy', 'Fine-tunable', 'Active community', 'Multiple variants'], cons: ['GPU needed', 'Technical setup', 'Quality refinement', 'No hosted platform', 'Scattered docs'] },
    officialUrl: 'https://stability.ai',
    score: 9.0,
    featured: true
  },
  {
    id: 'gamma',
    name: 'Gamma',
    description: 'AI-powered presentation platform creating stunning slide decks from text prompts. Get a structured presentation in under a minute. Supports real-time collaboration and exports to PPT, PDF, and web. AI suggests layouts and generates content. No design skills needed.',
    shortDesc: 'AI presentation generator',
    url: 'https://gamma.app',
    category: 'productivity',
    tags: ['AI Presentation', 'Slide Deck', 'Design Tool', 'Productivity', 'Business'],
    pricing: 'freemium',
    useCases: ['Business pitches', 'Educational lectures', 'Project proposals', 'Sales decks', 'Conference talks'],
    prosCons: { pros: ['Instant slides', 'Multiple exports', 'Templates', 'Collaboration', 'No design skills'], cons: ['Limited customization', 'Free tier restrictions', 'Content needs review', 'Less PPT control', 'Internet needed'] },
    officialUrl: 'https://gamma.app',
    score: 8.8
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'Comprehensive AI content creation platform for marketing teams. 50+ templates for blog posts, social media, ad copy, and landing pages. Brand voice customization for consistent messaging. Includes SEO analysis, plagiarism checking, and team collaboration.',
    shortDesc: 'AI marketing content platform',
    url: 'https://jasper.ai',
    category: 'marketing',
    tags: ['AI Content', 'Copywriting', 'Brand Voice', 'SEO', 'Marketing Automation'],
    pricing: 'paid',
    useCases: ['Blog writing', 'Social media', 'Email campaigns', 'Ad copy', 'SEO content'],
    prosCons: { pros: ['Marketing focused', 'Brand voice', '50+ templates', 'SEO built-in', 'Team features'], cons: ['Higher price', 'Needs editing', 'Learning curve', 'Generic content risk', 'No free tier'] },
    officialUrl: 'https://jasper.ai',
    score: 8.7
  },
  {
    id: 'leonardo',
    name: 'Leonardo AI',
    description: 'Powerful AI art and design platform with extensive control. Canvas editor, real-time generation, and model training for professional-grade game development and concept art. Pre-trained models for cinematic, anime, and 3D renders. Background removal and upscaling.',
    shortDesc: 'AI art platform for professionals',
    url: 'https://leonardo.ai',
    category: 'image',
    tags: ['AI Art', 'Image Generation', 'Design Tool', 'Game Assets', 'Creative AI'],
    pricing: 'freemium',
    useCases: ['Game assets', 'UI prototyping', 'Marketing visuals', 'Character design', 'Texture generation'],
    prosCons: { pros: ['Free daily tokens', 'Customization', 'Model training', 'Canvas editor', 'Real-time'], cons: ['Daily token limits', 'Overwhelming UI', 'Quality varies', 'Learning needed', 'Slow web app'] },
    officialUrl: 'https://leonardo.ai',
    score: 8.9
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: 'Versatile AI writing platform for SEO-optimized content. Chatsonic integrates ChatGPT with real-time Google search. Tools for articles, ads, emails, and landing pages. Botsonic enables custom AI chatbots. One-click blog creation and paraphrasing.',
    shortDesc: 'All-in-one AI writing platform',
    url: 'https://writesonic.com',
    category: 'writing',
    tags: ['AI Writing', 'Content Creation', 'SEO', 'Chatbot', 'Marketing'],
    pricing: 'freemium',
    useCases: ['Blog writing', 'SEO optimization', 'Ad copy', 'Social media', 'Chatbot development'],
    prosCons: { pros: ['Comprehensive tools', 'Real-time search', 'SEO features', 'Chatbot builder', 'Free trial'], cons: ['Paid needed', 'Editing required', 'Inconsistent', 'Busy interface', 'Chatbot learning'] },
    officialUrl: 'https://writesonic.com',
    score: 8.6
  },
  {
    id: 'descript',
    name: 'Descript',
    description: 'All-in-one AI audio/video editor that treats media as text. Edit videos by editing the transcript. Remove filler words, create AI clips, and generate voiceovers. Features include screen recording, multi-track editing, AI voice cloning, and transcription with speaker ID. Studio Sound enhances audio.',
    shortDesc: "AI video editor that works like a document",
    url: 'https://descript.com',
    category: 'video',
    tags: ['Video Editing', 'Audio Editing', 'Transcription', 'Podcast Tool', 'Content Creation'],
    pricing: 'freemium',
    useCases: ['Podcast editing', 'Video creation', 'Transcription', 'Screen recording', 'Voiceover'],
    prosCons: { pros: ['Text-based editing', 'Filler word removal', 'Studio Sound', 'All-in-one', 'Collaboration'], cons: ['Expensive full', 'Resource heavy', 'Not complex editing', 'Voice cloning concerns', 'Watermark'] },
    officialUrl: 'https://descript.com',
    score: 8.9
  },
  {
    id: 'replit',
    name: 'Replit AI',
    description: 'AI-powered online IDE transforming development. GhostWriter AI provides code completion and debugging. Replit Agent builds full applications from descriptions. 50+ languages with built-in hosting, deployment, and collaboration. Everything needed for full-stack browser development.',
    shortDesc: 'AI online IDE for building apps',
    url: 'https://replit.com',
    category: 'code',
    tags: ['Online IDE', 'AI Coding', 'App Development', 'Collaboration', 'Learning'],
    pricing: 'freemium',
    useCases: ['Quick prototyping', 'Learning programming', 'Collaborative dev', 'Full-stack apps', 'Deployment'],
    prosCons: { pros: ['No local setup', 'AI builds apps', 'Built-in hosting', 'Collaboration', 'Learning friendly'], cons: ['Free compute limits', 'Slow vs local', 'Less control', 'Paid for serious', 'Internet needed'] },
    officialUrl: 'https://replit.com',
    score: 8.8
  },
  {
    id: 'hugging-face',
    name: 'Hugging Face',
    description: 'The largest open-source AI community hosting 500K+ models and datasets. Tools for training, deploying, and sharing models. Spaces hosts AI demos with Gradio. AutoTrain for no-code model training. The GitHub of machine learning supporting transformers, diffusion models, and LLMs.',
    shortDesc: "World's largest open-source AI hub",
    url: 'https://huggingface.co',
    category: 'code',
    tags: ['Open Source', 'AI Models', 'ML Platform', 'Community', 'Data Science'],
    pricing: 'free',
    useCases: ['Model access', 'AI deployment', 'Custom training', 'Research', 'Spaces demos'],
    prosCons: { pros: ['Free 500K+ models', 'Active community', 'Easy deployment', 'Open-source', 'Good docs'], cons: ['Technical needed', 'Overwhelming', 'Variable quality', 'Compute limits', 'Scattered docs'] },
    officialUrl: 'https://huggingface.co',
    score: 9.2,
    featured: true
  },
  {
    id: 'pika',
    name: 'Pika Labs',
    description: 'Innovative AI video generation focusing on creativity. Pika 2.0 introduced scene ingredients for precise control. Creates stylized videos with consistent characters and smooth motion. Text-to-video, image-to-video features. Intuitive interface for non-technical creators.',
    shortDesc: 'Creative AI video platform',
    url: 'https://pika.art',
    category: 'video',
    tags: ['AI Video', 'Creative Tool', 'Video Generation', 'Content Creation', 'Animation'],
    pricing: 'freemium',
    useCases: ['Creative content', 'Animation', 'Social media video', 'Artistic experiments', 'Character animation'],
    prosCons: { pros: ['Scene ingredients', 'Artistic output', 'Easy interface', 'Active community', 'Free tier'], cons: ['Short length', 'Less photorealistic', 'Slow processing', 'Few commercial', 'Early stage'] },
    officialUrl: 'https://pika.art',
    score: 8.7
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI content platform for marketing copy and social media. Workflow automation creates content pipelines. Excels at product descriptions, social captions, email sequences, and ad copy. Brand voice for consistent messaging. Integrates with marketing tools.',
    shortDesc: 'AI content with workflow automation',
    url: 'https://copy.ai',
    category: 'marketing',
    tags: ['AI Copywriting', 'Workflow Automation', 'Marketing', 'Content Marketing', 'Ecommerce'],
    pricing: 'freemium',
    useCases: ['Marketing copy', 'Content workflows', 'Ecommerce descriptions', 'Social media', 'Email sequences'],
    prosCons: { pros: ['Workflow automation', 'Ecommerce focus', 'Multi-step', 'Clean interface', 'Integrations'], cons: ['Free tier limited', 'Generic content', 'Premium pricing', 'Learning curve', 'Not long-form'] },
    officialUrl: 'https://copy.ai',
    score: 8.5
  },
  {
    id: 'murf-ai',
    name: 'Murf AI',
    description: 'Versatile AI voice generator with 120+ voices across 20 languages. Creates professional voiceovers for presentations, e-learning, ads, and videos. Voice customization, emotion control, and pitch adjustment. API for developers. Team collaboration.',
    shortDesc: 'Versatile AI voice generator',
    url: 'https://murf.ai',
    category: 'audio',
    tags: ['AI Voice', 'Text-to-Speech', 'Voiceover', 'E-learning', 'Content Creation'],
    pricing: 'freemium',
    useCases: ['E-learning voiceovers', 'YouTube narration', 'Presentation voiceovers', 'Advertising', 'Audiobooks'],
    prosCons: { pros: ['120+ voices', 'Emotion control', 'Collaboration', 'Professional quality', 'Developer API'], cons: ['Free tier limited', 'Synthesized sound', 'No basic cloning', 'Expensive plans', 'Process time'] },
    officialUrl: 'https://murf.ai',
    score: 8.6
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: "Adobe's generative AI family for safe commercial use. Integrated into Creative Cloud apps including Photoshop and Illustrator. Text-to-image, generative fill, text effects, and 3D-to-image. Trained on licensed content for commercial safety. Generative recolor and expand.",
    shortDesc: "Adobe's generative AI for commercial use",
    url: 'https://firefly.adobe.com',
    category: 'image',
    tags: ['AI Image', 'Adobe Creative Cloud', 'Commercial', 'Design Tool', 'Generative Fill'],
    pricing: 'freemium',
    useCases: ['Photo editing', 'Commercial design', 'Social media graphics', 'Brand assets', 'Creative Cloud workflow'],
    prosCons: { pros: ['CC integration', 'Commercial safety', 'Generative fill', 'Text effects', 'Ethical training'], cons: ['Adobe locked', 'Less creative freedom', 'Free tier limits', 'CC sub needed', 'Fewer styles'] },
    officialUrl: 'https://firefly.adobe.com',
    score: 8.8
  },
  {
    id: 'copilot-microsoft',
    name: 'Microsoft Copilot',
    description: 'AI assistant deeply integrated into Microsoft 365. Available in Word, Excel, PowerPoint, Outlook, and Teams. Drafts documents, analyzes data, creates presentations, manages email, and summarizes meetings. Enterprise-grade security.',
    shortDesc: "Microsoft's AI for the 365 ecosystem",
    url: 'https://copilot.microsoft.com',
    category: 'productivity',
    tags: ['Microsoft 365', 'Office AI', 'Productivity', 'Enterprise', 'Document Automation'],
    pricing: 'paid',
    useCases: ['Document drafting', 'Data analysis', 'Presentation creation', 'Email management', 'Meeting summarization'],
    prosCons: { pros: ['Deep 365 integration', 'All Office apps', 'Enterprise security', 'Excel analysis', 'Meeting insights'], cons: ['365 sub required', 'Expensive per user', 'MS only', 'Limited creativity', 'Not standalone'] },
    officialUrl: 'https://copilot.microsoft.com',
    score: 8.7
  },
  {
    id: 'ideo-gram',
    name: 'Ideogram AI',
    description: 'Cutting-edge image generation known for superior text rendering. Accurately renders legible words, logos, and typography within generated images. Text-to-image, image-to-image, and editing. Describe feature generates prompts from existing images. Multiple style options.',
    shortDesc: 'AI image generation with superior text',
    url: 'https://ideogram.ai',
    category: 'image',
    tags: ['AI Image', 'Text Rendering', 'Typography', 'Logo Design', 'Design Tool'],
    pricing: 'freemium',
    useCases: ['Logo creation', 'Typography designs', 'Social graphics with text', 'Poster design', 'Product mockups'],
    prosCons: { pros: ['Best text rendering', 'Accurate typography', 'Multiple styles', 'Easy to use', 'Free tier'], cons: ['Less artistic', 'Limited control', 'Fewer resources', 'Newer platform', 'Not photorealistic'] },
    officialUrl: 'https://ideogram.ai',
    score: 8.5
  }
];

// Escape single quotes in strings
function esc(s) {
  return s.replace(/'/g, "\\'");
}

// Build the full file content
let content = `// Type definitions
export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDesc: string;
  url: string;
  category: string;
  tags: string[];
  pricing: 'free' | 'freemium' | 'paid';
  useCases: string[];
  prosCons: { pros: string[]; cons: string[] };
  officialUrl: string;
  featured?: boolean;
  score?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'writing', name: 'AI Writing', icon: '✍️', count: 0 },
  { id: 'image', name: 'AI Image', icon: '🎨', count: 0 },
  { id: 'code', name: 'AI Coding', icon: '💻', count: 0 },
  { id: 'video', name: 'AI Video', icon: '🎬', count: 0 },
  { id: 'marketing', name: 'AI Marketing', icon: '📢', count: 0 },
  { id: 'audio', name: 'AI Audio', icon: '🎵', count: 0 },
  { id: 'productivity', name: 'AI Productivity', icon: '⚡', count: 0 },
  { id: 'search', name: 'AI Search', icon: '🔍', count: 0 },
];

export function seoTitle(t: Tool): string {
  return \`Best \${t.name} AI Tool 2026 - Features, Pricing & Review | StykAI\`;
}
export function seoDescription(t: Tool): string {
  return \`\${t.name} AI tool: \${t.shortDesc}. Read complete review with pricing, features, pros & cons. Updated 2026.\`;
}
export function seoStructuredData(t: Tool) {
  const p = t.pricing === 'free' ? '0' : 'Varies';
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t.name,
    description: t.description.slice(0, 200),
    applicationCategory: t.category === 'code' ? 'DeveloperApplication' : 'Multimedia',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: p, priceCurrency: 'USD' },
    url: t.url,
  });
}

// ===== 30 AI TOOLS =====
export const tools: Tool[] = [
`;

for (let i = 0; i < tools.length; i++) {
  const t = tools[i];
  const comma = i < tools.length - 1 ? ',' : '';
  
  content += `  {
    id: '${t.id}',
    name: '${t.name}',
    description: '${esc(t.description)}',
    shortDesc: '${esc(t.shortDesc)}',
    url: '${t.url}',
    category: '${t.category}',
    tags: ${JSON.stringify(t.tags)},
    pricing: '${t.pricing}',
    useCases: ${JSON.stringify(t.useCases)},
    prosCons: { pros: ${JSON.stringify(t.prosCons.pros)}, cons: ${JSON.stringify(t.prosCons.cons)} },
    officialUrl: '${t.officialUrl}',
    score: ${t.score},${t.featured ? '\n    featured: true,' : ''}
  }${comma}\n`;
}

content += `];

// Update category counts
categories.forEach(c => {
  c.count = tools.filter(t => t.category === c.id).length;
});
`;

fs.writeFileSync(toolsPath, content, 'utf-8');
console.log('Done! tools.ts updated with 30 AI tools.');
const savedTools = tools.length;
const cats = [...new Set(tools.map(t => t.category))];
console.log(`Categories covered: ${cats.length} (${cats.join(', ')})`);

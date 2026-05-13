#!/usr/bin/env python3
"""Complete translation of tools.ts - replaces all Chinese fields with English"""
import re, json

with open('src/lib/tools.ts.bak', 'r', encoding='utf-8') as f:
    content = f.read()

# ========== ALL 82 TOOL TRANSLATIONS ==========
# Key = tool id, value = { desc, short, tags[], use[], pros[], cons[] }
T = {}

def add(id, desc, short, tags, use, pros, cons):
    T[id] = {'desc': desc, 'short': short, 'tags': tags, 'use': use, 'pros': pros, 'cons': cons}

add('chatgpt',
    'A conversational AI assistant by OpenAI supporting text, code, data analysis and image understanding. GPT-4o offers multimodal capabilities for content creation, programming, learning and research.',
    'Leading conversational AI assistant with multimodal support',
    ['AI Chat', 'Content Generation', 'Code Assistant', 'Multimodal', 'GPT-4o'],
    ['Content Creation', 'Programming Help', 'Study & Research', 'Data Analysis', 'Brainstorming'],
    ['Multimodal understanding', 'Natural conversation', 'Rich ecosystem', 'Plugin system', 'Continuous updates'],
    ['Free tier limited', 'Occasional inaccuracies', 'No real-time data', 'Privacy concerns', 'Paid version expensive'])

add('claude',
    'An AI assistant by Anthropic excelling in long-form text, deep analysis and conversation. Claude 4 features 200K token context with emphasis on safety and honest responses.',
    'Long-form text expert, safe and reliable AI assistant',
    ['AI Chat', 'Long Text', 'Code Generation', 'Safe AI', 'Analysis'],
    ['Long Document Analysis', 'Code Writing', 'Academic Writing', 'Strategic Analysis', 'Content Creation'],
    ['Ultra-long context', 'Deep analysis', 'Safe and reliable', 'Excellent coding', 'Detailed responses'],
    ['No image support', 'Chinese language weaker', 'No real-time search', 'Output limits', 'Paid version expensive'])

add('deepseek',
    'An AI model by DeepSeek outstanding in programming and mathematical reasoning. DeepSeek-R1 delivers powerful reasoning with long context support.',
    'Chinese AI model with outstanding reasoning ability',
    ['AI Programming', 'Math Reasoning', 'Open Source AI', 'Chinese LLM', 'API'],
    ['Programming Help', 'Math Problem Solving', 'Logical Reasoning', 'Code Review', 'API Integration'],
    ['Strong reasoning', 'Excellent coding', 'Great value', 'Partially open source', 'Good Chinese support'],
    ['Smaller ecosystem', 'Limited multimodal', 'Less well-known globally', 'Stability improving', 'Less documentation'])

add('github-copilot',
    'An AI programming assistant by GitHub powered by OpenAI Codex. Supports 2000+ languages integrated with VS Code, JetBrains and major IDEs.',
    'The most popular AI programming assistant',
    ['AI Programming', 'Code Completion', 'VS Code', 'GitHub', 'IDE Plugin'],
    ['Daily Coding', 'Code Completion', 'Test Writing', 'Code Review', 'Learning New Languages'],
    ['Multi-IDE support', 'Context understanding', 'High code quality', 'Team collaboration', 'Continuous updates'],
    ['Expensive', 'Requires internet', 'Privacy concerns', 'Sometimes inaccurate', 'Weak for niche languages'])

add('cursor',
    'An AI-native code editor built on VS Code architecture. Deeply integrates Claude and GPT models for inline editing and multi-file refactoring.',
    'AI-native code editor',
    ['AI Editor', 'Code Refactoring', 'VS Code', 'AI Programming', 'Dev Tools'],
    ['AI-Driven Coding', 'Code Refactoring', 'Multi-File Editing', 'Bug Fixing', 'Project Setup'],
    ['Multi-model support', 'Composer mode', 'Multi-file editing', 'Context-aware', 'Fast iteration'],
    ['Free tier limited', 'Editor competition', 'Requires internet', 'Privacy concerns', 'Learning curve'])

add('perplexity',
    'An AI search engine connecting to the internet in real-time with cited sources. Pro version supports GPT-4, Claude and model switching.',
    'AI search engine with cited sources',
    ['AI Search', 'Real-time Search', 'Academic Research', 'Cited Sources', 'Knowledge'],
    ['Research Queries', 'Academic Search', 'Fact Checking', 'Learning Aid', 'Information Aggregation'],
    ['Real-time web', 'Cited sources', 'Multi-model support', 'Accurate search', 'Clean interface'],
    ['Pro version expensive', 'Free tier limited', 'Chinese language weaker', 'Occasional hallucinations', 'Weak bookmarking'])

add('midjourney',
    'A top-tier AI image generation tool renowned for artistic style and detail. Used via Discord, V6 model reaches new heights in photorealism.',
    'Top AI image generation with outstanding artistic style',
    ['AI Image', 'Art Creation', 'Discord', 'Generative Art', 'AI Design'],
    ['Art Creation', 'Concept Design', 'Ad Assets', 'Game Art', 'Brand Visuals'],
    ['Strong artistic sense', 'Rich details', 'Active community', 'Continuous updates', 'Diverse styles'],
    ['Requires Discord', 'Expensive', 'No free tier', 'Less control', 'Poor with text'])

add('dalle-3',
    'OpenAI image generation model built into ChatGPT. Strong text understanding for precise generation of described content.',
    'High-quality AI image generation built into ChatGPT',
    ['AI Image', 'ChatGPT', 'Text to Image', 'Image Editing', 'OpenAI'],
    ['Creative Design', 'Content Images', 'Ad Design', 'Concept Visualization', 'Social Media'],
    ['Accurate text understanding', 'ChatGPT integration', 'Safety mechanisms', 'Editing features', 'Stable quality'],
    ['Paid only', 'Style limited', 'Resolution limits', 'No standalone platform', 'Slow generation'])

add('stable-diffusion-3',
    'Open-source image generation model by Stability AI. Free local deployment. SD3 brings major improvements in text rendering and multi-subject understanding.',
    'Free open-source AI image generation model',
    ['Open Source', 'Local Deployment', 'AI Image', 'Free', 'Stable Diffusion'],
    ['Local Creation', 'Commercial Use', 'Model Customization', 'Research', 'Batch Generation'],
    ['Completely free', 'Local execution', 'Open-source customizable', 'Rich community', 'LoRA support'],
    ['Requires GPU', 'Complex setup', 'Default quality average', 'Needs tuning', 'High hardware requirements'])

add('leonardo',
    'An all-in-one AI creation platform with image generation, video and 3D texturing. Generous daily free credits, ideal for game assets.',
    'All-in-one AI creation platform',
    ['AI Creation', 'Image Generation', '3D Textures', 'Game Assets', 'Video Generation'],
    ['Game Design', 'Concept Art', 'Character Design', 'Environment Design', 'Video Assets'],
    ['Comprehensive features', 'Generous free credits', 'Community interaction', 'Model training', 'Real-time generation'],
    ['Watermark on free', 'Paid subscription', 'Slow generation', 'Average detail', 'No standalone app'])

add('canva-ai',
    'Online design platform with integrated AI for image generation, background removal and magic editing. Massive template library for social media.',
    'AI-powered online design platform',
    ['Online Design', 'AI Editing', 'Templates', 'Social Media', 'Graphic Design'],
    ['Social Media Design', 'Presentations', 'Marketing Assets', 'Video Editing', 'Brand Design'],
    ['Easy to use', 'Rich templates', 'Team collaboration', 'Strong AI features', 'Multi-platform'],
    ['Free tier limited', 'Some AI features paid', 'Output quality average', 'License concerns', 'Premium features expensive'])

add('grammarly-ai',
    'An AI writing assistant with grammar checking, spelling correction, tone adjustment and style optimization. Cross-platform support.',
    'AI writing assistant',
    ['Grammar Check', 'Writing Assistant', 'English Correction', 'Tone Adjustment', 'Browser Extension'],
    ['English Writing', 'Email Optimization', 'Academic Writing', 'Business Communication', 'Content Proofreading'],
    ['Real-time correction', 'Multi-platform', 'High accuracy', 'Tone suggestions', 'Enterprise plans'],
    ['Free tier limited', 'English mainly', 'Privacy concerns', 'Sometimes too strict', 'Premium expensive'])

add('notion-ai',
    'Notion built-in AI assistant for writing, content summarization, translation and project management. Deeply integrated with knowledge base.',
    'AI work assistant built into Notion',
    ['Notes', 'Knowledge Management', 'Writing Assistant', 'Project Management', 'Collaboration'],
    ['Project Documentation', 'Meeting Notes', 'Knowledge Base', 'Team Collaboration', 'Writing Help'],
    ['Seamless integration', 'Versatile features', 'Translation & summary', 'Meeting assistant', 'Knowledge management'],
    ['Extra paid addon', 'AI features charged separately', 'Poor offline', 'Complex tables weak', 'Average Chinese support'])

add('jasper',
    'A professional AI content creation platform for marketing teams. Brand voice control, SEO optimization, multi-channel content generation.',
    'Professional AI content creation and marketing platform',
    ['Content Creation', 'Marketing Copy', 'Brand Voice', 'SEO Writing', 'Team Collaboration'],
    ['Marketing Copy', 'Ad Campaigns', 'SEO Content', 'Social Media', 'Brand Content'],
    ['Consistent brand voice', 'SEO integration', 'Rich templates', 'Team collaboration', 'Stable quality'],
    ['Expensive', 'No free tier', 'Over-marketing feel', 'English mainly', 'Learning curve'])

add('writesonic',
    'A versatile AI writing platform with article generation, ad copy, SEO content and Chatsonic conversational AI assistant.',
    'Versatile AI writing and content generation platform',
    ['Writing Assistant', 'Content Generation', 'SEO Tools', 'AI Chat', 'API'],
    ['Article Writing', 'Ad Copy', 'Product Descriptions', 'Social Media', 'Email Marketing'],
    ['Free credits', 'Comprehensive features', 'Chatsonic integration', 'SEO optimization', 'API support'],
    ['Inconsistent quality', 'Requires editing', 'Free limited', 'AI-sounding', 'Premium expensive'])

add('copy-ai',
    'AI marketing copy generation tool for e-commerce and SaaS. Supports product descriptions, social copy, and email marketing.',
    'AI marketing copy auto-generation',
    ['Marketing Copy', 'E-commerce Tool', 'Automation', 'Email Marketing', 'SaaS'],
    ['Product Descriptions', 'Social Media', 'Email Copy', 'Ad Creative', 'Brand Copy'],
    ['Easy to use', 'Powerful Workflow', 'Variety of types', 'Multi-language', 'Free tier available'],
    ['Inconsistent quality', 'Needs editing', 'Lacks depth', 'Brand voice weak', 'Complex scenarios weak'])

add('runway',
    'AI video generation and editing platform. Gen-4 Alpha generates high-quality videos, supports text-to-video and image-to-video.',
    'AI video generation and professional editing platform',
    ['AI Video', 'Video Generation', 'Video Editing', 'Gen-4', 'Creative Tools'],
    ['Video Generation', 'VFX', 'Green Screen', 'Ad Shorts', 'Creative Experiments'],
    ['High video quality', 'Comprehensive tools', 'Constant updates', 'Gen-4 powerful', 'Professional editing'],
    ['Expensive', 'Free limited', 'Long generation time', 'Inconsistency', 'Premium features costly'])

add('synthesia',
    'AI avatar video generation platform. 150+ AI avatars, 120+ languages. Generate professional presenter videos from text.',
    'AI avatar video generation platform',
    ['AI Avatar', 'Video Production', 'Training Videos', 'Enterprise Tool', 'Multi-language'],
    ['Enterprise Training', 'Marketing Videos', 'Product Demos', 'Internal Comms', 'Multi-language Content'],
    ['Realistic avatars', 'Multi-language', 'No filming needed', 'Rich templates', 'Enterprise security'],
    ['Expensive', 'No free tier', 'Limited expressions', 'Unnatural gestures', 'Weak customization'])

add('elevenlabs',
    'The most advanced AI voice synthesis platform. Voice cloning, multi-language TTS, audiobook generation with emotion control.',
    'The most advanced AI voice synthesis platform',
    ['AI Voice', 'Voice Cloning', 'TTS', 'Audiobooks', 'Dubbing'],
    ['Audiobook Production', 'Video Dubbing', 'Voice Assistants', 'Podcast Creation', 'Game Voice Acting'],
    ['Excellent audio quality', 'Rich emotions', 'Accurate voice cloning', 'Multi-language', 'Comprehensive API'],
    ['Free limited', 'Expensive', 'Long text costly', 'Chinese language improvable', 'High compute requirements'])

add('suno',
    'AI music generation platform creating complete songs from text prompts. V4 model generates high-quality music with vocals.',
    'AI music generation, text to song in seconds',
    ['AI Music', 'Music Generation', 'Song Creation', 'AI Composition', 'Creative Tools'],
    ['Background Music', 'Song Creation', 'Content Scoring', 'Creative Experiments', 'Personal Entertainment'],
    ['High generation quality', 'Multiple styles', 'Natural vocals', 'Easy to use', 'Free credits'],
    ['Copyright concerns', 'Lyrics can be rigid', 'Free limited', 'Customization hard', 'Commercial license expensive'])

add('hugging-face',
    'The world largest AI model community with 500K+ pre-trained models, datasets and AI applications. Supports deployment and API.',
    'World largest AI model community',
    ['AI Platform', 'Open Source Models', 'Developer', 'API', 'Community'],
    ['Model Deployment', 'API Calls', 'Fine-tuning', 'AI Research', 'Project Showcase'],
    ['Rich models', 'Active community', 'Free deployment', 'Good documentation', 'Easy to start'],
    ['Free compute limited', 'Enterprise expensive', 'Model quality varies', 'Platform complex', 'GPU costly'])

add('replit',
    'Cloud AI coding environment for browser-based coding, running and deployment. Ghostwriter AI provides code completion and debugging.',
    'Cloud AI coding and deployment platform',
    ['Cloud IDE', 'AI Programming', 'Quick Prototype', 'Collaboration', 'Deployment'],
    ['Quick Prototyping', 'Learning Programming', 'Team Collaboration', 'Small Projects', 'AI-Assisted Dev'],
    ['No setup needed', 'Instant deployment', 'Easy collaboration', 'Ghostwriter AI', 'Multi-language'],
    ['Performance limited', 'Free tier slow', 'Not for large projects', 'Premium expensive', 'Poor offline'])

add('adobe-firefly',
    'Adobe generative AI toolset integrated into Photoshop, Illustrator and Creative Cloud applications.',
    'Adobe suite AI creative tools',
    ['Adobe', 'Generative Fill', 'Design Tools', 'Creative Cloud', 'Commercial Safe'],
    ['Image Editing', 'Text Effects', 'Vector Generation', '3D Design', 'Commercial Creation'],
    ['Adobe integration', 'Commercial safe', 'High quality output', 'Professional tools', 'Copyright protection'],
    ['Requires CC subscription', 'Standalone weak', 'Scattered features', 'Slow generation', 'Restrictive'])

add('copilot-microsoft',
    'Microsoft AI assistant integrated into Windows, Office 365 and Edge. Supports document writing, data analysis and email.',
    'Microsoft cross-platform AI assistant',
    ['Office Integration', 'AI Assistant', 'Enterprise Tool', 'Windows', 'Productivity'],
    ['Office Automation', 'Document Writing', 'Data Analysis', 'Meeting Summary', 'Email Management'],
    ['Cross-platform', 'Deep Office integration', 'Enterprise security', 'Data analysis', 'Meeting assistance'],
    ['Few free features', 'Enterprise expensive', 'Windows bound', 'Competitor comparison', 'Scattered features'])

add('descript',
    'AI audio/video editing tool that lets you edit video like a document. Auto-transcription, text-based editing and AI voiceover.',
    'Edit video like editing a document',
    ['Video Editing', 'Podcast Tools', 'Transcription', 'AI Voice', 'Screen Recording'],
    ['Podcast Production', 'Video Editing', 'Transcription', 'Content Creation', 'Remote Courses'],
    ['Text-based editing', 'Auto transcription', 'AI voiceover', 'Innovative interface', 'Easy collaboration'],
    ['Advanced features paid', 'Complex editing weak', 'Chinese transcription poor', 'Export limits', 'Learning curve'])

add('ideo-gram',
    'AI image generation tool excelling at text rendering. Creates logos, posters and social images with precise text.',
    'Best text rendering AI image generator',
    ['AI Image', 'Text Rendering', 'Logo Design', 'Posters', 'AI Design'],
    ['Logo Design', 'Poster Making', 'Social Graphics', 'Brand Visuals', 'Product Showcase'],
    ['Best text rendering', 'Multiple styles', 'Free to use', 'Great prompt understanding', 'No Discord needed'],
    ['Free limited', 'Resolution not high', 'Less versatile than Midjourney', 'Style limited', 'Slow new features'])

add('sourcegraph-cody',
    'AI programming assistant based on full codebase understanding. Context-aware code completion and explanations across entire repositories.',
    'Full codebase-aware AI programming assistant',
    ['Code Search', 'Code Review', 'AI Programming', 'Codebase Understanding', 'Dev Tools'],
    ['Large Project Refactoring', 'Legacy Code Understanding', 'Test Generation', 'Code Review', 'Project Onboarding'],
    ['Full code context', 'Multi-repo support', 'Complex code explanation', 'Test generation', 'Private deployment'],
    ['Complex setup', 'Enterprise focused', 'Free limited', 'Resource heavy', 'Learning curve'])

add('tabnine',
    'Privacy-focused AI code completion with local model support. Covers 90+ languages and 15+ IDEs.',
    'Privacy-first AI code completion',
    ['AI Code Completion', 'Privacy', 'IDE Plugin', 'Enterprise', 'Local Model'],
    ['Daily Development', 'Code Completion', 'Enterprise Development', 'Learning Frameworks', 'Secure Development'],
    ['Privacy protection', 'Local model', 'Private deployment', 'Multi-language', 'Wide IDE support'],
    ['Less accurate than cloud', 'Premium expensive', 'Limited context', 'Slower than Copilot', 'Few free features'])

add('codeium',
    'Free AI code assistant with unlimited completions. 70+ languages, 40+ IDEs. Includes Windsurf IDE.',
    'Free AI code assistant',
    ['Free AI Programming', 'Code Completion', 'IDE Plugin', 'Code Search', 'Dev Tools'],
    ['Daily Development', 'Code Search', 'Learning New Languages', 'Quick Prototyping', 'Code Understanding'],
    ['Completely free', 'Multi-language', 'Code search', 'Windsurf IDE', 'No credit card needed'],
    ['Less accurate than paid', 'Smaller community', 'Privacy concerns', 'Small context window', 'Newer platform'])

add('amazon-q',
    'AWS AI programming assistant (formerly CodeWhisperer). Excels at AWS infrastructure code.',
    'AWS-native AI programming assistant',
    ['AWS', 'Code Security', 'Infrastructure Code', 'AI Programming', 'Cloud Development'],
    ['AWS Development', 'Security Scanning', 'Lambda Development', 'CloudFormation', 'General Coding'],
    ['AWS specialized', 'Security scanning', 'Free for individuals', 'SDK understanding', 'Infrastructure code'],
    ['AWS lock-in', 'General coding weak', 'Fewer IDE supports', 'Slow suggestions', 'Platform lock-in'])

add('zed-ai',
    'High-performance code editor written in Rust with built-in AI pair programming. Supports Claude and GPT models.',
    'High-performance AI code editor',
    ['Code Editor', 'Rust', 'AI Programming', 'High Performance', 'Developer'],
    ['Fast Coding', 'AI Programming', 'Large Project Navigation', 'Team Collaboration', 'Real-time Sharing'],
    ['Extremely fast', 'Rust-built', 'AI diff display', 'Multi-model', 'Collaboration features'],
    ['Early stage', 'Small plugin ecosystem', 'Mac mainly', 'No Windows version', 'New editor to learn'])

add('veed-io',
    'Browser-based AI video editing with auto captions, background removal, noise reduction and eye correction.',
    'Browser-based AI video editor',
    ['Video Editing', 'Auto Captions', 'Browser', 'Screen Recording', 'Social Video'],
    ['Social Media Shorts', 'Caption Generation', 'Screen Recording', 'Marketing Videos', 'Quick Edits'],
    ['No install needed', 'Accurate captions', 'Background removal', 'Eye correction', 'Social templates'],
    ['Free watermark', 'Export limits', 'Slow processing', 'Premium expensive', 'Complex editing weak'])

add('opus-clip',
    'AI video repurposing tool that extracts highlight clips from long videos. Auto-generates short formats with captions.',
    'AI tool for turning long videos into shorts',
    ['Video Repurposing', 'Short Videos', 'Auto Editing', 'Captions', 'Creators'],
    ['YouTube to Shorts', 'Podcast Editing', 'Social Repurposing', 'Webinars', 'Content Marketing'],
    ['Auto extraction', 'Smart highlights', 'Auto captions', 'Vertical format', 'Time saving'],
    ['Expensive at scale', 'Free limited', 'Selection inaccurate', 'No fine editing', 'Brand watermark'])

add('capcut',
    'Free video editing app by ByteDance with AI auto captions, text-to-speech and background removal.',
    'Free AI video editor (TikTok official)',
    ['Video Editing', 'Free', 'TikTok', 'Mobile', 'Templates'],
    ['TikTok Creation', 'Social Media Edits', 'Auto Captions', 'Template Videos', 'Mobile Editing'],
    ['Completely free', 'Excellent mobile', 'Auto captions', 'Massive templates', 'TikTok integration'],
    ['Privacy concerns', 'Desktop weak', 'AI features limited', 'Export compression', 'Occasional ads'])

add('anyword',
    'AI copywriting platform predicting content performance before publishing. Data-driven optimization for marketing teams.',
    'AI marketing copy with performance prediction',
    ['AI Copy', 'Conversion Optimization', 'Marketing Analysis', 'Ad Copy', 'Performance Prediction'],
    ['Ad Copy Optimization', 'Email Marketing', 'Landing Pages', 'Social Ads', 'Conversion Lift'],
    ['Performance prediction', 'Data-driven', 'Multiple variants', 'Channel optimization', 'Team collaboration'],
    ['Expensive', 'Short text mainly', 'Learning curve', 'Score over-reliance', 'Limited templates'])

add('writer',
    'Enterprise-grade AI content platform ensuring brand message consistency with style guide enforcement.',
    'Enterprise brand content AI platform',
    ['Enterprise AI', 'Brand Consistency', 'Style Guide', 'Marketing AI', 'Compliance'],
    ['Enterprise Content', 'Brand Compliance', 'Marketing Copy', 'Internal Comms', 'Document Generation'],
    ['Brand enforcement', 'Enterprise security', 'Custom LLM', 'Compliance features', 'Style integration'],
    ['Expensive', 'Enterprise focused', 'Small teams costly', 'Free limited', 'Learning curve'])

add('surfer-seo',
    'AI content optimization platform boosting search rankings. Data-driven content briefs and NLP keyword research.',
    'AI SEO content optimization',
    ['SEO', 'Content Optimization', 'Keyword Research', 'Ranking Improvement', 'Writing Tool'],
    ['SEO Content Optimization', 'Keyword Research', 'Content Briefs', 'On-Page SEO', 'Content Scoring'],
    ['Data-driven', 'NLP research', 'Content scoring', 'Google Doc integration', 'WordPress plugin'],
    ['Expensive', 'No free tier', 'Data overload', 'Short content weak', 'SEO only'])

add('frase',
    'AI content research and SEO writing assistant. Generates content briefs from SERP analysis.',
    'AI SEO content research and writing',
    ['SEO Content', 'Content Briefs', 'AI Writing', 'Keyword Research', 'Content Optimization'],
    ['SEO Articles', 'Content Research', 'SERP Analysis', 'Content Briefs', 'Blog Writing'],
    ['SERP analysis', 'Auto briefs', 'Content scoring', 'Outline generation', 'Tool integrations'],
    ['Expensive', 'Needs editing', 'No free tier', 'Learning curve', 'Sometimes generic'])

add('resemble',
    'Professional AI voice cloning and audio generation. Custom voice creation with real-time synthesis and emotional TTS.',
    'Professional AI voice cloning and generation',
    ['Voice Cloning', 'TTS', 'AI Voice', 'Audio Generation', 'API'],
    ['Voice Cloning', 'Narration', 'Dubbing', 'Voice Translation', 'Audio Content'],
    ['High quality cloning', 'Emotional TTS', 'API access', 'Design studio', 'Real-time synthesis'],
    ['Enterprise expensive', 'Free limited', 'Processing time', 'Quality varies', 'Needs technical setup'])

add('play-ht',
    'Text-to-speech platform with 900+ AI voices, 100+ languages, voice cloning and real-time streaming.',
    'TTS platform with 900+ AI voices',
    ['TTS', 'Text to Speech', 'Voice Generation', 'Audiobooks', 'Content Creators'],
    ['Voiceover Production', 'Audiobook Narration', 'Podcast Creation', 'Online Education', 'Content Dubbing'],
    ['900+ voices', '100+ languages', 'Realistic quality', 'Streaming API', 'Commercial license'],
    ['No free tier', 'Paid only', 'Voice cloning extra', 'Credit system', 'Increasing competition'])

add('wellsaid',
    'Studio-grade AI voiceover platform with high-quality voices. Team collaboration and brand management.',
    'Studio-grade AI voiceover platform',
    ['Voice Generation', 'Dubbing', 'Enterprise TTS', 'Studio Grade', 'Content'],
    ['Professional Voiceover', 'Online Education', 'Enterprise Training', 'Audiobooks', 'Brand Audio'],
    ['Studio quality', 'Diverse voices', 'Team collaboration', 'Brand management', 'SOC 2'],
    ['Expensive', 'No free tier', 'Limited previews', 'Fewer voice options', 'Enterprise focused'])

add('murf-ai',
    'AI voice generation with 120+ natural voices. Voice cloning, multi-language, built-in video editor.',
    'AI voice generation and video dubbing platform',
    ['AI Voice', 'Video Dubbing', 'Audio Content', 'Education', 'Marketing'],
    ['Video Dubbing', 'Audio Content', 'Education Training', 'Business Presentations', 'Podcasts'],
    ['Natural voices', 'Video sync', 'Voice cloning', 'Multi-language', 'API support'],
    ['Free limited', 'Expensive', 'Chinese accent poor', 'Long text costly', 'High competition'])

add('aiva',
    'AI music composition assistant for scoring and background music. Trained on classical and film scores.',
    'AI music composition and scoring',
    ['AI Music', 'Composition', 'Scoring', 'Royalty Free', 'Creation'],
    ['Background Music', 'Score Creation', 'Content Music', 'Podcast Music', 'Game Audio'],
    ['Music theory based', 'Film-grade quality', 'Style customization', 'Full copyright', 'MIDI export'],
    ['Free limited', 'Subscription fee', 'Limited control', 'Classical-leaning', 'Complex customization'])

add('voicemod-ai',
    'Real-time AI voice changer for gaming, streaming and content creation. Hundreds of voice filters.',
    'Real-time AI voice changer',
    ['Voice Changer', 'Real-time Audio', 'Gaming', 'Streaming', 'Audio Tools'],
    ['Game Voice', 'Streaming Entertainment', 'Content Creation', 'Virtual Events', 'Social Audio'],
    ['Real-time processing', 'Rich sounds', 'Soundboard feature', 'Streaming integration', 'Community presets'],
    ['Free limited', 'Free version quality drop', 'Resource heavy', 'Occasional latency', 'Not professional grade'])

add('you-com',
    'AI search engine combining web search, chat, code generation and image creation. Multi-model platform.',
    'Multi-model AI search engine',
    ['AI Search', 'Web Search', 'Code Generation', 'AI Chat', 'Developer'],
    ['AI Research', 'Code Search', 'Connected Chat', 'Image Generation', 'Multi-model Use'],
    ['Multiple models', 'Code generation', 'Search integration', 'Image generation', 'API support'],
    ['Free limited', 'Partially paid', 'Fewer users', 'Search quality average', 'High competition'])

add('consensus',
    'AI academic search engine extracting insights from peer-reviewed papers. Consensus answers to research questions.',
    'AI academic search engine',
    ['Academic Search', 'Research', 'Scientific Papers', 'Evidence Query', 'Education'],
    ['Research Questions', 'Literature Review', 'Academic Writing', 'Paper Discovery', 'Evidence Collection'],
    ['Peer-reviewed', 'Paper summaries', 'Consensus answers', 'Citation export', 'Ad-free'],
    ['Free queries limited', 'Not full coverage', 'Narrow scope', 'Academic only', 'No full text'])

add('elicit',
    'AI research assistant automating literature review. Extracts key findings and summarizes conclusions from papers.',
    'AI literature review and research assistant',
    ['Academic Research', 'Literature Review', 'Paper Analysis', 'AI Research', 'Education'],
    ['Literature Review', 'Paper Discovery', 'Research Synthesis', 'Citation Management', 'Grant Writing'],
    ['Paper understanding', 'Finding extraction', 'Relevance ranking', 'Time saving', 'Export features'],
    ['Very low free tier', 'Not all papers', 'Premium expensive', 'Extraction imperfect', 'Research only'])

add('phind',
    'Developer-focused AI search engine that searches the web and generates answers with code snippets.',
    'Developer AI search engine',
    ['Developer Search', 'Technical Q&A', 'Code Search', 'Documentation', 'Productivity'],
    ['Technical Debugging', 'Code Documentation', 'Development Q&A', 'Bug Solving', 'Technical Research'],
    ['Developer focused', 'Code generation', 'Search integration', 'Context retention', 'Fast response'],
    ['Free limited', 'Code accuracy varies', 'Technical only', 'Newer platform', 'SaaS dependency'])

add('otter',
    'AI meeting assistant for auto transcription, summarization and action items. Supports Zoom and Google Meet.',
    'AI meeting assistant and transcription',
    ['Meeting Assistant', 'Transcription', 'Meeting Notes', 'Team Collaboration', 'Productivity'],
    ['Meeting Transcription', 'Meeting Notes', 'Collaboration', 'Interview Recording', 'Team Communication'],
    ['Real-time transcription', 'Speaker identification', 'Auto summaries', 'Meeting integration', 'Searchable'],
    ['Free limited', 'Accent challenges', 'No offline', 'Privacy concerns', 'Export limits'])

add('fireflies',
    'AI meeting recorder joining 20+ platforms for auto recording, transcription and notes. CRM integration.',
    'AI meeting recording and intelligent analysis',
    ['Meeting Assistant', 'Conversation Intelligence', 'Transcription', 'CRM Integration', 'Productivity'],
    ['Meeting Recording', 'Sales Analysis', 'CRM Sync', 'Team Collaboration', 'Meeting Notes'],
    ['20+ platforms', 'CRM integration', 'Searchable transcripts', 'Topic tracking', 'Highlight clips'],
    ['Free limited', 'Complex setup', 'Accuracy varies', 'Premium expensive', 'Privacy concerns'])

add('motion',
    'AI productivity app that auto-plans your daily schedule. Creates optimal timetables based on priorities.',
    'AI auto-scheduling productivity app',
    ['Project Management', 'Schedule Planning', 'Calendar AI', 'Time Management', 'Productivity'],
    ['Daily Planning', 'Project Management', 'Meeting Scheduling', 'Task Prioritization', 'Team Management'],
    ['Auto-scheduling', 'Smart priority', 'Calendar sync', 'Deadline management', 'Team workspace'],
    ['Paid only and expensive', 'Learning curve', 'Not flexible enough', 'Timezone issues', 'Over-engineered'])

add('mem-ai',
    'AI knowledge management platform that auto-organizes notes. Auto-associates, suggests connections and auto-tags.',
    'Self-organizing AI knowledge management',
    ['Knowledge Management', 'Notes', 'AI Organization', 'Personal Knowledge', 'Workspace'],
    ['Personal Notes', 'Knowledge Base', 'Research Organization', 'Content Curation', 'Team Knowledge'],
    ['Auto organization', 'AI suggestions', 'Connection discovery', 'Clean interface', 'Fast search'],
    ['Free limited', 'Subscription needed', 'Export limited', 'New platform bugs', 'Weak for power users'])

add('taskade',
    'AI collaboration workspace with task management, notes and mind maps. AI auto-generates project plans.',
    'AI collaboration workspace',
    ['Collaboration', 'Task Management', 'AI Workflow', 'Mind Maps', 'Team'],
    ['Project Management', 'Team Collaboration', 'Task Assignment', 'Mind Mapping', 'Workflow Automation'],
    ['Comprehensive', 'AI project generation', 'Real-time collaboration', 'Mind maps', 'Rich templates'],
    ['Interface complex', 'Free limited', 'AI features paid', 'Mobile weak', 'Learning curve'])

add('fathom',
    'AI note-taking assistant with CRM integration. Auto recording, transcription and summaries. Free tier available.',
    'AI meeting notes with CRM integration',
    ['Meeting Notes', 'Video Calls', 'Transcription', 'CRM', 'Productivity'],
    ['Meeting Recording', 'Sales Calls', 'Customer Management', 'Auto Notes', 'Team Communication'],
    ['Free core features', 'Auto recording', 'CRM integration', 'AI notes', 'Easy to use'],
    ['Limited feature depth', 'Few platform compatibilities', 'Weak analytics', 'Fewer enterprise features', 'Newer platform'])

add('zapier-central',
    'AI automation platform connecting 6000+ apps. Execute cross-app workflows using natural language.',
    'AI no-code workflow automation',
    ['Automation', 'No-Code', 'App Integration', 'AI Agent', 'Productivity'],
    ['Cross-App Automation', 'Data Sync', 'Task Automation', 'Email Automation', 'CRM Updates'],
    ['Rich app catalog', 'AI agent', 'No-code operation', 'Rich templates', 'Enterprise plans'],
    ['Free limited', 'Complex scenarios expensive', 'Learning curve', 'Debug difficult', 'Speed limited'])

add('make',
    'Visual automation platform for creating complex scenarios via drag-and-drop. 2000+ app integrations.',
    'Visual AI automation platform',
    ['Automation', 'Visual', 'App Integration', 'Workflow', 'No-Code'],
    ['Complex Automation', 'Data Transformation', 'App Integration', 'Report Updates', 'Notification Systems'],
    ['Strong visual', 'Flexible logic', 'Rich apps', 'Data processing', 'Scenario sharing'],
    ['Steep learning curve', 'Free limited', 'Complex debugging', 'Execution speed', 'Premium expensive'])

add('bardeen',
    'AI workflow automation tool requiring no coding. Browser extension with one-click triggers.',
    'AI no-code workflow automation',
    ['Workflow Automation', 'No-Code', 'Productivity', 'App Integration', 'AI'],
    ['Data Scraping', 'Email Automation', 'CRM Updates', 'Social Media Management', 'Report Generation'],
    ['No coding needed', 'AI operation', 'Browser extension', 'One-click trigger', 'Pre-built templates'],
    ['Free limited', 'Complex scenarios weak', 'Browser dependent', 'Limited app coverage', 'Learning curve'])

add('rytr',
    'Cost-effective AI writing assistant with 40+ templates and 30+ languages. For blogs, emails, ads and social media.',
    'Cost-effective AI writing assistant',
    ['AI Writing', 'Content Creation', 'Copywriting', 'Multi-language', 'Value'],
    ['Blog Writing', 'Email Copy', 'Ad Copy', 'Social Content', 'Product Descriptions'],
    ['Affordable', 'Multiple templates', 'Multi-language', 'Easy to use', 'Fast output'],
    ['Quality average', 'Needs editing', 'Free word limit', 'Premium limited', 'Lacks depth'])

add('sudowrite',
    'AI writing tool designed for fiction authors. Story creation, character development and plot planning.',
    'AI fiction writing assistant',
    ['Creative Writing', 'Fiction', 'Story Creation', 'Writing Assistant', 'Literature'],
    ['Novel Writing', 'Story Building', 'Character Development', 'Plot Design', 'Creative Writing'],
    ['Creative power', 'Story understanding', 'Diverse writing styles', 'Fiction focused', 'Rich features'],
    ['Expensive', 'No free tier', 'Learning curve', 'Non-fiction weak', 'English mainly'])

add('quillbot',
    'AI paraphrasing and writing improvement. Paraphrasing, grammar checking, summarization and citation features.',
    'AI paraphrasing and writing improvement',
    ['Paraphrasing', 'Grammar Check', 'Summarization', 'Academic Writing', 'Writing Tool'],
    ['Article Rewriting', 'Grammar Correction', 'Content Summarization', 'Academic Writing', 'Citation Generation'],
    ['High-quality paraphrasing', 'Free to use', 'Accurate grammar check', 'Summarization', 'Browser extension'],
    ['Free word limit', 'Premium expensive', 'Sometimes changes meaning', 'English mainly', 'Over-reliance risk'])

add('wordtune',
    'AI rewriting tool making writing clearer. Multiple rewriting modes to adjust tone and style.',
    'AI rewriting and writing improvement',
    ['Rewriting', 'Writing Improvement', 'Tone Adjustment', 'Browser Extension', 'Editing'],
    ['Article Rewriting', 'Tone Adjustment', 'Email Optimization', 'Academic Writing', 'Professional Communication'],
    ['Multiple rewrite modes', 'Tone control', 'Browser integration', 'Real-time suggestions', 'Cross-platform'],
    ['Free limited', 'Premium expensive', 'Chinese support poor', 'Occasional poor suggestions', 'Needs proofreading'])

add('kittl',
    'AI design tool focused on text effects and brand graphics. Templates and AI generation features.',
    'AI text effects and brand design',
    ['Design', 'Text Effects', 'Brand Graphics', 'Print', 'Social Media Design'],
    ['Logo Design', 'Brand Visuals', 'Poster Making', 'Print Materials', 'Social Graphics'],
    ['Strong text effects', 'Easy to use', 'Rich templates', 'Brand tools', 'AI assistance'],
    ['Free limited', 'Premium expensive', 'Vector editing weak', 'New platform', 'Features improving'])

add('remove-bg',
    'AI background removal tool with precise subject identification. Batch processing and API support.',
    'Precise AI background removal',
    ['Background Removal', 'Image Processing', 'Photo Editing', 'E-commerce Tool', 'API'],
    ['Product Photos', 'Subject Extraction', 'ID Photos', 'E-commerce Images', 'Design Assets'],
    ['High precision', 'Fast processing', 'Complete API', 'Batch processing', 'Easy to use'],
    ['Free resolution low', 'Expensive', 'Batch billed', 'Cannot fine-tune', 'Single function'])

add('clipdrop',
    'AI image editing toolset with background removal, upscaling, lighting adjustment and cleanup.',
    'AI image editing and enhancement',
    ['Image Editing', 'Background Removal', 'Image Upscaling', 'Photo Optimization', 'AI Tools'],
    ['Product Photo Optimization', 'Background Removal', 'Image Upscaling', 'E-commerce Images', 'Design Assets'],
    ['One-click operation', 'Accurate background removal', 'Image enhancement', 'API support', 'Real-time processing'],
    ['Free limited', 'Premium expensive', 'Resolution limits', 'Batch paid', 'Focused features'])

add('lets-enhance',
    'AI image upscaling and enhancement adding realistic details. Supports restoration and color optimization.',
    'AI image upscaling and detail enhancement',
    ['Image Upscaling', 'Enhancement', 'Photo Restoration', 'Quality Improvement', 'AI'],
    ['Image Upscaling', 'Old Photo Restoration', 'Quality Enhancement', 'Print Output', 'E-commerce Images'],
    ['Detail enhancement', 'Multiple modes', 'Batch processing', 'API support', 'Good quality'],
    ['Free limited', 'Expensive', 'Processing time', 'Not for animation', 'Over-sharpening'])

add('cutout-pro',
    'AI visual design platform with background removal, restoration, video editing and avatar generation.',
    'AI visual design and editing platform',
    ['Visual Design', 'Background Removal', 'Image Restoration', 'AI Avatar', 'Video Editing'],
    ['Background Removal', 'Old Photo Restoration', 'Avatar Generation', 'Video Editing', 'E-commerce Design'],
    ['Rich features', 'AI avatars', 'Good restoration', 'Multi-language', 'API support'],
    ['Free limited', 'Quality varies', 'Slow processing', 'Complex interface', 'Premium features expensive'])

add('langchain',
    'AI application development framework simplifying LLM app building. Chaining, Agents, RAG and tool calling.',
    'AI application development framework',
    ['AI Framework', 'LLM', 'Open Source', 'Agent', 'RAG'],
    ['AI App Development', 'Agent Building', 'RAG Systems', 'Tool Chain', 'Prototype Development'],
    ['Free open source', 'Active community', 'Comprehensive features', 'Multi-model support', 'Rich ecosystem'],
    ['Steep learning curve', 'Frequent updates', 'Debug difficult', 'Docs lag behind', 'Too much abstraction'])

add('cohere',
    'Enterprise AI platform focused on RAG and search. Embedding, Rerank and Generation APIs.',
    'Enterprise RAG and search AI platform',
    ['Enterprise AI', 'RAG', 'Embedding', 'Search', 'API'],
    ['Enterprise Search', 'Document Retrieval', 'Smart Q&A', 'Content Classification', 'Semantic Understanding'],
    ['RAG specialized', 'Enterprise security', 'Complete API', 'Document processing', 'Multi-language'],
    ['Expensive', 'General chat weak', 'Development knowledge needed', 'Free limited', 'Many competitors'])

add('pinecone',
    'Vector database service for AI applications. Store and search vector embeddings for semantic search and RAG.',
    'AI vector database service',
    ['Vector Database', 'AI Infrastructure', 'Search', 'Embedding', 'RAG'],
    ['Semantic Search', 'RAG Applications', 'Recommendation Systems', 'Similarity Matching', 'AI Memory'],
    ['High performance', 'Real-time search', 'Easy to use', 'Managed service', 'Good documentation'],
    ['Free limited', 'Expensive at scale', 'Vendor lock-in', 'Vector only', 'Learning curve'])

add('n8n',
    'Open-source workflow automation tool that can be self-hosted. 400+ nodes with code control and privacy focus.',
    'Open-source self-hostable automation platform',
    ['Open Source', 'Automation', 'Self-Hosted', 'Workflow', 'Developer'],
    ['Self-Built Automation', 'API Orchestration', 'Data Sync', 'DevOps', 'Enterprise Processes'],
    ['Free open source', 'Self-hosted', 'Privacy controlled', '400+ nodes', 'Extensible'],
    ['Needs technical setup', 'Cloud service paid', 'UI complex', 'Performance bottleneck', 'Community support'])

add('bolt-new',
    'AI full-stack web app generator. Describe what you want, get a fully runnable application.',
    'AI full-stack web app generator',
    ['Full Stack', 'Web App', 'Code Generation', 'AI Development', 'Quick Prototype'],
    ['Quick Prototyping', 'Web Applications', 'MVP Development', 'Full Stack Projects', 'Learning'],
    ['One-click generation', 'Full stack output', 'Runnable', 'Iterative modification', 'Quick prototype'],
    ['Complex projects weak', 'Free limited', 'Code quality', 'Customization hard', 'Platform dependent'])

add('v0',
    'Vercel AI frontend generation. Generate React components and pages from text. Tailwind supported.',
    'Vercel AI frontend component generator',
    ['Frontend', 'React', 'Vercel', 'UI Generation', 'Tailwind'],
    ['UI Components', 'Page Generation', 'Design Prototypes', 'Frontend Development', 'Fast Iteration'],
    ['High quality', 'Tailwind native', 'Vercel integration', 'Easy iteration', 'Component-level'],
    ['Free limited', 'Frontend only', 'Vercel bound', 'Complex logic weak', 'Depends on text prompt'])

add('lovable',
    'AI app building platform generating frontend applications from natural language. Supports React and Vue.',
    'AI frontend app building platform',
    ['AI Development', 'Frontend', 'App Generation', 'React', 'Natural Language'],
    ['Frontend Development', 'UI Design', 'App Prototyping', 'MVP Building', 'Learning'],
    ['Natural language', 'Fast generation', 'React output', 'Easy iteration', 'Visual'],
    ['Free limited', 'Backend weak', 'Code maintainability', 'Complex UI weak', 'New platform'])

add('pika',
    'AI video generation for text-to-video and image-to-video. Simple interface, creator-friendly.',
    'User-friendly AI video generation tool',
    ['AI Video', 'Video Generation', 'Short Videos', 'Creators', 'Stylized'],
    ['Short Video Creation', 'Animation', 'Social Media Videos', 'Ad Assets', 'Art Experiments'],
    ['Easy to use', 'Free to use', 'Rich styles', 'Fast generation', 'Active community'],
    ['Low resolution', 'Inconsistency', 'Free watermark', 'Expensive', 'Long video weak'])

add('invideo-ai',
    'AI video generation platform creating complete videos from text. 5000+ templates, AI script writing.',
    'Text-to-video AI generation platform',
    ['AI Video', 'Text to Video', 'Video Templates', 'Content Creation', 'Marketing Videos'],
    ['Marketing Videos', 'YouTube Content', 'Social Ads', 'Product Demos', 'Explainer Videos'],
    ['Text to video', 'Massive templates', 'Auto voiceover', 'Beginner friendly', 'Fast production'],
    ['Free watermark', 'Limited customization', 'Generic AI scenes', 'Premium expensive', 'Voiceover quality varies'])

add('hypotenuse',
    'AI content writing platform focused on SEO research. Generates optimized articles and ad copy.',
    'AI SEO content writing platform',
    ['Content Writing', 'SEO', 'Article Generation', 'Product Descriptions', 'Marketing Copy'],
    ['SEO Articles', 'Product Descriptions', 'Ad Copy', 'Social Content', 'Email Marketing'],
    ['SEO optimization', 'Coherent content', 'Multiple templates', 'Batch generation', 'Easy to use'],
    ['Expensive', 'No free tier', 'English mainly', 'Needs editing', 'Chinese poor'])

add('gemini',
    'Google multimodal AI model understanding text, images, audio, video and code. Integrated with Google ecosystem.',
    'Google multimodal AI model',
    ['AI Chat', 'Multimodal', 'Google', 'Long Context', 'Search'],
    ['Multimodal Understanding', 'Research Analysis', 'Content Creation', 'Programming Help', 'Information Retrieval'],
    ['Strong multimodal', 'Ultra-long context', 'Google integration', 'Free to use', 'Up-to-date knowledge'],
    ['Chinese language sometimes off', 'Less creative', 'Conservative answers', 'Ecosystem limits', 'Premium expensive'])

add('grok',
    'AI assistant by xAI connected to X/Twitter data in real-time. Answers questions and analyzes news.',
    'xAI real-time AI assistant',
    ['AI Chat', 'Real-time Data', 'X/Twitter', 'xAI', 'News Analysis'],
    ['News Analysis', 'Social Insights', 'Real-time Q&A', 'Content Generation', 'Trend Tracking'],
    ['Real-time data access', 'Humorous style', 'X integration', 'News analysis', 'Fast response'],
    ['Needs X Premium', 'Non-X scenarios weak', 'Still developing', 'Limited features', 'Accuracy improving'])

add('klap',
    'AI short video editing extracting highlights from long videos. Dynamic captions and effects.',
    'AI short video editing with dynamic captions',
    ['Video Editing', 'Short Videos', 'Caption AI', 'Podcast Tools', 'Creators'],
    ['Podcast Editing', 'Educational Shorts', 'YouTube to Shorts', 'Social Content', 'Interview Highlights'],
    ['Highlight detection', 'Dynamic captions', 'Format optimization', 'Easy to use', 'High efficiency'],
    ['Free limited', 'Selection imperfect', 'No full editing', 'Pro expensive', 'Newer platform'])

add('pictory',
    'AI video creator turning long content into branded short videos. Extracts highlights from articles and scripts.',
    'AI long content to branded short videos',
    ['Video Creation', 'Content Repurposing', 'Auto Editing', 'Brand Videos', 'Creators'],
    ['Article to Video', 'Long Video Summaries', 'Social Clips', 'Brand Content', 'Blog to Video'],
    ['Article to video', 'Auto storyboard', 'Text-based editing', 'Brand templates', 'Efficient'],
    ['Free watermark', 'Mechanical voiceover', 'Limited customization', 'Monthly quota', 'Complex editing weak'])

add('reclaim',
    'AI calendar scheduling automatically protecting focus time. Flexible meeting and habit scheduling.',
    'AI calendar scheduling and focus time protection',
    ['Calendar AI', 'Scheduling', 'Time Management', 'Google Calendar', 'Productivity'],
    ['Schedule Management', 'Focus Time', 'Meeting Scheduling', 'Habit Building', 'Work-Life Balance'],
    ['Auto scheduling', 'Focus protection', 'Habit tracking', 'Flexible adjustment', 'Google integration'],
    ['Free limited', 'Google bound', 'Premium expensive', 'Learning curve', 'Occasionally inaccurate'])

add('krisp',
    'AI noise cancellation eliminating background noise and echo from any communication app.',
    'AI call noise cancellation',
    ['Noise Cancellation', 'Call Quality', 'Audio AI', 'Remote Work', 'Productivity'],
    ['Remote Meetings', 'Call Noise Reduction', 'Recording Cleanup', 'Podcast Recording', 'Online Teaching'],
    ['Excellent noise reduction', 'Real-time processing', 'App agnostic', 'Echo removal', 'Clean background'],
    ['Free time limit', 'Occasional voice removal', 'Resource heavy', 'No recording', 'Premium expensive'])

print(f"Total tools with translations: {len(T)}")

# Now process the file
header_end = content.find("export const tools: Tool[] = [")
footer_start = content.find("// Update category counts")

header = content[:header_end] + "export const tools: Tool[] = [\n"
footer = content[footer_start:]

# Extract all tool blocks
tool_pattern = re.compile(r"  \{[\s\S]*?  \},\n", re.MULTILINE)
all_blocks = tool_pattern.findall(content[header_end:footer_start])

print(f"Processing {len(all_blocks)} tool blocks...")

translated_blocks = []
for block in all_blocks:
    tid_match = re.search(r"id: '([^']+)'", block)
    if not tid_match:
        translated_blocks.append(block)
        continue
    tid = tid_match.group(1)
    
    if tid not in T:
        translated_blocks.append(block)
        continue
    
    en = T[tid]
    
    # Replace description (handle multi-line by joining)
    block = re.sub(
        r"description: '(?:[^'\\]|\\.)*'",
        lambda m: f"description: '{en['desc']}'",
        block
    )
    block = re.sub(
        r"shortDesc: '(?:[^'\\]|\\.)*'",
        lambda m: f"shortDesc: '{en['short']}'",
        block
    )
    
    # Replace tags array
    tags_str = "[" + ", ".join(f"'{t}'" for t in en['tags']) + "]"
    block = re.sub(r"tags: \[.*?\]", f"tags: {tags_str}", block)
    
    # Replace useCases array
    use_str = "[" + ", ".join(f"'{u}'" for u in en['use']) + "]"
    block = re.sub(r"useCases: \[.*?\]", f"useCases: {use_str}", block)
    
    # Replace pros array
    pros_str = "[" + ", ".join(f"'{p}'" for p in en['pros']) + "]"
    cons_str = "[" + ", ".join(f"'{c}'" for c in en['cons']) + "]"
    block = re.sub(r"pros: \[.*?\]", f"pros: {pros_str}", block)
    block = re.sub(r"cons: \[.*?\]", f"cons: {cons_str}", block)
    
    translated_blocks.append(block)

# Rebuild and write
new_content = header + "\n".join(translated_blocks) + "\n" + footer

with open('src/lib/tools.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

# Check remaining Chinese
remaining = len(re.findall(r'[\u4e00-\u9fff]', new_content))
original = len(re.findall(r'[\u4e00-\u9fff]', content))

print(f"\nOriginal Chinese chars: {original}")
print(f"Remaining Chinese chars: {remaining}")
print(f"Translated: {original - remaining} chars ({((original-remaining)/original*100):.1f}%)")

if remaining == 0:
    print("\n✅ COMPLETE: All Chinese content translated to English!")
else:
    print(f"\n⚠️ Some Chinese remains in {remaining} chars")
    # Find where
    for i, line in enumerate(new_content.split('\n')):
        if re.search(r'[\u4e00-\u9fff]', line):
            print(f"  L{i+1}: {line.strip()[:80]}")
            break

const fs = require('fs');
const path = require('path');

// Read existing tools.ts
const tp = path.join(__dirname, 'src', 'lib', 'tools.ts');
let content = fs.readFileSync(tp, 'utf8');

// Extract existing tool IDs
const idRegex = /id:\s*'([^']+)'/g;
let ids = new Set();
let m;
while ((m = idRegex.exec(content)) !== null) {
  ids.add(m[1]);
}
console.log('Existing tool count:', ids.size);
console.log('Existing IDs:', [...ids]);

// ===== NEW TOOLS (70 total) =====
const newTools = [];

// === PRODUCTIVITY (12 new) ===
newTools.push({
  id:'otter-ai',name:'Otter.ai',
  description:'Otter.ai is the leading AI meeting assistant that automatically transcribes, summarizes, and captures action items from meetings across Zoom, Google Meet, and Microsoft Teams. It generates concise meeting summaries with speaker identification and creates a searchable archive of all conversations. Otter AI chatbot can answer questions about past meetings using natural language queries. Custom vocabulary for industry-specific terms. Available on web, iOS, and Android with team collaboration features including shared folders and comment threads.',
  shortDesc:'AI meeting assistant for automatic transcription and summaries',
  url:'https://otter.ai',category:'productivity',
  tags:['Meeting Assistant','Transcription','Meeting Notes','Team Collaboration','Voice AI'],
  pricing:'freemium',
  useCases:['Meeting transcription','Action item extraction','Interview recording','Lecture notes','Team collaboration'],
  prosCons:{pros:['Real-time transcription','Speaker identification','Auto summaries','Integration with Zoom/Meet','Searchable archive'],cons:['Free tier limited','Accent challenges','No offline mode','Privacy concerns','Export limitations']},
  officialUrl:'https://otter.ai',score:9,featured:true
});

newTools.push({
  id:'fireflies',name:'Fireflies.ai',
  description:'Fireflies.ai is an AI meeting assistant that records, transcribes, and analyzes conversations across 100+ platforms including Zoom, Microsoft Teams, Webex, and RingCentral. It creates intelligent searchable transcripts with speaker labels and generates AI-powered summaries with action items. Advanced features include sentiment analysis, topic tracking, and CRM integration with Salesforce, HubSpot, and Slack. Custom vocabulary and keyword tracking for competitive intelligence.',
  shortDesc:'AI meeting recorder with conversation intelligence',
  url:'https://fireflies.ai',category:'productivity',
  tags:['Meeting Assistant','Conversation Intelligence','Transcription','CRM Integration','Team Collaboration'],
  pricing:'freemium',
  useCases:['Meeting recording','Sales call analysis','Interview transcription','Action tracking','Knowledge management'],
  prosCons:{pros:['100+ platform support','CRM integration','Smart search','Sentiment analysis','Multi-language'],cons:['Audio quality dependent','Expensive teams plan','Setup complexity','False positives','Occasional delays']},
  officialUrl:'https://fireflies.ai',score:8.8
});

newTools.push({
  id:'motion',name:'Motion',
  description:'Motion is an AI-powered productivity app that automatically schedules tasks based on priorities and deadlines. It creates optimal daily schedules by intelligently blocking time for deep work, meetings, and tasks. Features include project timeline views, auto meeting scheduling, task prioritization that adapts when priorities change, and calendar integration with Google Calendar and Outlook. AI learns your work patterns and adjusts schedules dynamically for maximum productivity.',
  shortDesc:'AI productivity app that auto-schedules your workday',
  url:'https://usemotion.com',category:'productivity',
  tags:['Project Management','Task Scheduling','Calendar AI','Time Management','Productivity'],
  pricing:'paid',
  useCases:['Daily task scheduling','Project timeline planning','Meeting scheduling','Priority management','Team coordination'],
  prosCons:{pros:['Auto-scheduling','Priority optimization','Calendar integration','Project views','Deadline tracking'],cons:['Expensive subscription','Learning curve','Over-scheduling risk','Limited integrations','Mobile app gaps']},
  officialUrl:'https://usemotion.com',score:8.7
});

newTools.push({
  id:'mem-ai',name:'Mem.ai',
  description:'Mem is an AI-powered knowledge management platform that organizes information automatically without manual effort. It surfaces relevant information when you need it, connects related notes, and suggests tags. Unlike traditional note-taking apps, Mem organizes content for you with AI-powered search and recommendations. Team knowledge sharing with shared collections. AI assistant can answer questions from your knowledge base. Supports API for custom integrations.',
  shortDesc:'AI knowledge management that organizes itself',
  url:'https://mem.ai',category:'productivity',
  tags:['Knowledge Management','Note Taking','AI Organization','Personal Knowledge','Collaboration'],
  pricing:'freemium',
  useCases:['Personal knowledge base','Research organization','Team knowledge sharing','Project documentation','Idea management'],
  prosCons:{pros:['Auto-organization','Smart search','Related note discovery','Clean interface','AI suggestions'],cons:['Export limitations','Mobile app basic','Learning curve','Privacy concerns','Occasional incorrect linking']},
  officialUrl:'https://mem.ai',score:8.6
});

newTools.push({
  id:'taskade',name:'Taskade',
  description:'Taskade is an AI-powered collaboration workspace combining project management, notes, and task tracking. AI helps generate task lists, create project outlines, and automate workflows. It features real-time collaboration with team members, mind maps for brainstorming, kanban boards for workflow management, and integrated video chat. Cross-platform support includes web, desktop, and mobile. Pre-built templates for common workflows.',
  shortDesc:'AI collaboration workspace with smart task management',
  url:'https://taskade.com',category:'productivity',
  tags:['Collaboration','Task Management','AI Workflow','Mind Map','Team Productivity'],
  pricing:'freemium',
  useCases:['Project planning','Team collaboration','Workflow automation','Task generation','Mind mapping'],
  prosCons:{pros:['All-in-one workspace','Mind maps','AI task generation','Real-time sync','Free tier generous'],cons:['Less mature than competitors','UI occasional clunkiness','Limited templates','Mobile experience','Advanced features paid']},
  officialUrl:'https://taskade.com',score:8.5
});

newTools.push({
  id:'tl-dv',name:'TLDV AI',
  description:'TLDV is an AI meeting assistant that summarizes calls from Zoom, Google Meet, and Microsoft Teams. It records, transcribes, and creates executive summaries with action items automatically. Features include CRM integration for sales teams to log call notes, keyword tracking for competitive intelligence, and search across all recorded calls. Free tier available for limited monthly meetings. Browser extension for one-click recording.',
  shortDesc:'AI meeting summarizer for busy professionals',
  url:'https://tldv.io',category:'productivity',
  tags:['Meeting Summaries','Transcription','Action Items','Sales Calls','CRM'],
  pricing:'freemium',
  useCases:['Sales call analysis','Meeting recording','Client call summaries','Interview documentation','Action item tracking'],
  prosCons:{pros:['Meeting summaries','CRM integration','Keyword spotting','Search archives','Free tier good'],cons:['Only recorded audio','Limited free hours','No real-time','Basic editing','Premium expensive']},
  officialUrl:'https://tldv.io',score:8.5
});

newTools.push({
  id:'bardeen',name:'Bardeen AI',
  description:'Bardeen is an AI workflow automation tool that connects apps and automates repetitive tasks without any coding required. AI suggests automations based on your workflow patterns and provides pre-built playbook templates for common tasks like lead enrichment and data entry. Supports 200+ integrations including Salesforce, HubSpot, Gmail, Slack, Notion, and Airtable. Magic AI feature enables natural language automation creation. Browser extension for triggering automations from any webpage.',
  shortDesc:'AI workflow automation without coding',
  url:'https://bardeen.ai',category:'productivity',
  tags:['Workflow Automation','No Code','Productivity','App Integration','CRM'],
  pricing:'freemium',
  useCases:['CRM automation','Lead enrichment','Data entry automation','Email sequences','Meeting scheduling'],
  prosCons:{pros:['No-code automations','200+ integrations','AI suggestions','Playbook templates','Browser extension'],cons:['Free tier limited','Complex workflows tricky','Occasional bugs','Premium pricing','Learning curve']},
  officialUrl:'https://bardeen.ai',score:8.6
});

newTools.push({
  id:'fathom',name:'Fathom AI',
  description:'Fathom is an AI note-taker for video calls that records, transcribes, and summarizes meetings automatically. It creates highlight reels, action items, and shareable clips. Unlike other meeting assistants, no bot joins the call as Fathom runs locally on your computer for enhanced privacy. Integrates with CRM for sales teams. Generous free tier. Works with Zoom, Google Meet, and Microsoft Teams with a searchable library of all past meetings.',
  shortDesc:'AI note-taker for video calls with CRM integration',
  url:'https://fathom.video',category:'productivity',
  tags:['Meeting Notes','Video Call','Transcription','CRM','Sales Tool'],
  pricing:'freemium',
  useCases:['Sales call recording','Meeting summaries','CRM logging','Highlight reels','Team knowledge sharing'],
  prosCons:{pros:['No bot required','CRM integration','Highlight editing','Searchable library','Generous free tier'],cons:['Video calls only','Zoom/Meet/Teams limited','No mobile app','Premium for team','Processing delay']},
  officialUrl:'https://fathom.video',score:8.8
});

newTools.push({
  id:'superhuman',name:'Superhuman AI',
  description:'Superhuman is an AI-powered email client built for speed with AI compose, smart inbox sorting, and instant search capabilities. AI writes email drafts, suggests replies, summarizes threads, and prioritizes important messages automatically. Features split-second keyboard-driven navigation, undo send, scheduled sending, read receipts, and link tracking. Unified inbox for multiple accounts. Available on Mac, Windows, iOS, and Android with beautiful minimal design.',
  shortDesc:'AI-powered email client for lightning-fast productivity',
  url:'https://superhuman.com',category:'productivity',
  tags:['Email Client','AI Email','Smart Inbox','Productivity','Keyboard Shortcuts'],
  pricing:'paid',
  useCases:['Fast email management','AI email drafting','Thread summarization','Inbox zero','Calendar management'],
  prosCons:{pros:['Lightning fast','AI compose','Thread summaries','Keyboard shortcuts','Beautiful design'],cons:['Expensive monthly','Gmail/Outlook only','No free tier','MacOS/Web only','Overkill for light emailers']},
  officialUrl:'https://superhuman.com',score:8.7
});

newTools.push({
  id:'reclaim',name:'Reclaim AI',
  description:'Reclaim is an AI scheduling assistant that automatically finds the best meeting times, blocks focus time, and prevents schedule conflicts. It integrates exclusively with Google Calendar and learns your preferences to adjust scheduling dynamically. Smart meeting scheduling avoids conflicts and protects deep work time. Work pattern analytics show how you spend time. Team scheduling for coordinating with colleagues. Usage tracking and productivity insights.',
  shortDesc:'AI scheduling assistant that protects your focus time',
  url:'https://reclaim.ai',category:'productivity',
  tags:['Scheduling','Calendar AI','Meeting Assistant','Time Management','Productivity'],
  pricing:'freemium',
  useCases:['Smart meeting scheduling','Focus time blocking','Schedule optimization','Meeting conflict prevention','Work pattern analysis'],
  prosCons:{pros:['Auto scheduling','Focus time protection','Calendar analytics','Team sync','Flexible settings'],cons:['Google Calendar only','Free tier limited','Setup time needed','Occasional overrides','Premium expensive']},
  officialUrl:'https://reclaim.ai',score:8.6
});

newTools.push({
  id:'krisp',name:'Krisp AI',
  description:'Krisp is an AI-powered noise cancellation app that removes background noise from calls in real-time. It works at the system level with any communication app including Zoom, Microsoft Teams, Slack, and Discord. Voice isolation removes everyone except the speaker. Echo and reverb removal for crystal-clear audio. Free daily minutes for all users. Available on Windows, Mac, iOS, and Android. Also cleans up audio from recordings.',
  shortDesc:'AI noise cancellation for crystal-clear calls',
  url:'https://krisp.ai',category:'productivity',
  tags:['Noise Cancellation','Audio AI','Call Quality','Productivity','Remote Work'],
  pricing:'freemium',
  useCases:['Noise-free calls','Remote work','Recording cleanup','Meeting audio improvement','Podcast audio cleanup'],
  prosCons:{pros:['Real-time noise removal','Works with any app','Easy setup','Free daily minutes','Vocal clarity'],cons:['Free limited daily','Expensive pro','Processing latency','Not perfect loud noise','Occasional voice drops']},
  officialUrl:'https://krisp.ai',score:8.7
});

newTools.push({
  id:'usethis',name:'This AI',
  description:'This AI is a personal AI assistant that learns from your documents, notes, and conversations to create a personalized knowledge base. It answers questions referencing your own information and remembers context across sessions. Supports document upload for PDFs, Word docs, and websites. Shareable knowledge with team members. Custom AI training on your content for more accurate responses. Privacy-focused design.',
  shortDesc:'Personal AI that learns from your data',
  url:'https://usethis.ai',category:'productivity',
  tags:['Personal AI','Knowledge Base','Document Analysis','AI Assistant','Memory'],
  pricing:'freemium',
  useCases:['Personal knowledge retrieval','Document Q&A','Research synthesis','Project memory','Daily assistant'],
  prosCons:{pros:['Learns from your data','Memory retention','Document upload','Shareable knowledge','Custom training'],cons:['Privacy concerns','Newer platform','Limited integrations','Subscription for full','Accuracy varies']},
  officialUrl:'https://usethis.ai',score:8.4
});

// === WRITING (5 more = total 7 new) ===
newTools.push({
  id:'rytr',name:'Rytr',
  description:'Rytr is an affordable AI writing assistant for blogs, emails, ads, and social media content. It supports over 40 use cases including product descriptions, landing pages, and SEO content across 30+ languages. Generates plagiarism-free content with adjustable tone settings. Built-in SEO analysis checks readability and keyword usage. Chrome extension for writing anywhere on the web. Free plan includes monthly character allowance.',
  shortDesc:'Budget-friendly AI writing assistant',
  url:'https://rytr.me',category:'writing',
  tags:['AI Writing','Content Creation','Copywriting','SEO Writing','Affordable'],
  pricing:'freemium',
  useCases:['Blog post writing','Email copy','Ad copy creation','Social media posts','SEO content'],
  prosCons:{pros:['Very affordable','40+ use cases','30+ languages','Plagiarism free','Chrome extension'],cons:['Quality varies','Basic interface','Limited long-form','No team features','Generic tone sometimes']},
  officialUrl:'https://rytr.me',score:8.4
});

newTools.push({
  id:'sudowrite',name:'Sudowrite',
  description:'Sudowrite is an AI writing companion purpose-built for fiction authors and creative writers. It helps overcome writers block, expand descriptions, rewrite passages, develop characters, and refine dialogue. The Story Engine generates thousands of words from a simple premise. Character development tools help build believable characters. World-building suggestions for setting descriptions. Style transfer to match any author voice. Perfect for novelists and screenwriters.',
  shortDesc:'AI writing tool for fiction authors',
  url:'https://sudowrite.com',category:'writing',
  tags:['Creative Writing','Fiction','Storytelling','AI Writer','Author Tool'],
  pricing:'paid',
  useCases:['Fiction writing','Character development','World building','Plot outlining','Style improvement'],
  prosCons:{pros:['Purpose-built for fiction','Story Engine','Character development','Style transfer','Expand/rewrite tools'],cons:['Expensive','Monthly character limits','Overdependence risk','Not for business','Learning curve']},
  officialUrl:'https://sudowrite.com',score:8.9
});

newTools.push({
  id:'quillbot',name:'QuillBot',
  description:'QuillBot is a popular AI paraphrasing and writing improvement tool that rephrases sentences for clarity and style. It offers multiple modes from Standard to Creative and Formal. Integrated grammar checker catches errors, plagiarism checker maintains academic integrity, summarizer condenses long texts, and citation generator supports multiple formats. Translator works with 30+ languages. Co-Writer combines all tools in one workspace. Browser extension for instant use.',
  shortDesc:'AI paraphrasing and writing improvement tool',
  url:'https://quillbot.com',category:'writing',
  tags:['Paraphrasing','Grammar Check','Summarizer','Academic Writing','Citation'],
  pricing:'freemium',
  useCases:['Academic paraphrasing','Essay improvement','Grammar correction','Text summarization','Citation generation'],
  prosCons:{pros:['Excellent paraphrasing','Multiple modes','Integrated tools','Affordable premium','Browser extension'],cons:['Premium needed for quality','Not original creation','Academic detection risk','Limited creativity','Word limits free']},
  officialUrl:'https://quillbot.com',score:8.8
});

newTools.push({
  id:'wordtune',name:'Wordtune',
  description:'Wordtune is an AI-powered writing companion that rewrites and restructures sentences for clarity, tone, and impact. It offers multiple rewrite options: shorter, longer, more formal, more casual, or more confident. Translation across 30+ languages. Spices feature adds flair with examples, counterarguments, and analogies. Browser extension works everywhere you write including Gmail, LinkedIn, and Google Docs. Tone adjustment for different audiences and contexts.',
  shortDesc:'AI rewriting assistant for clearer writing',
  url:'https://wordtune.com',category:'writing',
  tags:['Rewriting','AI Editor','Writing Improvement','Translation','Tone Adjustment'],
  pricing:'freemium',
  useCases:['Professional emails','Academic writing','Content editing','Translation','Social media posts'],
  prosCons:{pros:['Multiple rewrite modes','Tone adjustment','Translation support','Spices feature','Browser extension'],cons:['Limited free version','Monthly character cap','Not for long-form','Occasional odd rewrites','Expensive premium']},
  officialUrl:'https://wordtune.com',score:8.6
});

newTools.push({
  id:'kittl',name:'Kittl AI',
  description:'Kittl is an AI design platform for creators that generates stunning graphics, text effects, and brand assets from text prompts. Its AI text effects apply beautiful typography styles instantly. Pattern generation creates unique backgrounds and textures. Brand kits store colors, fonts, and logos for consistent branding. Template library for social media, print-on-demand, and marketing. Export to PNG, SVG, and PDF. Designed for print-on-demand creators on Redbubble and Merch by Amazon.',
  shortDesc:'AI design tool for text effects and brand graphics',
  url:'https://kittl.com',category:'writing',
  tags:['Design','Text Effects','Brand Graphics','Print on Demand','Social Media'],
  pricing:'freemium',
  useCases:['Text effect design','Brand asset creation','Social graphics','Print-on-demand designs','Logo creation'],
  prosCons:{pros:['Beautiful text effects','Brand kits','Template library','Vector export','Beginner friendly'],cons:['Watermark on free','Limited AI generation','Expensive pro','Not illustration tool','Newer platform']},
  officialUrl:'https://kittl.com',score:8.4
});

newTools.push({
  id:'hypotenuse',name:'Hypotenuse AI',
  description:'Hypotenuse AI is a content generation platform for SEO-optimized articles, product descriptions, and ad copy. It researches topics from the web and generates unique content with source citations. Bulk generation for large content projects. Brand voice customization ensures consistent messaging. Multi-language support for global content. Built-in plagiarism checker. Integrations with WordPress and Shopify. Excellent for e-commerce product descriptions at scale.',
  shortDesc:'AI content writer with SEO research',
  url:'https://hypotenuse.ai',category:'writing',
  tags:['Content Writing','SEO','Article Generation','Product Descriptions','Bulk Content'],
  pricing:'paid',
  useCases:['SEO blog articles','E-commerce descriptions','Ad copywriting','Newsletter content','Bulk content creation'],
  prosCons:{pros:['Web research integrated','Bulk generation','Brand voice','Source citations','Good SEO output'],cons:['Paid only','Quality varies','Limited free trial','No browser extension','Long-form needs editing']},
  officialUrl:'https://hypotenuse.ai',score:8.3
});

newTools.push({
  id:'longshot',name:'LongShot AI',
  description:'LongShot is an AI writing assistant focused on long-form content with built-in fact-checking and source attribution. It detects factual errors in generated content and provides corrections. Adds proper citations and references automatically. SEO-optimized content generation with keyword planning. Topic research gathers information before writing. Content reuse tools repurpose existing content. Template workflows for consistent output quality.',
  shortDesc:'AI long-form writing with fact-checking',
  url:'https://longshot.ai',category:'writing',
  tags:['Long-form Writing','Fact Checking','SEO Content','Content Creation','Citations'],
  pricing:'paid',
  useCases:['Long-form article writing','Fact-checked content','SEO blog generation','Content repurposing','Research-backed writing'],
  prosCons:{pros:['Fact-checking built-in','Source citations','SEO analysis','Long form capable','Content reuse'],cons:['Paid only','Limited free trial','Generation speed','UI could improve','Smaller community']},
  officialUrl:'https://longshot.ai',score:8.3
});

// === IMAGE (8 new) ===
newTools.push({
  id:'clipdrop',name:'ClipDrop',
  description:'ClipDrop by Stability AI is a suite of AI image editing tools for creators. It features background removal with pixel-precise edge detection, image upscaling up to 4x resolution, relighting that simulates studio lighting, and cleanup tools for removing unwanted objects. The API is available for integration into custom workflows. Free tier with daily credits. Essential tool for e-commerce product photography and social media content creation.',
  shortDesc:'AI image editing suite for background removal and upscaling',
  url:'https://clipdrop.co',category:'image',
  tags:['Image Editing','Background Removal','Upscaling','Photo AI','Design Tool'],
  pricing:'freemium',
  useCases:['E-commerce product photos','Profile picture editing','Image upscaling','Object removal','Studio lighting simulation'],
  prosCons:{pros:['Excellent bg removal','Free tier generous','High-quality upscaling','Relighting feature','API available'],cons:['Limited free daily','Web-only','No batch free','Resolution limits','Upscale artifacts sometimes']},
  officialUrl:'https://clipdrop.co',score:8.7
});

newTools.push({
  id:'remove-bg',name:'Remove.bg',
  description:'Remove.bg is a specialized AI tool for instant background removal with pixel-perfect precision. Its deep learning model accurately detects foreground subjects including people, products, animals, and cars. The API enables batch processing of thousands of images for e-commerce workflows. Supports multiple output formats including transparent PNG. High-resolution downloads require credits. Professional-grade results with a single click.',
  shortDesc:'AI background removal with pixel-perfect precision',
  url:'https://remove.bg',category:'image',
  tags:['Background Removal','Image Processing','Photo Editing','E-commerce Tool','API'],
  pricing:'freemium',
  useCases:['Product photography','Profile pictures','Marketing materials','E-commerce listings','Creative compositing'],
  prosCons:{pros:['One-click removal','Pixel-perfect edges','Batch processing','API integration','Multiple output formats'],cons:['Free low resolution','HD costs credits','No manual refining','Subscription expensive','Not for complex scenes']},
  officialUrl:'https://remove.bg',score:9,featured:true
});

newTools.push({
  id:'lets-enhance',name:"Let's Enhance",
  description:"Let's Enhance is an AI-powered image upscaler that increases resolution while adding realistic detail through deep learning. It can upscale images up to 16x original size while preserving textures and sharpness. Features include color correction to fix faded photos, face enhancement for portraits, and sharpening optimized for print. Batch processing for multiple images. Great for photo restoration and creating print-ready images from low-resolution sources.",
  shortDesc:'AI image upscaler that adds realistic detail',
  url:'https://letsenhance.io',category:'image',
  tags:['Image Upscaling','Photo Enhancement','AI Image','Photo Restoration','Print Quality'],
  pricing:'freemium',
  useCases:['Photo restoration','Print-ready images','E-commerce photos','Digital art upscaling','Old photo enhancement'],
  prosCons:{pros:['Up to 16x upscale','Detail preservation','Color correction','Face enhancement','Batch processing'],cons:['Free limited preview','Monthly credits','Artifacts sometimes','Processing time','Expensive for volume']},
  officialUrl:'https://letsenhance.io',score:8.6
});

newTools.push({
  id:'krea-ai',name:'Krea AI',
  description:'Krea AI is a real-time AI image and video generation platform that shows results instantly as you type. It excels at creating patterns, textures, and design assets for creative projects. The real-time canvas enables rapid design prototyping and iteration. Community marketplace for sharing and discovering creations. Easy to use for both beginners and experienced creators. Limited free tier with premium subscriptions for advanced features.',
  shortDesc:'Real-time AI image generation with instant preview',
  url:'https://krea.ai',category:'image',
  tags:['Real-time AI','Image Generation','Pattern Design','Creative Tool','Text-to-Image'],
  pricing:'freemium',
  useCases:['Design prototyping','Pattern creation','Concept art','Real-time iteration','Texture generation'],
  prosCons:{pros:['Real-time generation','Interactive canvas','Pattern tools','Easy interface','Active community'],cons:['Limited free tier','Generation quality varies','Not photorealistic','Less control than SD','New platform']},
  officialUrl:'https://krea.ai',score:8.5
});

newTools.push({
  id:'playground-ai',name:'Playground AI',
  description:'Playground AI combines Stable Diffusion with an intuitive visual editor for free AI image generation. It offers advanced controls including prompt weighting, negative prompts, seed control, canvas editing with inpainting and outpainting, and image-to-image transformation. Community gallery for inspiration and sharing. Style presets for consistent results. Generous free tier with daily credits. Excellent platform for exploring AI art creation without upfront investment.',
  shortDesc:'Free AI image generator with powerful editing tools',
  url:'https://playgroundai.com',category:'image',
  tags:['AI Image Generation','Free AI Art','Stable Diffusion','Canvas Editor','Community'],
  pricing:'freemium',
  useCases:['Digital art creation','Marketing visuals','Creative exploration','Social media graphics','Design prototyping'],
  prosCons:{pros:['Free tier generous','Canvas editor','Advanced controls','Community gallery','Style presets'],cons:['Daily generation cap','Prompt moderation','Not for commercial top tier','Queue times free','Less realistic than Midjourney']},
  officialUrl:'https://playgroundai.com',score:8.7
});

newTools.push({
  id:'pixlr',name:'Pixlr AI',
  description:'Pixlr is a cloud-based image editing suite with AI-powered features for quick photo enhancements. AI tools include generative fill to add or remove objects, background removal with smart cutout, and one-click color adjustments. It serves as a Photoshop alternative that runs entirely in the browser without installation. Template library for social media and marketing graphics. Free tier with ads and premium subscription for advanced AI features.',
  shortDesc:'Browser-based AI photo editor with generative fill',
  url:'https://pixlr.com',category:'image',
  tags:['Photo Editor','Browser AI','Generative Fill','Image Editing','Design Tool'],
  pricing:'freemium',
  useCases:['Quick photo editing','Background removal','Object removal','Social media graphics','Online design'],
  prosCons:{pros:['No installation','Generative fill','Familiar Photoshop-like UI','Free tier usable','Template library'],cons:['Subscription for AI','Ads on free','Browser performance','Limited advanced features','Watermark on free export']},
  officialUrl:'https://pixlr.com',score:8.4
});

newTools.push({
  id:'magnific',name:'Magnific AI',
  description:'Magnific AI is an advanced AI image upscaler and enhancer that adds incredible new detail at up to 8K resolution. Unlike simple interpolation, it uses generative AI to create realistic new detail, textures, and sharpness. Creative enhancement mode adds artistic detail beyond simple upscaling. Face restoration improves portrait quality. Batch processing for multiple images. Paid-only with credit-based system. Best for professional print production and digital art enhancement.',
  shortDesc:'AI upscaler that adds incredible detail at 8K',
  url:'https://magnific.ai',category:'image',
  tags:['AI Upscaling','Image Enhancement','8K Resolution','Creative AI','Photo Restoration'],
  pricing:'paid',
  useCases:['High-res upscaling','Creative detail addition','Face restoration','Print production','Digital art enhancement'],
  prosCons:{pros:['Amazing detail addition','8K output','Creative enhancement','Face restoration','Batch processing'],cons:['Paid only expensive','Credit system','Processing time','Not for simple upscale','Over-enhancement risk']},
  officialUrl:'https://magnific.ai',score:8.8
});

newTools.push({
  id:'getimg',name:'Getimg.ai',
  description:'Getimg.ai is an all-in-one AI image toolkit offering text-to-image, image-to-image, inpainting, outpainting, and upscaling in one platform. It is powered by Stable Diffusion with support for custom model training. API available for automation and batch image processing. Multiple versions of Stable Diffusion supported. Free monthly credits for new users. Comprehensive toolset for all AI image generation needs.',
  shortDesc:'All-in-one AI image toolkit with custom models',
  url:'https://getimg.ai',category:'image',
  tags:['Image Generation','AI Toolkit','Stable Diffusion','Custom Models','API'],
  pricing:'freemium',
  useCases:['AI image generation','Image editing','Custom model training','API integration','Batch image processing'],
  prosCons:{pros:['All-in-one toolkit','Custom model training','API available','Free monthly credits','Multiple SD versions'],cons:['Free limit low','Paid for quality','UI cluttered','Processing slower','Credit system confusing']},
  officialUrl:'https://getimg.ai',score:8.4
});

newTools.push({
  id:'facet',name:'Facet AI',
  description:'Facet is a precision AI image editor designed for professional designers who need exact control. It uses AI for background removal, subject selection, and object replacement with non-destructive editing. Supports layers and masks for complex compositions. Real-time collaboration for design teams. Perfect for professional photographers and graphic designers who need precision AI-assisted editing.',
  shortDesc:'Precision AI image editor for designers',
  url:'https://facet.ai',category:'image',
  tags:['Image Editor','Design Tool','AI Masking','Precision Editing','Creative Suite'],
  pricing:'paid',
  useCases:['Professional photo editing','Precise subject selection','Object replacement','Background replacement','Design compositing'],
  prosCons:{pros:['Precision masking','Non-destructive','Layers support','AI object selection','Real-time collaboration'],cons:['Expensive subscription','Steep learning curve','No free tier','Newer platform','Resource heavy']},
  officialUrl:'https://facet.ai',score:8.4
});

newTools.push({
  id:'nightcafe',name:'NightCafe',
  description:'NightCafe is a multi-algorithm AI art generator supporting Stable Diffusion, DALL-E, and other models. It offers text-to-image generation, style transfer, and preset styles for quick creation. Active community with daily art challenges and competitions. Credit-based pricing system with free daily credits. Beginner-friendly interface with advanced options for experienced users. Wide variety of artistic styles.',
  shortDesc:'Multi-algorithm AI art generator with community',
  url:'https://nightcafe.studio',category:'image',
  tags:['AI Art','Multi-Engine','Style Transfer','Community','Digital Art'],
  pricing:'freemium',
  useCases:['AI art creation','Style exploration','Art challenges','Creative inspiration','Digital art collection'],
  prosCons:{pros:['Multiple AI engines','Active community','Style transfer','Daily challenges','Beginner friendly'],cons:['Credit system expensive','Free limit low','Watermark on free','Less advanced controls','Slow generation']},
  officialUrl:'https://nightcafe.studio',score:8.3
});

newTools.push({
  id:'stability-api',name:'Stability AI API',
  description:'The official Stability AI API provides developer access to Stable Diffusion 3, SDXL, and other cutting-edge models for image generation, video generation, 3D asset creation, and audio. Comprehensive developer documentation and SDKs in multiple languages. Supports batch processing for high-volume workflows. Enterprise scalable infrastructure. Pay-per-generation pricing. Ideal for businesses and developers integrating AI image generation into their applications.',
  shortDesc:'Developer platform for Stable Diffusion models',
  url:'https://platform.stability.ai',category:'image',
  tags:['API','Stable Diffusion','Developer','Image Generation','Enterprise'],
  pricing:'paid',
  useCases:['API integration','SD model access','Video generation','3D asset creation','Enterprise deployment'],
  prosCons:{pros:['Official SD API','Latest models','Developer tools','Batch processing','Scalable'],cons:['API only no UI','Pay per generation','Expensive at scale','Doc gaps','Open source competition']},
  officialUrl:'https://platform.stability.ai',score:8.6
});

// === CODE (5 new) ===
newTools.push({
  id:'sourcegraph-cody',name:'Sourcegraph Cody',
  description:'Cody is an AI coding assistant from Sourcegraph that understands your entire codebase across all your repositories. It provides context-aware code completions, explains complex code, generates tests, and fixes bugs. It indexes your organizations complete codebase for accurate, codebase-aware answers. Supports multi-repo search and understanding. Free tier available with premium features for teams and enterprises.',
  shortDesc:'AI coding assistant with full codebase awareness',
  url:'https://sourcegraph.com',category:'code',
  tags:['Code Search','Code Review','AI Coding','Codebase Intelligence','Developer Tool'],
  pricing:'freemium',
  useCases:['Codebase-wide refactoring','Legacy code understanding','Test generation','Code review','Project onboarding'],
  prosCons:{pros:['Full codebase context','Multi-repo support','Explains complex code','Test generation','Private deployment'],cons:['Setup complexity','Enterprise focus','Free tier limited','Resource intensive','Learning curve']},
  officialUrl:'https://sourcegraph.com',score:8.9
});

newTools.push({
  id:'tabnine',name:'Tabnine',
  description:'Tabnine is an AI code completion assistant that prioritizes privacy by offering local models for security-conscious development teams. It supports 90+ programming languages and 15+ IDEs including VS Code, JetBrains, and Vim. On-premise deployment available for enterprise security requirements. Context-aware completions that understand your coding patterns. Free tier with basic completions, paid plans for advanced features.',
  shortDesc:'Privacy-first AI code completion with local models',
  url:'https://tabnine.com',category:'code',
  tags:['AI Code Completion','Privacy','IDE Plugin','Enterprise Code AI','Developer Productivity'],
  pricing:'freemium',
  useCases:['Daily coding','Code completion','Enterprise development','Learning new frameworks','Product coding'],
  prosCons:{pros:['Privacy-first','Local models','On-premise option','90+ languages','IDE support'],cons:['Less accurate than cloud','Premium pricing','Limited context','Slower than Copilot','Fewer features free']},
  officialUrl:'https://tabnine.com',score:8.5
});

newTools.push({
  id:'codeium',name:'Codeium (Windsurf)',

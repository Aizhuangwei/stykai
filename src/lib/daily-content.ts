/**
 * Daily Content Schedule for STYK Ai
 * Each entry generates a new /seo/ page with unique content
 * Rotates through: review, alternatives, comparison
 */

export interface DailyContent {
  slug: string;
  type: 'review' | 'alternatives' | 'comparison';
  toolId: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  date: string; // YYYY-MM-DD
}

const WEEKLY_SCHEDULE: Omit<DailyContent, 'date'>[] = [
  // Monday
  {
    slug: 'grok-review-2026',
    type: 'review',
    toolId: 'grok',
    title: 'xAI Grok Review 2026: Features, Pricing & Real-World Test',
    description: 'Honest xAI Grok review 2026: real-time AI assistant tested for news analysis, coding, and social insights. Compare pricing, pros & cons. Find the best AI tools on STYK Ai.',
    h1: 'xAI Grok Review 2026: Real-World AI Assistant Tested',
    intro: 'Grok, developed by xAI (Elon Musk\x27s AI company), has emerged as a distinctive AI assistant with its real-time data access from the X/Twitter platform. Unlike other AI assistants that rely on static training data, Grok connects directly to live social conversations and news streams. In this comprehensive review, we test Grok\x27s capabilities across news analysis, coding, content generation, and social insights to help you decide if it deserves a place in your AI toolkit.',
  },
  // Tuesday
  {
    slug: 'perplexity-pro-free-vs-paid',
    type: 'alternatives',
    toolId: 'perplexity',
    title: 'Perplexity Pro vs Free 2026: Is It Worth Upgrading?',
    description: 'Compare Perplexity Free vs Pro in 2026. Features, pricing ($20/month), limitations, and free alternatives. Find the best AI tools on STYK Ai.',
    h1: 'Perplexity Pro vs Free 2026: Which Plan Should You Choose?',
    intro: 'Perplexity has become one of the most popular AI search engines, but many users are confused about whether they need the Pro plan. In this deep dive, we compare Perplexity Free vs Pro across search quality, model access, file upload capabilities, and daily usage limits. We also explore the best free alternatives to Perplexity Pro.',
  },
  // Wednesday
  {
    slug: 'deepseek-vs-chatgpt-vs-claude',
    type: 'comparison',
    toolId: 'deepseek',
    title: 'DeepSeek vs ChatGPT vs Claude 2026: Which AI Is Best for Coding?',
    description: 'DeepSeek vs ChatGPT vs Claude comparison 2026: coding performance, reasoning, pricing tested head-to-head. Find the best AI coding assistant on STYK Ai.',
    h1: 'DeepSeek vs ChatGPT vs Claude: AI Coding Showdown 2026',
    intro: 'The battle for AI coding supremacy has three major contenders: DeepSeek with its exceptional reasoning capabilities, ChatGPT with its broad ecosystem, and Claude with its safety-focused approach. We pit them against each other in real-world coding tests to determine which AI assistant delivers the best results for developers in 2026.',
  },
  // Thursday
  {
    slug: 'n8n-alternatives-free-open-source',
    type: 'alternatives',
    toolId: 'n8n',
    title: '8 Best Free n8n Alternatives in 2026 (Open Source & Self-Hosted)',
    description: 'Looking for n8n alternatives? Compare 8 free and open-source workflow automation tools. Features, pricing, self-hosting options. Find the best AI tools on STYK Ai.',
    h1: '8 Best Free n8n Alternatives for Workflow Automation in 2026',
    intro: 'n8n is a powerful open-source workflow automation platform, but it may not be the perfect fit for every team. Whether you need simpler setup, different integrations, or a more visual interface, we\x27ve tested and compared the top n8n alternatives. From Zapier to Make to Activepieces, find the workflow tool that matches your needs.',
  },
  // Friday
  {
    slug: 'github-copilot-pricing-2026',
    type: 'review',
    toolId: 'github-copilot',
    title: 'GitHub Copilot Pricing 2026: Is It Worth $10/$19 Per Month?',
    description: 'GitHub Copilot pricing 2026 explained: Individual $10/mo vs Business $19/mo vs free alternatives. Feature comparison and value analysis. Find the best AI coding tools on STYK Ai.',
    h1: 'GitHub Copilot Pricing 2026: Individual vs Business vs Free',
    intro: 'GitHub Copilot remains the most popular AI coding assistant, but its pricing has evolved. With individual plans at $10/month and business plans at $19/month, is Copilot still the best value? We compare pricing tiers, analyze features, and explore free alternatives to help you make the right choice.',
  },
  // Saturday
  {
    slug: 'leonardo-ai-free-alternatives',
    type: 'alternatives',
    toolId: 'leonardo',
    title: 'Best Leonardo AI Alternatives 2026: Free Image Generators Compared',
    description: 'Looking for Leonardo AI alternatives? Compare 6 free AI image generators including DALL-E 3, Midjourney, Stable Diffusion. Features, pricing, quality tested. Find the best AI tools on STYK Ai.',
    h1: 'Best Leonardo AI Alternatives: Free AI Image Generators Compared',
    intro: 'Leonardo AI has carved out a niche with its generous free credits and 3D texture generation, but other AI image generators may better suit your needs. We compare the top alternatives including DALL-E 3, Midjourney, Stable Diffusion 3, and more across image quality, pricing, and use cases.',
  },
  // Sunday
  {
    slug: 'veed-io-vs-capcut-vs-descript',
    type: 'comparison',
    toolId: 'veed-io',
    title: 'VEED.io vs CapCut vs Descript 2026: Best AI Video Editor Compared',
    description: 'VEED.io vs CapCut vs Descript: features, pricing, pros & cons compared. Find the best browser-based AI video editor for your needs. Find the best AI tools on STYK Ai.',
    h1: 'VEED.io vs CapCut vs Descript: AI Video Editor Comparison 2026',
    intro: 'Browser-based video editing has exploded in popularity, with VEED.io, CapCut, and Descript leading the pack. But which one is right for you? We compare these three platforms across auto-captioning accuracy, editing features, pricing, and export quality to help content creators choose their ideal video editing tool.',
  },
];

/**
 * Get today's scheduled content based on the day of the week
 */
export function getTodayContent(): DailyContent {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
  const schedule = WEEKLY_SCHEDULE[dayOfWeek === 0 ? 6 : dayOfWeek - 1]; // Mon=0
  const dateStr = today.toISOString().split('T')[0];
  return { ...schedule, date: dateStr };
}

/**
 * Get all content entries
 */
export function getDailyContent(): typeof WEEKLY_SCHEDULE {
  return WEEKLY_SCHEDULE;
}

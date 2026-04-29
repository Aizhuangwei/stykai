const fs = require('fs');
const path = require('path');
const tp = 'C:\\Users\\Administrator\\.openclaw\\workspace\\stykai-frontend\\src\\lib\\tools.ts';
const dataDir = 'C:\\Users\\Administrator\\.openclaw\\workspace\\stykai-frontend\\data';

// Read all batch data
const b2 = JSON.parse(fs.readFileSync(path.join(dataDir, 'batch2.json'), 'utf8'));
const b3 = JSON.parse(fs.readFileSync(path.join(dataDir, 'batch3.json'), 'utf8'));
const b3b = JSON.parse(fs.readFileSync(path.join(dataDir, 'batch3b.json'), 'utf8'));
const b3c = JSON.parse(fs.readFileSync(path.join(dataDir, 'batch3c.json'), 'utf8'));
const b3d = JSON.parse(fs.readFileSync(path.join(dataDir, 'batch3d.json'), 'utf8'));

const extra4 = [
  {id:"auto-draw",name:"AutoDraw AI",description:"Google AI-powered drawing tool turning rough sketches into polished illustrations.",shortDesc:"AI that turns sketches into illustrations",url:"https://autodraw.com",category:"image",tags:["AI Drawing","Sketch","Illustration","Google AI","Creative"],pricing:"free",useCases:["Quick illustrations","Visual brainstorming","Educational diagrams","Design mockups"],prosCons:{pros:["Free and fun","Easy interface","Smart suggestions","No install needed","Beginner friendly"],cons:["Limited style range","Basic features","No fine control","Simple output","Not professional grade"]},officialUrl:"https://autodraw.com",score:8.2},
  {id:"lalal-ai",name:"LALAL.AI",description:"AI-powered audio stem separation extracting vocals, drums, bass, and instruments from any audio. 100+ formats. Phoenix algorithm delivers industry-leading quality.",shortDesc:"AI audio stem separation tool",url:"https://lalal.ai",category:"audio",tags:["Audio Separation","Stem Extraction","Music Production","Audio Editing","Vocal Isolation"],pricing:"freemium",useCases:["Vocal extraction","Instrument isolation","Remixing","Podcast editing","Music production"],prosCons:{pros:["High quality separation","Multiple stem types","100+ format support","Fast processing","Clean extraction"],cons:["Free tier limited","Expensive full plan","No real-time","Processing time","Not perfect complex mixes"]},officialUrl:"https://lalal.ai",score:8.5},
  {id:"hey-gen",name:"HeyGen",description:"AI video platform creating professional videos with realistic digital avatars. Text-to-video with lip-synced avatars. 100+ avatar options, 40+ languages.",shortDesc:"AI video with realistic digital avatars",url:"https://heygen.com",category:"video",tags:["AI Avatar","Text-to-Video","Digital Avatar","Video Creation","Corporate"],pricing:"freemium",useCases:["Training videos","Marketing demos","Personalized video","Product demos","Internal comms"],prosCons:{pros:["Realistic avatars","Accurate lip sync","Multi-language","Voice cloning","Professional templates"],cons:["Premium pricing","Limited free tier","Avatar variety limited","Corporate focused","Custom avatar expensive"]},officialUrl:"https://heygen.com",score:8.9},
  {id:"zapier-central",name:"Zapier Central AI",description:"AI-powered automation platform connecting 6000+ apps. AI agents understand natural language, make decisions, and act across your tools. No-code workflows with AI reasoning.",shortDesc:"AI-powered automation with natural language",url:"https://zapier.com/central",category:"productivity",tags:["Automation","No Code","Workflow","App Integration","AI Agent"],pricing:"paid",useCases:["Multi-step automation","Cross-app workflows","AI data processing","Business automation","Sales workflows"],prosCons:{pros:["6000+ app integrations","Natural language AI","Multi-step automation","Reliable triggers","Enterprise ready"],cons:["Monthly subscription","Expensive at scale","Learning curve","Complex pricing","Overkill for simple tasks"]},officialUrl:"https://zapier.com/central",score:8.8}
];

// Combine + dedup
const allNew = [...b2, ...b3, ...b3b, ...b3c, ...b3d, ...extra4];
const seen = new Set();
const uniq = [];
for (const t of allNew) {
  if (!seen.has(t.id)) { seen.add(t.id); uniq.push(t); }
}
console.log('Unique new tools:', uniq.length);

// Build the header
const header = `// Type definitions
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
  { id: 'writing', name: 'AI Writing', icon: '\u270d\ufe0f', count: 0 },
  { id: 'image', name: 'AI Image', icon: '\ud83c\udfa8', count: 0 },
  { id: 'code', name: 'AI Coding', icon: '\ud83d\udcbb', count: 0 },
  { id: 'video', name: 'AI Video', icon: '\ud83c\udfac', count: 0 },
  { id: 'marketing', name: 'AI Marketing', icon: '\ud83d\udce2', count: 0 },
  { id: 'audio', name: 'AI Audio', icon: '\ud83c\udfb5', count: 0 },
  { id: 'productivity', name: 'AI Productivity', icon: '\u26a1', count: 0 },
  { id: 'search', name: 'AI Search', icon: '\ud83d\udd0d', count: 0 },
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

const tools: Tool[] = [
`;

// Generate TS entries
const esc = (s) => s.replace(/'/g, "\\'").replace(/`/g, "\\`");
const gen = (t) => {
  const feat = t.featured ? '\n    featured: true,' : '';
  return `  {
    id: '${esc(t.id)}',
    name: '${esc(t.name)}',
    description: '${esc(t.description)}',
    shortDesc: '${esc(t.shortDesc)}',
    url: '${esc(t.url)}',
    category: '${t.category}',
    tags: [${t.tags.map(x => `'${esc(x)}'`).join(', ')}],
    pricing: '${t.pricing}',
    useCases: [${t.useCases.map(x => `'${esc(x)}'`).join(', ')}],
    prosCons: { pros: [${t.prosCons.pros.map(x => `'${esc(x)}'`).join(', ')}], cons: [${t.prosCons.cons.map(x => `'${esc(x)}'`).join(', ')}] },
    officialUrl: '${esc(t.officialUrl)}',${feat}
    score: ${t.score},
  }`;
};

const toolsBody = uniq.map(gen).join(',\n');

const footer = `] as const;

// Update category counts
categories.forEach(c => {
  c.count = tools.filter(t => t.category === c.id).length;
});
`;

const result = header + toolsBody + ',\n' + footer;

fs.writeFileSync(tp, result);
console.log('Written to tools.ts');

const verify = fs.readFileSync(tp, 'utf8');
const totalIds = (verify.match(/id:\s*'/g) || []).length;
console.log('Total id: entries:', totalIds);
console.log('Expected:', uniq.length + ' tools + 8 categories =', uniq.length + 8);

// Category distribution
const catDist = {};
for (const t of uniq) {
  catDist[t.category] = (catDist[t.category] || 0) + 1;
}
console.log('\nCategory distribution:');
for (const [cat, count] of Object.entries(catDist).sort((a,b) => b[1]-a[1])) {
  console.log(`  ${cat}: ${count}`);
}

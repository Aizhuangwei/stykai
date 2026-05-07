import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { tools, categories, getRelatedTools, outboundLink } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return tools.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) return {};
  return {
    title: `${tool.name} Best For | Recommended Use Cases | STYK Ai`,
    description: `Learn about ${tool.name} best use cases and how to use it.${tool.useCases.slice(0, 3).join(', ')} - find the best way to use it.`,
    openGraph: {
      title: `${tool.name} Best Use Cases`,
      description: `${tool.name}  ${tool.useCases.length} best use cases analyzed.`,
    },
    alternates: {
      canonical: `/tools/${id}/best-for`,
    },
  };
}

export default async function BestForPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const related = getRelatedTools(tool, 4);
  const officialLink = outboundLink(tool.officialUrl || tool.url, `Visit ${tool.name}`);

  // Scene detail descriptions for each use case
  const sceneDetails: Record<string, { desc: string; tips: string[] }> = {
    'Content Creation': {
      desc: `${tool.name} helps you quickly generate high-quality content ideas and drafts. Its AI understands your needs across styles and formats.`,
      tips: ['Use clear prompts for better output', 'Combine with manual editing for quality', 'Experiment with different styles and tones'],
    },
    'Programming Assistance': {
      desc: `${tool.name} is a powerful programming assistant for code completion, debugging, and code review. Great for daily development and prototyping.`,
      tips: ['Break large tasks into smaller steps', 'Leverage context understanding', 'Review and test generated code'],
    },
    'Learning & Research': {
      desc: `${tool.name} accelerates research and learning by summarizing information, answering questions, and providing deep insights.`,
      tips: ['Start with specific questions', 'Cross-verify important information', 'Use summarization to learn new domains quickly'],
    },
    'Data Analysis': {
      desc: `${tool.name}  data analysis capabilities help you process data, generate reports, and visualize insights.`,
      tips: ['Provide clean data formats', 'Start simple then go deeper', 'Use explanation features for complex data'],
    },
    'Brainstorming': {
      desc: `${tool.name} excels at creative brainstorming with multi-angle suggestions and idea generation.`,
      tips: ['Provide scenario context for targeted advice', 'Try unexpected ideas', 'Combine with group discussion for best results'],
    },
    'Long Document Analysis': {
      desc: `${tool.name} excels at processing large texts, extracting key information, and answering questions about long documents.`,
      tips: ['Ensure document format is clear', 'Ask chapter by chapter for precision', 'Use summarization to quickly grasp content'],
    },
    'Code Writing': {
      desc: `${tool.name}  code generation lets you prototype quickly, solve problems, and learn new paradigms.`,
      tips: ['Describe specific needs not vague ideas', 'Reference generated comments and docs', 'Build gradually, not all at once'],
    },
    'Academic Writing': {
      desc: `${tool.name} assists with academic writing by organizing thoughts, improving expression, and suggesting structure.`,
      tips: ['Maintain academic rigor', 'Manually verify citations and facts', 'Use polishing features to refine expression'],
    },
    'Strategic Analysis': {
      desc: `${tool.name} offers multi-dimensional analysis for strategic decision-making and scenario evaluation.`,
      tips: ['Provide comprehensive background info', 'Request multiple option comparisons', 'Combine with your own judgment for final decisions'],
    },
    'AI-Driven Programming': {
      desc: `${tool.name} makes programming intuitive and efficient. Describe requirements in natural language to get runnable code.`,
      tips: ['Practice with simple tasks first', 'Understand generated code logic', 'Build complex applications gradually'],
    },
    'Bug Fixing': {
      desc: `${tool.name} quickly identifies code issues and suggests fixes, slashing debugging time.`,
      tips: ['Provide error info and context', 'Explain expected behavior', 'Verify fix completeness'],
    },
    'Project Setup': {
      desc: `${tool.name} helps scaffold projects quickly, generating basic code structure and config files.`,
      tips: ['Clarify tech stack requirements', 'Review generated structure', 'Gradually extend project features'],
    },
    'Daily Coding': {
      desc: `${tool.name} integrates into your daily workflow with real-time suggestions and auto-completion.`,
      tips: ['Keep using within your code editor', 'Learn shortcuts and interactions', 'Adjust to your coding habits'],
    },
    'Code Completion': {
      desc: `${tool.name}  smart code completion predicts your intent and provides accurate suggestions.`,
      tips: ['Write meaningful function names', 'Keep code style consistent', 'Use suggestions to learn best practices'],
    },
    'Code Review': {
      desc: `${tool.name} helps with code review by finding potential issues, security flaws, and optimization opportunities.`,
      tips: ['Focus on critical logic', 'Combine with manual review for completeness', 'Use explanation features for complex code'],
    },
    'Quick Prototyping': {
      desc: `${tool.name} quickly turns ideas into working prototypes, shortening the concept-to-implementation cycle.`,
      tips: ['Focus on core features, not details', 'Iterate and improve prototypes', 'Quickly validate idea feasibility'],
    },
    'Art Creation': {
      desc: `${tool.name} provides powerful AI assistance for art creation and creative visual exploration.`,
      tips: ['Explore different style parameters', 'Combine with manual adjustments', 'Reference community best examples'],
    },
    'Concept Design': {
      desc: `${tool.name} quickly generates concept designs, helping designers explore creative directions and visual styles.`,
      tips: ['Provide clear design requirements', 'Iterate and refine design direction', 'Combine with professional design software'],
    },
    'Ad Assets': {
      desc: `${tool.name} excels at ad asset design, quickly generating on-brand visuals.`,
      tips: ['Maintain brand visual consistency', 'Adjust designs for different channels', 'A/B test different creative approaches'],
    },
    'Game Concept Art': {
      desc: `${tool.name} supports game development with character design, scene concepts, and asset creation.`,
      tips: ['Maintain style consistency', 'Use community models for efficiency', 'Combine with manual detail adjustments'],
    },
    'Brand Visuals': {
      desc: `${tool.name} assists brand visual system design from logos to application scenarios.`,
      tips: ['Establish clear brand guidelines', 'Maintain visual element consistency', 'Explore multiple options for comparison'],
    },
    'Creative Design': {
      desc: `${tool.name} sparks creative design ideas with diverse visual solutions and elements.`,
      tips: ['Combine with manual design for uniqueness', 'Try different style combinations', 'Follow design trends'],
    },
    'Content Images': {
      desc: `${tool.name} generates matching visuals based on content themes, boosting visual appeal.`,
      tips: ['Clearly describe image needs', 'Adjust style to match content tone', 'Optimize sizes for different platforms'],
    },
    'Concept Visualization': {
      desc: `${tool.name} transforms abstract concepts into visual images for better communication and understanding.`,
      tips: ['Use clear, concise descriptions', 'Try different visual expressions', 'Combine with text for clear communication'],
    },
    'Social Media': {
      desc: `${tool.name} helps manage social media content from image generation to copywriting.`,
      tips: ['Adjust content per platform', 'Maintain active posting schedule', 'Use analytics to optimize strategy'],
    },
    'Logo Design': {
      desc: `${tool.name} offers diverse creative solutions for logo and brand identity design.`,
      tips: ['Clarify brand positioning and style', 'Aim for simplicity and recognizability', 'Prepare multiple options'],
    },
    'Poster Making': {
      desc: `${tool.name} generates poster designs for different promotional scenarios and sizes.`,
      tips: ['Clarify poster theme and hierarchy', 'Choose appropriate visual style', 'Ensure text readability'],
    },
    'Social Graphics': {
      desc: `${tool.name} creates matching images for social media content, boosting engagement.`,
      tips: ['Keep account visual style unified', 'Adapt to different platform sizes', 'Create timely content around trends'],
    },
    'Product Showcase': {
      desc: `${tool.name} generates professional product showcase images for e-commerce and marketing.`,
      tips: ['Highlight core product features', 'Create appropriate product scenarios', 'Maintain authentic presentation'],
    },
    'Local Creation': {
      desc: `${tool.name} runs locally for complete creative freedom and privacy.`,
      tips: ['Monitor system resource usage', 'Leverage community resources', 'Regularly update models and tools'],
    },
    'Commercial Use': {
      desc: `${tool.name} suits commercial scenarios with commercial-grade output and controlled quality.`,
      tips: ['Confirm licensing and copyright policies', 'Ensure output quality meets standards', 'Establish standardized workflows'],
    },
    'Model Customization': {
      desc: `${tool.name} supports fine-tuning and customization for training custom models.`,
      tips: ['Prepare high-quality training data', 'Start with small-scale tests', 'Continuously evaluate model performance'],
    },
    'Game Design': {
      desc: `${tool.name} assists game design from characters to scenes with rich visual solutions.`,
      tips: ['Maintain unified art style', 'Optimize resource utilization', 'Focus on player experience'],
    },
    'Character Design': {
      desc: `${tool.name} offers rich creative solutions for character design, helping create unique characters.`,
      tips: ['Create character setting documents', 'Explore different style expressions', 'Ensure character consistency and recognizability'],
    },
    'Environment Design': {
      desc: `${tool.name} generates environmental concept art for games and films, building immersive worlds.`,
      tips: ['Reference real environment materials', 'Pay attention to atmosphere and lighting', 'Maintain scene-to-scene coherence'],
    },
    'Video Assets': {
      desc: `${tool.name} generates video asset previews and drafts to aid video creation.`,
      tips: ['Clarify video content and style', 'Use professional video editing software', 'Be mindful of copyright issues'],
    },
    'English Writing': {
      desc: `${tool.name} offers grammar checking, style suggestions, and content optimization for English writing.`,
      tips: ['Adjust writing style for your audience', 'Focus on grammar and word accuracy', 'Use analytics to improve writing'],
    },
    'Email Optimization': {
      desc: `${tool.name} helps optimize email communication for more professional, clear expression.`,
      tips: ['Clarify core email message', 'Adjust tone based on relationship', 'Craft compelling email subject lines'],
    },
    'Business Communication': {
      desc: `${tool.name} improves business communication professionalism and efficiency with templates and suggestions.`,
      tips: ['Keep communication concise and clear', 'Be aware of cross-cultural differences', 'Establish unified communication standards'],
    },
    'Content Proofreading': {
      desc: `${tool.name} provides comprehensive content proofreading to ensure accuracy and professionalism.`,
      tips: ['Proofread multiple rounds for different aspects', 'Use professional terminology correctly', 'Combine with manual review for quality'],
    },
    'Project Documentation': {
      desc: `${tool.name} assists project documentation from requirements to technical docs.`,
      tips: ['Maintain document structure and standards', 'Use templates for efficiency', 'Regularly update and maintain docs'],
    },
    'Meeting Automation': {
      desc: `${tool.name} automatically generates meeting notes and summaries, boosting meeting efficiency.`,
      tips: ['Ensure complete meeting recording', 'Auto-extract key points and action items', 'Distribute and follow up promptly'],
    },
    'Knowledge Base': {
      desc: `${tool.name} helps build and maintain a knowledge base, consolidating important team and project info.`,
      tips: ['Build categories and tags system', 'Regularly update and clean up', 'Encourage team content contribution'],
    },
    'Team Collaboration': {
      desc: `${tool.name} supports team collaboration with real-time collaboration and content sharing.`,
      tips: ['Establish clear collaboration workflows', 'Use comments and annotations', 'Regularly sync team progress'],
    },
    'Writing Assistance': {
      desc: `${tool.name} supports the full writing process from ideation to final draft.`,
      tips: ['Clarify writing goals and audience', 'Use AI suggestions to optimize content', 'Maintain personal writing style'],
    },
    'Marketing Copy': {
      desc: `${tool.name} generates marketing copy for different channels and target audiences.`,
      tips: ['Understand target audience needs', 'Highlight product or service value', 'A/B test different copy versions'],
    },
    'SEO Content': {
      desc: `${tool.name} helps optimize search rankings with keyword research and content structure suggestions.`,
      tips: ['Ensure natural keyword integration', 'Maintain content quality and value', 'Track SEO results and optimize'],
    },
    'Brand Content': {
      desc: `${tool.name} ensures brand content consistency and quality for a strong brand image.`,
      tips: ['Create brand content guidelines', 'Maintain consistent tone and style', 'Regularly evaluate content performance'],
    },
    'Article Writing': {
      desc: `${tool.name} supports article writing from blog posts to professional pieces.`,
      tips: ['Clarify article structure and key points', 'Use outline features to plan content', 'Use data to increase persuasiveness'],
    },
    'Ad Copy': {
      desc: `${tool.name} generates high-conversion ad copy to optimize campaign performance.`,
      tips: ['Highlight selling points and differentiation', 'Control copy length and format', 'Optimize copy style per platform'],
    },
    'Product Descriptions': {
      desc: `${tool.name} helps write compelling product descriptions to boost conversions.`,
      tips: ['Focus on core product value', 'Use persuasive language', 'Incorporate customer reviews to optimize copy'],
    },
    'Social Content': {
      desc: `${tool.name} efficiently generates social media content to keep accounts active and engaging.`,
      tips: ['Adjust content format per platform', 'Keep content fresh and engaging', 'Use engagement data to optimize strategy'],
    },
    'Development': {
      desc: `${tool.name} provides technical support and automation tools for development workflows.`,
      tips: ['Keep learning and adapting to new tools', 'Establish standardized dev processes', 'Use automation to reduce repetitive work'],
    },
    'Video Generation': {
      desc: `${tool.name} generates video content from text descriptions, lowering the production barrier.`,
      tips: ['Provide clear video scripts', 'Choose appropriate visual style', 'Use post-production to enhance quality'],
    },
    'VFX': {
      desc: `${tool.name} creates professional visual effects with AI-assisted video VFX.`,
      tips: ['Clarify VFX goals and effects', 'Reference real physics effects', 'Optimize rendering efficiency'],
    },
    'Ad Shorts': {
      desc: `${tool.name} quickly generates ad short prototypes, shortening the creative cycle.`,
      tips: ['Clarify ad core message', 'Control short video length', 'Create visual impact'],
    },
    'Creative Experiments': {
      desc: `${tool.name} supports creative experiments with diverse visual expression options.`,
      tips: ['Boldly try different styles', 'Document experiments and results', 'Learn from experiment results'],
    },
    'Enterprise Training': {
      desc: `${tool.name} assists enterprise training content creation for better training outcomes.`,
      tips: ['Design interactive training content', 'Use AI for personalized learning', 'Evaluate training effectiveness and optimize'],
    },
    'Marketing Videos': {
      desc: `${tool.name} helps create marketing video content to boost brand reach.`,
      tips: ['Focus on video hook strength', 'Maintain brand visual consistency', 'Analyze video data to optimize strategy'],
    },
    'Product Demos': {
      desc: `${tool.name} generates professional product demos to help users understand product value.`,
      tips: ['Focus on core product features', 'Use simple, clear language', 'Combine with visuals to enhance understanding'],
    },
    'Internal Communication': {
      desc: `${tool.name} improves internal communication from meetings to docs.`,
      tips: ['Choose appropriate communication tools', 'Keep information clear and concise', 'Establish effective feedback mechanisms'],
    },
    'Multi-language Content': {
      desc: `${tool.name} supports multi-language content generation and translation for global reach.`,
      tips: ['Ensure translation accuracy', 'Consider cultural differences', "Localize, do not just translate"],
    },
    'Audiobook Production': {
      desc: `${tool.name} excels at voice synthesis for audiobooks and audio content production.`,
      tips: ['Choose appropriate narration style', 'Control pace and emotional tone', 'Be mindful of copyright and licensing'],
    },
    'Video Dubbing': {
      desc: `${tool.name} provides high-quality dubbing for video content in multiple languages.`,
      tips: ['Match video content and tone', 'Ensure lip sync and rhythm synchronization', 'Choose appropriate voice character'],
    },
    'Voice Assistants': {
      desc: `${tool.name} provides natural, realistic voice synthesis for voice assistants.`,
      tips: ['Optimize conversation naturalness', 'Handle special vocabulary and terminology', 'Maintain response consistency'],
    },
    'Podcast Creation': {
      desc: `${tool.name} supports podcast creation from scripting to audio production.`,
      tips: ['Plan show structure and content', 'Focus on audio quality improvement', 'Maintain consistent content style'],
    },
    'Background Music': {
      desc: `${tool.name} generates background music for various scenarios, enhancing emotional expression.`,
      tips: ['Match content and emotion', 'Be mindful of music copyright', 'Control volume and mixing'],
    },
    'Song Creation': {
      desc: `${tool.name} assists song creation from melody to lyrics with creative inspiration.`,
      tips: ['Clarify song style and theme', 'Combine with human creativity for quality', 'Explore different musical elements'],
    },
    'Content Scoring': {
      desc: `${tool.name} scores videos and content to enhance the overall audiovisual experience.`,
      tips: ['Match content mood', 'Pay attention to music rhythm and timing', 'Maintain professional music quality'],
    },
    'Daily Planning': {
      desc: `${tool.name} helps plan daily work and life, optimizing time and task priorities.`,
      tips: ['Set clear goals and priorities', 'Regularly review and adjust plans', 'Stay flexible to adapt to changes'],
    },
    'Task Management': {
      desc: `${tool.name} provides efficient task management to track progress and manage projects.`,
      tips: ['Break tasks into actionable items', 'Set reasonable deadlines', 'Regularly check and update status'],
    },
    'Task Assignment': {
      desc: `${tool.name} supports team task assignment, optimizing resource allocation.`,
      tips: ['Assign tasks based on capabilities', 'Clarify task goals and expectations', 'Keep communication channels open'],
    },
    'Mind Maps': {
      desc: `${tool.name} helps create mind maps to visualize ideas and knowledge structures.`,
      tips: ['Start from core topic and expand', 'Use concise keywords', 'Regularly organize and update'],
    },
    'Workflow Automation': {
      desc: `${tool.name} automates and optimizes workflows, reducing repetitive work.`,
      tips: ['Identify automatable tasks', 'Start small and test', 'Continuously monitor and optimize'],
    },
    'Model Deployment': {
      desc: `${tool.name} helps deploy and manage AI models with scalable compute and API services.`,
      tips: ['Choose appropriate deployment method', 'Monitor performance and resource usage', 'Set up auto-scaling'],
    },
    'API Calls': {
      desc: `${tool.name} provides complete APIs for integrating and calling AI features.`,
      tips: ['Familiarize with API docs and specs', 'Implement error handling and retry', 'Optimize request frequency and caching'],
    },
    'Fine-tuning': {
      desc: `${tool.name} supports fine-tuning to adapt AI to specific domains and tasks.`,
      tips: ['Prepare high-quality training data', 'Control fine-tuning parameters', 'Evaluate fine-tuned model performance'],
    },
    'AI Research': {
      desc: `${tool.name} provides tools and resources for AI research, accelerating experiments.`,
      tips: ['Track latest research results', 'Reproduce and verify paper results', 'Actively engage with the community'],
    },
    'Project Showcase': {
      desc: `${tool.name} helps showcase AI projects with deployment and demo solutions.`,
      tips: ['Design intuitive user interfaces', 'Prepare project background info', 'Collect user feedback for improvement'],
    },
    'Meeting Transcription': {
      desc: `${tool.name} automatically transcribes meetings into searchable notes.`,
      tips: ['Ensure recording quality and clarity', 'Verify important information accuracy', 'Integrate transcription and notes'],
    },
    'Meeting Notes': {
      desc: `${tool.name} generates structured meeting notes with key points and action items.`,
      tips: ['Ensure complete meeting records', 'Highlight decisions and tasks', 'Distribute and track execution'],
    },
    'Interview Recording': {
      desc: `${tool.name} helps record and organize interviews for hiring evaluation.`,
      tips: ['Ensure complete interview recording', 'Focus on key capabilities and performance', 'Protect candidate privacy'],
    },
    'Team Communication': {
      desc: `${tool.name} improves team communication efficiency and collaboration.`,
      tips: ['Choose appropriate communication tools', 'Keep information structured', 'Establish efficient feedback mechanisms'],
    },
    'Sales Analysis': {
      desc: `${tool.name} automates sales data analysis with customer insights and trend predictions.`,
      tips: ['Integrate multi-source sales data', 'Focus on key performance indicators', 'Use insights to drive decisions'],
    },
    'CRM Sync': {
      desc: `${tool.name} enables intelligent CRM with automatic data sync and updates.`,
      tips: ['Maintain data accuracy and consistency', 'Use automation to reduce manual entry', 'Track customer interaction history'],
    },
    'Personal Notes': {
      desc: `${tool.name} manages personal notes and knowledge with auto-organization and smart search.`,
      tips: ['Build a habit of recording', 'Regularly review and organize notes', 'Link related knowledge together'],
    },
    'Research Organization': {
      desc: `${tool.name} assists research material organization and information management.`,
      tips: ['Build a research database', 'Use tags and categories for management', 'Regularly review research progress'],
    },
    'Content Curation': {
      desc: `${tool.name} provides content curation and planning support for effective strategies.`,
      tips: ['Analyze target audience preferences', 'Plan content publishing calendar', 'Track content performance data'],
    },
    'Team Knowledge': {
      desc: `${tool.name} builds and manages team knowledge bases for knowledge sharing.`,
      tips: ['Encourage team member contributions', 'Keep knowledge base updated', 'Build easy search mechanisms'],
    },
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">STYK Ai</Link>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">← Back to Details</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">{tool.name}</Link>
          <span>/</span>
          <span className="text-gray-300">Best Use Cases</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {tool.name} Best For?
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            {tool.name}  is an {cat ? cat.name : 'AI'}Tools，Rating {tool.score}/10.
            {tool.useCases.length > 0
              ? `Here are ${tool.useCases.length}  best use cases for ${tool.name}`
              : 'This analysis helps you understand how to best use this tool.'}
          </p>
        </div>

        {/* Use Cases */}
        {tool.useCases.length > 0 ? (
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>🎯</span> Best Use Cases
            </h2>
            {tool.useCases.map((uc, i) => {
              const scene = sceneDetails[uc] || {
                desc: `${tool.name} in "${uc}" excels, helping users complete tasks efficiently.`,
                tips: ['Set clear goals before starting', 'Make the most of core features', 'Optimize usage for your specific scenario'],
              };
              return (
                <div key={i} className="card-base p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">
                      {['🎨', '💻', '📝', '📊', '🎯', '📚', '🎬', '🎵', '🛠️', '🔬', '📈', '✍️', '🎮', '🏢', '🏫'][i % 15]}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-200">{uc}</h3>
                      <p className="text-xs text-gray-500">Scenario {i + 1}</p>
                    </div>
                    <span className="ml-auto text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4">{scene.desc}</p>
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tips</h4>
                    <ul className="space-y-1.5">
                      {scene.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-cyan-400 mt-0.5 shrink-0">💡</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 card-base mb-12">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">No detailed scenario analysis available</p>
          </div>
        )}

        {/* CTA */}
        <div className="card-base p-8 gradient-border mb-12 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">
            Ready to use {tool.name}?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            No matter which scenario, {tool.name}  helps you boost productivity.
            Visit the website and get started now.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              {...officialLink}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              🚀 Visit {tool.name} Official
            </a>
            <Link
              href={`/tools/${tool.id}/review`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition border border-gray-700"
            >
              📝 Read Full Review
            </Link>
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">📂 Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(r => (
                <ToolCard key={r.id} tool={r} />
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="border-t border-gray-800 pt-8">
          <h2 className="text-lg font-bold mb-4">🔗 Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${tool.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {tool.name} Details
            </Link>
            <Link href={`/tools/${tool.id}/review`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📝 {tool.name} Review
            </Link>
            <Link href={`/tools/${tool.id}/alternatives`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🔄 {tool.name} Alternatives
            </Link>
            <Link href="/" className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🏠 Browse All
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 mt-16 text-center text-sm text-gray-500">
        <p>© 2026 STYK Ai. AI Tools Navigation.</p>
      </footer>
    </div>
  );
}

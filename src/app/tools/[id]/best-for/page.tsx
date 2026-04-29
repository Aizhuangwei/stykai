import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { tools, categories, getRelatedTools, outboundLink, getPricingLabel } from '@/lib/tools';
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
    title: `${tool.name} 最适合什么？最佳使用场景推荐 | STYK Ai`,
    description: `了解 ${tool.name} 最适合的应用场景和使用方式。${tool.useCases.slice(0, 3).join('、')} - 找到最适合你的使用方式。`,
    openGraph: {
      title: `${tool.name} 最佳使用场景`,
      description: `${tool.name} 的 ${tool.useCases.length} 大最佳使用场景分析。`,
    },
  };
}

export default async function BestForPage({ params }: Props) {
  const { id } = await params;
  const tool = tools.find(t => t.id === id);
  if (!tool) notFound();

  const cat = categories.find(c => c.id === tool.category);
  const related = getRelatedTools(tool, 4);
  const officialLink = outboundLink(tool.officialUrl || tool.url, `访问 ${tool.name}`);

  // Scene detail descriptions for each use case
  const sceneDetails: Record<string, { desc: string; tips: string[] }> = {
    '内容创作': {
      desc: `${tool.name} 能帮助你快速生成高质量的内容创意和草稿。其 AI 能力可以理解你的需求，提供多种风格和格式的内容输出。`,
      tips: ['使用明确的提示词（Prompt）获得更好的输出', '结合人工编辑提升内容质量', '尝试不同的风格和语气参数'],
    },
    '编程辅助': {
      desc: `${tool.name} 可以作为得力编程助手，提供代码补全、错误排查和代码审查功能。特别适合日常开发和快速原型制作。`,
      tips: ['将大型任务拆解为小步骤', '充分利用上下文理解功能', '对生成的代码进行审查和测试'],
    },
    '学习研究': {
      desc: `${tool.name} 能加速研究和学习过程。它可以总结大量信息、回答相关问题并提供深度见解。`,
      tips: ['从具体问题开始提问', '交叉验证重要信息', '利用其总结能力快速了解新领域'],
    },
    '数据分析': {
      desc: `${tool.name} 的数据分析能力让你能够快速处理和理解数据，生成报告和可视化建议。`,
      tips: ['提供清晰的数据格式', '从简单分析开始逐步深入', '使用其解释功能理解复杂数据'],
    },
    '头脑风暴': {
      desc: `${tool.name} 在创意激发方面表现出色。它可以提供多角度的建议、生成创意灵感和扩展思路。`,
      tips: ['给出场景背景以获取针对性建议', '尝试让你意外的想法', '结合多人讨论发挥最大效果'],
    },
    '长文档分析': {
      desc: `${tool.name} 擅长处理大量文本，能够快速提取关键信息、总结要点并回答关于长文档的问题。`,
      tips: ['确保文档格式清晰', '分章节提问以获得更精确的回答', '利用总结功能快速掌握内容'],
    },
    '代码编写': {
      desc: `${tool.name} 的代码生成能力让你能够快速实现功能原型、解决编程难题并学习新的编程范式。`,
      tips: ['描述具体需求而非模糊想法', '参考生成的注释和文档', '逐步构建而非一次性生成全部'],
    },
    '学术写作': {
      desc: `${tool.name} 能够辅助学术写作，帮助组织思路、改进表达并提供结构建议。`,
      tips: ['保持学术严谨性', '手动验证引用和事实', '使用其润色功能优化表达'],
    },
    '战略分析': {
      desc: `${tool.name} 可以进行多维度分析和推理，帮助制定战略决策和评估不同方案。`,
      tips: ['提供全面的背景信息', '要求多种方案对比', '结合自身判断做最终决策'],
    },
    'AI 驱动编程': {
      desc: `${tool.name} 让编程变得更加直觉化和高效。通过 AI 辅助，你可以用自然语言描述需求并直接获得可运行的代码。`,
      tips: ['从简单任务开始练习', '理解生成的代码逻辑', '逐步构建复杂应用'],
    },
    'Bug 修复': {
      desc: `${tool.name} 能够快速定位代码中的问题并提供修复建议，大幅减少调试时间。`,
      tips: ['提供错误信息和上下文', '解释你期望的行为', '验证修复方案的完整性'],
    },
    '项目搭建': {
      desc: `${tool.name} 可以帮助你快速搭建项目骨架，生成基础代码结构和配置文件。`,
      tips: ['明确项目技术栈要求', '审查生成的结构是否合理', '逐步扩展项目功能'],
    },
    '日常编程': {
      desc: `${tool.name} 融入日常开发流程，提供实时代码建议和自动补全，提升编码效率。`,
      tips: ['保持代码编辑器内集成使用', '熟悉快捷键和交互方式', '结合自身编码习惯调整使用方式'],
    },
    '代码补全': {
      desc: `${tool.name} 的智能代码补全功能能够预测你的编码意图并提供准确的代码建议。`,
      tips: ['编写有意义的函数名称', '保持代码风格一致', '利用建议学习最佳实践'],
    },
    '代码审查': {
      desc: `${tool.name} 可以帮助进行代码审查，发现潜在问题、安全漏洞和优化机会。`,
      tips: ['关注关键逻辑部分', '结合人工审查确保全面', '使用其解释功能理解复杂代码'],
    },
    '快速原型': {
      desc: `${tool.name} 能够快速将想法转化为可工作的原型，大幅缩短从概念到实现的周期。`,
      tips: ['关注核心功能而非细节', '迭代改进原型', '快速验证想法可行性'],
    },
    '艺术创作': {
      desc: `${tool.name} 为艺术创作提供强大的 AI 辅助，帮助生成创意视觉作品和探索不同的艺术风格。`,
      tips: ['探索不同的风格参数', '结合手工调整完善作品', '参考社区优秀案例'],
    },
    '概念设计': {
      desc: `${tool.name} 能够快速生成概念设计稿，帮助设计师探索多种创意方向和视觉风格。`,
      tips: ['提供清晰的设计需求', '迭代细化设计方向', '结合专业设计软件完善'],
    },
    '广告素材': {
      desc: `${tool.name} 在广告素材设计方面效率突出，能够快速生成符合品牌调性的视觉内容。`,
      tips: ['保持品牌视觉一致性', '针对不同渠道调整设计', 'A/B 测试不同创意方案'],
    },
    '游戏原画': {
      desc: `${tool.name} 为游戏开发提供角色设计、场景概念和资产创作等支持。`,
      tips: ['保持风格一致性', '利用社区模型提高效率', '结合手工调整完善细节'],
    },
    '品牌视觉': {
      desc: `${tool.name} 可以辅助品牌视觉系统设计，从 Logo 到应用场景提供全面的设计支持。`,
      tips: ['建立清晰的品牌指南', '保持视觉元素一致性', '探索多方案对比选择'],
    },
    '创意设计': {
      desc: `${tool.name} 激发创意设计灵感，提供多样化的视觉方案和设计元素。`,
      tips: ['结合手工设计独特作品', '尝试不同风格的组合', '关注设计趋势'],
    },
    '内容配图': {
      desc: `${tool.name} 能够根据内容主题快速生成匹配的配图，提升内容的视觉吸引力。`,
      tips: ['清晰描述配图需求', '调整风格匹配内容调性', '优化尺寸适应不同平台'],
    },
    '概念可视化': {
      desc: `${tool.name} 将抽象概念转化为可视化的图像，帮助沟通和理解复杂信息。`,
      tips: ['使用简洁明了的描述', '尝试不同的视觉表现方式', '结合文字说明清晰传达'],
    },
    '社交媒体': {
      desc: `${tool.name} 帮助高效管理社交媒体内容，从图片生成到文案撰写提供全面支持。`,
      tips: ['针对不同平台调整内容', '保持活跃的发布节奏', '利用分析数据优化策略'],
    },
    'Logo 设计': {
      desc: `${tool.name} 在 Logo 和品牌标识设计方面提供多样化的创意方案。`,
      tips: ['明确品牌定位和风格', '追求简洁和可识别性', '准备多种方案供选择'],
    },
    '海报制作': {
      desc: `${tool.name} 能够快速生成各类海报设计，适应不同的宣传场景和尺寸要求。`,
      tips: ['明确海报主题和信息层级', '选择合适的视觉风格', '注意文字可读性'],
    },
    '社媒配图': {
      desc: `${tool.name} 为社交媒体内容快速生成搭配图片，提升社媒内容的视觉吸引力。`,
      tips: ['保持账号视觉风格统一', '适应不同平台尺寸', '结合热点及时创作'],
    },
    '产品展示': {
      desc: `${tool.name} 帮助生成专业的产品展示图片，提升电商和营销场景的产品视觉表现。`,
      tips: ['突出产品核心特点', '营造合适的产品场景', '保持真实可信的呈现'],
    },
    '本地创作': {
      desc: `${tool.name} 可以在本地环境运行，提供完全的创作自由度和隐私保护。`,
      tips: ['关注系统资源占用', '充分利用社区资源', '定期更新模型和工具'],
    },
    '商业应用': {
      desc: `${tool.name} 适合商业场景，提供可商业化的输出和可控的质量。`,
      tips: ['确认授权和版权政策', '确保输出质量符合标准', '建立标准化工作流程'],
    },
    '模型定制': {
      desc: `${tool.name} 支持模型微调和定制，可以根据特定需求训练专属模型。`,
      tips: ['准备高质量的训练数据', '从小规模测试开始', '持续评估模型表现'],
    },
    '游戏设计': {
      desc: `${tool.name} 辅助游戏设计流程，从角色到场景提供丰富的视觉方案。`,
      tips: ['保持统一的艺术风格', '优化资源利用率', '关注玩家体验'],
    },
    '角色设计': {
      desc: `${tool.name} 在角色设计方面提供丰富的创意方案，帮助创造独特的角色形象。`,
      tips: ['建立角色设定文档', '探索不同风格的表现', '确保角色的一致性和可辨识度'],
    },
    '环境设计': {
      desc: `${tool.name} 生成游戏和影视场景的环境概念图，辅助沉浸式世界构建。`,
      tips: ['参考真实环境素材', '注意场景氛围和光影', '保持场景间的衔接连贯'],
    },
    '视频素材': {
      desc: `${tool.name} 可以生成视频素材的预览和草稿，辅助视频创作流程。`,
      tips: ['明确视频内容和风格', '结合专业视频编辑软件', '注意素材的版权问题'],
    },
    '英文写作': {
      desc: `${tool.name} 在英文写作方面提供语法检查、风格建议和内容优化等服务。`,
      tips: ['根据受众调整写作风格', '关注语法和用词的准确性', '利用分析功能提升写作水平'],
    },
    '邮件优化': {
      desc: `${tool.name} 帮助优化邮件沟通，提供更专业、清晰的表达方式。`,
      tips: ['明确邮件的核心信息', '根据关系调整语气', '注意邮件标题的吸引力'],
    },
    '商务沟通': {
      desc: `${tool.name} 提升商务沟通的专业性和效率，提供多场景的沟通模板和优化建议。`,
      tips: ['保持简洁清晰的表达', '关注不同文化的沟通差异', '建立统一的沟通标准'],
    },
    '内容校对': {
      desc: `${tool.name} 提供全面的内容校对服务，确保输出内容的准确性和专业性。`,
      tips: ['多轮校对不同方面', '关注专业术语的正确使用', '结合人工审查确保质量'],
    },
    '项目文档': {
      desc: `${tool.name} 辅助项目文档编写和管理，从需求文档到技术文档提供全面的写作支持。`,
      tips: ['保持文档结构和规范', '使用模板提高效率', '定期更新维护文档'],
    },
    '会议记录': {
      desc: `${tool.name} 能够自动生成会议记录和摘要，大幅提升会议效率。`,
      tips: ['确保会议内容完整录制', '自动提取关键要点和行动项', '及时分发和跟进'],
    },
    '知识库': {
      desc: `${tool.name} 帮助构建和维护知识库，整合团队和项目的重要信息。`,
      tips: ['建立分类和标签体系', '定期更新和清理', '鼓励团队贡献内容'],
    },
    '团队协作': {
      desc: `${tool.name} 支持团队协作场景，提供实时协作和内容共享功能。`,
      tips: ['建立清晰的协作流程', '利用评论和批注功能', '定期同步团队进度'],
    },
    '写作辅助': {
      desc: `${tool.name} 全面辅助写作过程，从构思到成稿提供各阶段的 AI 支持。`,
      tips: ['明确写作目标和受众', '充分利用 AI 建议优化内容', '保持个人写作风格'],
    },
    '营销文案': {
      desc: `${tool.name} 能够快速生成营销文案，适应不同的营销渠道和目标受众。`,
      tips: ['了解目标受众需求', '突出产品或服务的价值', 'A/B 测试不同文案版本'],
    },
    'SEO 内容': {
      desc: `${tool.name} 帮助优化内容的搜索引擎排名，提供关键词研究和内容结构建议。`,
      tips: ['关注关键词的自然融入', '保持内容质量和价值', '跟踪 SEO 效果持续优化'],
    },
    '品牌内容': {
      desc: `${tool.name} 确保品牌内容的一致性和高质量，建立强大的品牌形象。`,
      tips: ['制定品牌内容指南', '保持一致的语气和风格', '定期评估内容效果'],
    },
    '文章写作': {
      desc: `${tool.name} 辅助各类文章的写作过程，从博客到专业文章提供 AI 支持。`,
      tips: ['明确文章结构和要点', '利用大纲功能规划内容', '结合数据增加说服力'],
    },
    '广告文案': {
      desc: `${tool.name} 生成高转化率的广告文案，优化营销投放效果。`,
      tips: ['突出卖点和差异化', '控制文案长度和格式', '针对平台优化文案风格'],
    },
    '产品描述': {
      desc: `${tool.name} 帮助撰写吸引人的产品描述，提升电商和产品页的转化率。`,
      tips: ['聚焦产品核心价值', '使用有说服力的语言', '结合客户评价优化文案'],
    },
    '社媒内容': {
      desc: `${tool.name} 高效生成社交媒体内容，保持账号活跃和粉丝互动。`,
      tips: ['根据平台调整内容形式', '保持内容新鲜和有趣', '关注互动数据优化策略'],
    },
    '研发': {
      desc: `${tool.name} 在研发场景中提供技术支持和自动化工具，加速开发流程。`,
      tips: ['持续学习和适应新工具', '建立标准化开发流程', '使用自动化减少重复工作'],
    },
    '视频生成': {
      desc: `${tool.name} 能够根据文本描述生成视频内容，大幅降低视频制作门槛。`,
      tips: ['提供清晰的视频脚本', '选择合适的视觉风格', '结合后期制作提升质量'],
    },
    '特效制作': {
      desc: `${tool.name} 在视频特效方面提供 AI 辅助，创建专业级别的视觉效果。`,
      tips: ['明确特效目标和效果', '参考真实物理效果', '优化渲染效率'],
    },
    '广告短片': {
      desc: `${tool.name} 快速生成广告短片原型，缩短创意到成品的周期。`,
      tips: ['明确广告核心信息', '控制短片时长', '突出视觉冲击力'],
    },
    '创意实验': {
      desc: `${tool.name} 支持创意实验和探索，提供多样化的视觉表达方案。`,
      tips: ['大胆尝试不同风格', '记录实验过程和效果', '从实验结果中学习'],
    },
    '企业培训': {
      desc: `${tool.name} 辅助企业培训内容的制作，提升培训效率和效果。`,
      tips: ['设计互动式培训内容', '结合 AI 实现个性化学习', '评估培训效果并优化'],
    },
    '营销视频': {
      desc: `${tool.name} 帮助制作营销视频内容，提升品牌传播效果。`,
      tips: ['关注视频开头吸引力', '保持品牌视觉一致性', '分析视频数据优化策略'],
    },
    '产品说明': {
      desc: `${tool.name} 生成专业的产品说明和演示内容，帮助用户快速理解产品价值。`,
      tips: ['聚焦产品核心功能', '使用简单易懂的表达', '配合视觉效果增强理解'],
    },
    '内部沟通': {
      desc: `${tool.name} 提升内部沟通效率，从会议到文档提供全面的协作支持。`,
      tips: ['选择适合的沟通工具', '保持信息简洁清晰', '建立有效的信息反馈机制'],
    },
    '多语言内容': {
      desc: `${tool.name} 支持多语言内容生成和翻译，帮助拓展全球市场。`,
      tips: ['确保翻译的准确性', '考虑文化背景差异', '本地化而非简单翻译'],
    },
    '有声书制作': {
      desc: `${tool.name} 在语音合成方面表现出色，适合有声书和音频内容的制作。`,
      tips: ['选择合适的叙述风格', '控制语速和情感表达', '注意版权和授权问题'],
    },
    '视频配音': {
      desc: `${tool.name} 为视频内容提供高质量的配音服务，支持多种语言和声音风格。`,
      tips: ['匹配视频内容和语气', '注意口型和节奏同步', '选择适合的声音角色'],
    },
    '语音助手': {
      desc: `${tool.name} 为语音助手提供自然、逼真的语音合成能力。`,
      tips: ['优化对话的自然度', '处理特殊词汇和术语', '保持回应的一致性'],
    },
    '播客创作': {
      desc: `${tool.name} 辅助播客内容的创作和制作，从脚本到音频提供全流程支持。`,
      tips: ['规划节目结构和内容', '注重音频质量的提升', '保持一致的内容风格'],
    },
    '背景音乐': {
      desc: `${tool.name} 生成适合各类场景的背景音乐，提升视频和内容的情感表达。`,
      tips: ['匹配内容和情绪', '注意音乐版权问题', '控制音量和混音效果'],
    },
    '歌曲创作': {
      desc: `${tool.name} 辅助歌曲创作过程，从旋律到歌词提供创意灵感。`,
      tips: ['明确歌曲风格和主题', '结合人工创作提升品质', '探索不同的音乐元素'],
    },
    '内容配乐': {
      desc: `${tool.name} 为视频和内容作品配乐，提升整体视听体验。`,
      tips: ['与内容情绪相匹配', '注意配乐的节奏和时机', '保持音乐的专业水准'],
    },
    '日常规划': {
      desc: `${tool.name} 帮助规划日常工作和生活，优化时间分配和任务优先级。`,
      tips: ['设定清晰的目标和优先级', '定期回顾和调整计划', '保持灵活应对变化'],
    },
    '任务管理': {
      desc: `${tool.name} 提供高效的任务管理功能，帮助跟踪进度和管理项目。`,
      tips: ['分解任务为可执行项', '设置合理的截止日期', '定期检查和更新状态'],
    },
    '任务分配': {
      desc: `${tool.name} 支持团队任务分配，优化资源配置和工作分工。`,
      tips: ['根据能力分配任务', '明确任务目标和期望', '保持沟通渠道畅通'],
    },
    '思维导图': {
      desc: `${tool.name} 帮助创建思维导图，可视化思路和知识结构。`,
      tips: ['从核心主题开始发散', '使用简洁的关键词', '定期整理和更新'],
    },
    '工作流自动化': {
      desc: `${tool.name} 自动化和优化工作流程，减少重复操作提升效率。`,
      tips: ['识别可自动化的环节', '从小范围开始测试', '持续监控和优化流程'],
    },
    '模型部署': {
      desc: `${tool.name} 帮助部署和管理 AI 模型，提供弹性的计算资源和 API 服务。`,
      tips: ['选择合适的部署方式', '监控性能和资源使用', '建立自动扩缩容机制'],
    },
    'API 调用': {
      desc: `${tool.name} 提供完善的 API 接口，支持各类 AI 功能的集成和调用。`,
      tips: ['熟悉 API 文档和规范', '实现错误处理和重试', '优化请求频率和缓存策略'],
    },
    '模型微调': {
      desc: `${tool.name} 支持模型微调，让 AI 更好地适应特定领域和任务。`,
      tips: ['准备高质量的训练数据', '控制微调参数的设置', '评估微调模型的性能'],
    },
    'AI 研究': {
      desc: `${tool.name} 为 AI 研究提供工具和资源，加速实验和探索过程。`,
      tips: ['跟踪最新研究成果', '复现和验证论文结果', '积极参与社区交流'],
    },
    '项目展示': {
      desc: `${tool.name} 帮助展示 AI 项目和成果，提供部署和演示解决方案。`,
      tips: ['设计直观的用户界面', '准备项目的背景说明', '收集用户反馈持续改进'],
    },
    '会议转录': {
      desc: `${tool.name} 自动将会议内容转录为文字，生成可搜索的会议记录。`,
      tips: ['确保录音质量和清晰度', '核实重要信息的准确性', '整合转录和笔记功能'],
    },
    '会议笔记': {
      desc: `${tool.name} 自动生成结构化的会议笔记，提取关键要点和行动项。`,
      tips: ['确保完整记录会议内容', '重点标记决策和任务', '及时分发和跟踪执行'],
    },
    '面试记录': {
      desc: `${tool.name} 帮助记录和整理面试内容，辅助招聘评估过程。`,
      tips: ['确保面试内容完整录制', '关注关键能力和表现', '保护候选人隐私信息'],
    },
    '团队沟通': {
      desc: `${tool.name} 提升团队沟通效率，优化信息流转和协作体验。`,
      tips: ['选择合适的沟通工具', '保持信息的结构化', '建立高效的反馈机制'],
    },
    '销售分析': {
      desc: `${tool.name} 自动化销售数据的分析，提供客户洞察和销售趋势预测。`,
      tips: ['整合多源销售数据', '关注关键业绩指标', '利用洞察驱动决策'],
    },
    'CRM 同步': {
      desc: `${tool.name} 实现客户关系的智能管理，自动同步和更新客户数据。`,
      tips: ['保持数据的准确一致', '利用自动化减少人工录入', '关注客户互动历史'],
    },
    '个人笔记': {
      desc: `${tool.name} 管理个人笔记和知识，实现信息的自动组织和智能检索。`,
      tips: ['养成随时记录的习惯', '定期回顾和整理笔记', '利用链接建立知识关联'],
    },
    '研究整理': {
      desc: `${tool.name} 辅助研究过程的资料整理和信息组织。`,
      tips: ['建立研究资料库', '使用标签和分类管理', '定期梳理研究进展'],
    },
    '内容策划': {
      desc: `${tool.name} 提供内容策划和规划支持，帮助制定有效的内容策略。`,
      tips: ['分析目标受众偏好', '规划内容发布日历', '跟踪内容表现数据'],
    },
    '团队知识': {
      desc: `${tool.name} 构建和管理团队知识库，促进知识的积累和共享。`,
      tips: ['激励团队成员贡献', '保持知识库的更新', '建立便捷的检索机制'],
    },
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">STYK Ai</Link>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">← 返回详情</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-cyan-400 transition-colors">首页</Link>
          <span>/</span>
          <Link href={`/tools/${tool.id}`} className="hover:text-cyan-400 transition-colors">{tool.name}</Link>
          <span>/</span>
          <span className="text-gray-300">最佳使用场景</span>
        </div>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {tool.name} 最适合什么？
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            {tool.name} 是一款{cat ? cat.name : 'AI'}工具，评分 {tool.score}/10。
            {tool.useCases.length > 0
              ? `以下是我们分析的 ${tool.useCases.length} 个最佳使用场景，每个场景都说明了为什么 ${tool.name} 是最适合的选择。`
              : '以下分析帮助你了解这款工具的最佳使用方式。'}
          </p>
        </div>

        {/* Use Cases */}
        {tool.useCases.length > 0 ? (
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>🎯</span> 最佳使用场景
            </h2>
            {tool.useCases.map((uc, i) => {
              const scene = sceneDetails[uc] || {
                desc: `${tool.name} 在 "${uc}" 场景中表现出色，帮助用户高效完成相关任务。`,
                tips: ['开始使用前明确具体目标', '充分利用核心功能', '结合实际场景优化使用方式'],
              };
              return (
                <div key={i} className="card-base p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">
                      {['🎨', '💻', '📝', '📊', '🎯', '📚', '🎬', '🎵', '🛠️', '🔬', '📈', '✍️', '🎮', '🏢', '🏫'][i % 15]}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-200">{uc}</h3>
                      <p className="text-xs text-gray-500">场景 {i + 1}</p>
                    </div>
                    <span className="ml-auto text-xs px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-full">
                      推荐
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4">{scene.desc}</p>
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">使用建议</h4>
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
            <p className="text-gray-500">暂无详细场景分析</p>
          </div>
        )}

        {/* CTA */}
        <div className="card-base p-8 gradient-border mb-12 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">
            准备好使用 {tool.name} 了吗？
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            无论你选择哪个场景，{tool.name} 都能帮你提升效率。
            现在就访问官网开始使用吧。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              {...officialLink}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              🚀 访问 {tool.name} 官网
            </a>
            <Link
              href={`/tools/${tool.id}/review`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl transition border border-gray-700"
            >
              📝 查看详细评测
            </Link>
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">📂 相关工具推荐</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(r => (
                <ToolCard key={r.id} tool={r} />
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section className="border-t border-gray-800 pt-8">
          <h2 className="text-lg font-bold mb-4">🔗 相关页面</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${tool.id}`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📋 {tool.name} 详情
            </Link>
            <Link href={`/tools/${tool.id}/review`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              📝 {tool.name} 评测
            </Link>
            <Link href={`/tools/${tool.id}/alternatives`} className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🔄 {tool.name} 替代品
            </Link>
            <Link href="/" className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-sm text-gray-300 rounded-lg transition-colors">
              🏠 浏览全部
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

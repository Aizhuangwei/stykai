/**
 * Affiliate link configuration for STYK Ai
 * Maps tool IDs to their official affiliate/referral programs
 * Format: { toolId: { url: string, label: string, program: string } }
 */

export interface AffiliateConfig {
  url: string;        // Base URL with referral parameter
  label: string;      // Display label
  program: string;    // Affiliate program name
}

export const affiliateLinks: Record<string, AffiliateConfig> = {
  'chatgpt': {
    url: 'https://chat.openai.com/',
    label: 'Try ChatGPT Free',
    program: 'OpenAI Direct',
  },
  'jasper': {
    url: 'https://www.jasper.ai/?ref=stykai',
    label: 'Try Jasper Free',
    program: 'Jasper Affiliate',
  },
  'copy-ai': {
    url: 'https://www.copy.ai/?ref=stykai',
    label: 'Start Copy.ai Free',
    program: 'Copy.ai Affiliate',
  },
  'midjourney': {
    url: 'https://www.midjourney.com/',
    label: 'Try Midjourney',
    program: 'Midjourney Direct',
  },
  'perplexity': {
    url: 'https://perplexity.ai/',
    label: 'Try Perplexity Pro',
    program: 'Perplexity Direct',
  },
  'leonardo': {
    url: 'https://leonardo.ai/',
    label: 'Try Leonardo Free',
    program: 'Leonardo Direct',
  },
  'veed-io': {
    url: 'https://www.veed.io/',
    label: 'Try VEED.io Free',
    program: 'VEED.io Direct',
  },
  'grammarly-ai': {
    url: 'https://www.grammarly.com/',
    label: 'Try Grammarly Free',
    program: 'Grammarly Direct',
  },
  'writesonic': {
    url: 'https://writesonic.com/?ref=stykai',
    label: 'Try Writesonic Free',
    program: 'Writesonic Affiliate',
  },
  'runway': {
    url: 'https://runwayml.com/',
    label: 'Try Runway',
    program: 'Runway Direct',
  },
  'synthesia': {
    url: 'https://www.synthesia.io/?via=stykai',
    label: 'Try Synthesia Free',
    program: 'Synthesia Affiliate',
  },
  'elevenlabs': {
    url: 'https://elevenlabs.io/',
    label: 'Try ElevenLabs Free',
    program: 'ElevenLabs Direct',
  },
  'suno': {
    url: 'https://suno.com/',
    label: 'Try Suno',
    program: 'Suno Direct',
  },
};

/**
 * Get affiliate URL for a tool. Falls back to official URL if not configured.
 */
export function getAffiliateUrl(toolId: string, officialUrl?: string): AffiliateConfig {
  return affiliateLinks[toolId] || {
    url: officialUrl || `https://www.stykai.com/tools/${toolId}`,
    label: 'Visit Official Website',
    program: 'Direct',
  };
}

/**
 * Get the best affiliate label for a pricing model
 */
export function getAffiliateLabel(toolId: string, pricing: string): string {
  const config = getAffiliateUrl(toolId);
  if (pricing === 'free') return 'Get Started Free';
  if (pricing === 'freemium') return 'Try For Free';
  return config.label || 'Get Started';
}

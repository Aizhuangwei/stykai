'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

/**
 * Google AdSense component for STYK Ai
 * Uses display: none when not available (ad blocker, no fill)
 * Positions: top banner (970x90), content mid (728x90), native in-list (300x250)
 * 
 * IMPORTANT: Replace data-ad-client with your actual AdSense publisher ID
 * before going live. Current ID is a placeholder.
 */
export default function AdSense({ slot, format = 'auto', style }: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized (prevents duplicate ads)
    if (initialized.current) return;
    initialized.current = true;

    try {
      // Push ad to AdSense queue
      const win = window as unknown as { adsbygoogle?: unknown[] };
      if (!win.adsbygoogle) win.adsbygoogle = [];
      win.adsbygoogle.push({});
    } catch (e) {
      console.warn('AdSense push error:', e);
    }
  }, []);

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    minHeight: format === 'auto' ? '90px' : '250px',
    textAlign: 'center',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div ref={adRef} className="adsense-container" style={defaultStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...(format !== 'auto' ? { width: '100%' } : {}) }}
        data-ad-client="ca-pub-4672255414360433"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Pre-defined ad slots for consistent placement
 */
export const AD_SLOTS = {
  TOP_BANNER: '1234567890',     // Top banner 728x90
  CONTENT_MID: '1234567891',    // Content middle 728x90
  SIDEBAR: '1234567892',        // Sidebar 300x250
  LIST_NATIVE: '1234567893',    // In-list native 300x250
  BOTTOM: '1234567894',         // Bottom banner 728x90
};

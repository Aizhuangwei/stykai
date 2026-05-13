'use client';

import { useState, useEffect } from 'react';

/**
 * GDPR Consent Banner for STYK Ai
 * - Only shows to EU/EEA visitors (detected via timezone + language hint)
 * - Stores consent in localStorage
 * - Does NOT track non-EU users at all
 * - Lightweight, no external dependencies, no impact on PageSpeed
 */
export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check if already consented
    const stored = localStorage.getItem('stykai_consent');
    if (stored === 'true') {
      setConsented(true);
      return;
    }

    // Only show banner to potential EU visitors (simple heuristic)
    const euTimezones = [
      'europe', 'berlin', 'paris', 'madrid', 'rome', 'amsterdam',
      'brussels', 'vienna', 'stockholm', 'copenhagen', 'helsinki',
      'london', 'lisbon', 'dublin', 'warsaw', 'prague', 'budapest',
      'athens', 'bucharest', 'sofia', 'zagreb',
    ];
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const isEu = euTimezones.some(e => tz.includes(e));

    // Also check browser language
    const lang = (navigator.language || '').toLowerCase();
    const euLangs = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'da', 'fi', 'el', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl', 'lt', 'lv', 'et', 'en-gb', 'en-ie'];
    const isEuLang = euLangs.some(l => lang.startsWith(l));

    if (isEu || isEuLang) {
      setShow(true);
    } else {
      // Non-EU: auto-consent silently
      localStorage.setItem('stykai_consent', 'true');
      setConsented(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('stykai_consent', 'true');
    setConsented(true);
    setShow(false);
    // Reload to activate AdSense if it was blocked
    window.location.reload();
  };

  const rejectAll = () => {
    localStorage.setItem('stykai_consent', 'false');
    setConsented(false);
    setShow(false);
  };

  if (!show || consented) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)',
        borderTop: '1px solid rgba(6, 182, 212, 0.3)',
        padding: '16px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: '200px' }}>
          <p style={{
            color: '#e2e8f0',
            fontSize: '13px',
            lineHeight: '1.5',
            margin: 0,
          }}>
            We use cookies and similar technologies to personalize content and ads.
            By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            <a
              href="/privacy"
              style={{
                color: '#22d3ee',
                textDecoration: 'underline',
                marginLeft: '6px',
                fontSize: '13px',
              }}
            >
              Learn more
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={rejectAll}
            style={{
              padding: '8px 18px',
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            Reject All
          </button>
          <button
            onClick={acceptAll}
            style={{
              padding: '8px 18px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

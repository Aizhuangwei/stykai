import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0d1b2a 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #06b6d4, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            STYK Ai
          </div>
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          Discover the Best AI Tools for 2026
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Writing', 'Image', 'Coding', 'Video', 'Audio', 'Marketing'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#22d3ee',
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

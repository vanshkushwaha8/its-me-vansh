/** Shared JSX for build-time Open Graph images (rendered by next/og, so inline styles only). */
export const ogSize = { width: 1200, height: 630 }

export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0a0a0b',
        color: '#f2efe9',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: '#9d988f' }}>
        <div style={{ width: 14, height: 14, background: '#ff4d1c' }} />
        {eyebrow}
      </div>
      <div style={{ display: 'flex', fontSize: title.length > 18 ? 92 : 128, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4, textTransform: 'uppercase', maxWidth: 1000 }}>
        {title}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#9d988f', borderTop: '1px solid #2a2a2e', paddingTop: 24 }}>
        <span>{footer}</span>
        <span style={{ color: '#f2efe9' }}>Vansh Kushwaha</span>
      </div>
    </div>
  )
}

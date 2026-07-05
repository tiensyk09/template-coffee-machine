'use client';
import React from 'react';
import Link from 'next/link';
import { Editable, EditableImg, useLive } from '@/components/LiveEditor';

const BROWN = '#6f4e37';
const BROWN_DARK = '#3b2a20';
const ESPRESSO = '#2b1d12';
const BTN = '#4a3325';
const GOLD = '#b98a4f';
const TEXT = '#5a4f43';

const feats = [
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>), title: 'Sản phẩm', sub: 'chính hãng' },
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/></svg>), title: 'Bảo hành', sub: '12 - 24 tháng' },
  { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>), title: 'Đổi trả 7 ngày', sub: 'miễn phí' },
];

export default function HeroBanner() {
  const { editing } = useLive();
  const noNav = (e) => { if (editing) e.preventDefault(); };
  return (
    <section style={{ position: 'relative', background: 'linear-gradient(105deg, #f7efe3 0%, #f0e5d2 50%, #e8d9c2 100%)', overflow: 'hidden', minHeight: 420 }}>
      {/* Watercolor blob decorations */}
      <div style={{ position: 'absolute', top: -80, left: -60, width: 340, height: 340, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'radial-gradient(ellipse, rgba(185,138,79,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -50, left: 60, width: 220, height: 220, borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', background: 'radial-gradient(ellipse, rgba(111,78,55,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Full bleed layout: left text + right image */}
      <div className="cf-hero-wrap" style={{ display: 'flex', alignItems: 'stretch', minHeight: 420, position: 'relative' }}>

        {/* LEFT: Text content constrained */}
        <div className="cf-hero-text" style={{ flex: '0 1 50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 520, width: '100%', padding: '52px 36px 52px 24px' }}>
            <Editable k="hero_label" def="KHƠI NGUỒN CẢM HỨNG" as="div" style={{ fontSize: 11.5, fontWeight: 800, color: GOLD, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 14 }} />
            <h1 className="cf-hero-title" style={{ fontSize: 50, fontWeight: 900, color: ESPRESSO, lineHeight: 1.06, letterSpacing: '-0.5px', marginBottom: 18, textTransform: 'uppercase' }}>
              <Editable k="hero_title1" def="TỪ TÁCH CÀ PHÊ" as="span" /><br /><Editable k="hero_title2" def="HOÀN HẢO" as="span" style={{ color: BROWN }} />
            </h1>
            <p style={{ fontSize: 14.5, color: TEXT, fontWeight: 500, lineHeight: 1.8, marginBottom: 30, maxWidth: 420 }}>
              <Editable k="hero_desc" def="Cung cấp máy pha cà phê chuyên nghiệp cho quán, văn phòng và gia đình. Chất lượng – Bền bỉ – Dễ sử dụng." as="span" multiline />
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 34, alignItems: 'center' }}>
              <Link href="/products" onClick={noNav}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, backgroundColor: BTN, color: '#fff', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em', padding: '13px 26px', borderRadius: 7, textDecoration: 'none', boxShadow: '0 8px 22px rgba(59,42,32,0.30)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = ESPRESSO; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = BTN; }}>
                <Editable k="hero_btn1" def="KHÁM PHÁ SẢN PHẨM" as="span" />
              </Link>
              <a href="#" onClick={noNav}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, backgroundColor: 'transparent', color: BROWN_DARK, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em', padding: '12px 22px', borderRadius: 7, textDecoration: 'none', border: `1.5px solid ${BROWN}`, transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(111,78,55,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                <span style={{ width: 24, height: 24, borderRadius: 999, backgroundColor: BROWN, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                <Editable k="hero_btn2" def="XEM VIDEO" as="span" />
              </a>
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {feats.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 999, border: `1.5px solid #d8c6ac`, color: BROWN, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: 'rgba(255,255,255,0.55)' }}>{f.icon}</span>
                  <div style={{ lineHeight: 1.3 }}>
                    <Editable k={`hero_feat${i}_title`} def={f.title} as="div" style={{ fontSize: 12, fontWeight: 800, color: ESPRESSO }} />
                    <Editable k={`hero_feat${i}_sub`} def={f.sub} as="div" style={{ fontSize: 10.5, fontWeight: 500, color: '#9c8f7f' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Image fills from center to right edge, full height */}
        <div className="cf-hero-img" style={{ flex: '0 1 50%', position: 'relative', overflow: 'hidden', minHeight: 420 }}>
          <EditableImg fill k="hero_img" def="/images/redesign/hero_espresso.png"
            alt="Máy pha cà phê chuyên nghiệp La Marzocco"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85';
            }}
          />
          {/* Seamless left-edge fade blending into hero background */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to right, #f0e5d2 0%, rgba(240,229,210,0.7) 12%, rgba(240,229,210,0.2) 30%, transparent 55%)'
          }} />
        </div>

      </div>

      <style>{`
        .cf-hero-wrap { min-height: 420px; }
        @media (max-width: 900px) {
          .cf-hero-wrap { flex-direction: column !important; }
          .cf-hero-text { flex: none !important; justify-content: flex-start !important; }
          .cf-hero-text > div { padding: 36px 20px 20px !important; text-align: center; }
          .cf-hero-title { font-size: 34px !important; }
          .cf-hero-img { flex: none !important; width: 100% !important; height: 260px !important; min-height: 260px !important; }
        }
      `}</style>
    </section>
  );
}

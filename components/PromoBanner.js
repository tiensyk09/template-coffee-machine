'use client';
import React from 'react';
import Link from 'next/link';
import { Editable, useLive } from '@/components/LiveEditor';

const BROWN = '#6f4e37';
const BROWN_DARK = '#3b2a20';
const ESPRESSO = '#2b1d12';
const GOLD = '#c8a97e';

const features = [
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V4a1 1 0 0 1 1-1h8a2 2 0 0 1 1.4.6l6.2 6.2a2 2 0 0 1 0 2.6Z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>), title: 'Tư vấn chuyên nghiệp', desc: 'Đội ngũ giàu kinh nghiệm sẵn sàng hỗ trợ bạn' },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h13v13H1zM14 8h5l3 3v5h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>), title: 'Giao hàng toàn quốc', desc: 'Giao hàng nhanh chóng, đóng gói cẩn thận' },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>), title: 'Thanh toán an toàn', desc: 'Hỗ trợ nhiều hình thức thanh toán' },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>), title: 'Đổi trả dễ dàng', desc: 'Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất' },
];

const banners = [
  { title: 'COMBO PHA CHẾ\nTIẾT KIỆM HƠN\nLÊN ĐẾN 15%', cta: 'MUA NGAY', type: 'button', image: '/images/redesign/promo_pour_over.png' },
  { title: 'MÁY PHA CÀ PHÊ\nCHO QUÁN\nCHUYÊN NGHIỆP', cta: 'Xem ngay', type: 'link', image: '/images/redesign/promo_commercial.png' },
  { title: 'VỆ SINH ĐỊNH KỲ\nBẢO VỆ MÁY\nKÉO DÀI TUỔI THỌ', cta: 'Xem ngay', type: 'link', image: '/images/redesign/promo_cleaning.png' },
];

export default function PromoBanner() {
  const { get, setField, editing } = useLive();
  const noNav = (e) => { if (editing) e.preventDefault(); };
  return (
    <>
      {/* FEATURE STRIP */}
      <section style={{ backgroundColor: BROWN_DARK }}>
        <div className="container mx-auto px-4">
          <div className="cf-feat-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '26px 22px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <span style={{ width: 46, height: 46, borderRadius: 999, backgroundColor: 'rgba(200,169,126,0.16)', color: GOLD, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <Editable k={`feat${i}_title`} def={f.title} as="div" style={{ fontSize: 13, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }} />
                  <Editable k={`feat${i}_desc`} def={f.desc} as="div" style={{ fontSize: 11.5, color: '#c9bba9', fontWeight: 500, lineHeight: 1.5 }} multiline />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 PROMO BANNERS */}
      <section style={{ backgroundColor: '#fff', padding: '48px 0' }}>
        <div className="container mx-auto px-4">
          <div className="cf-promo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {banners.map((b, i) => {
              const img = get(`promo${i}_img`, b.image);
              return (
                <div key={i} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', minHeight: 190, display: 'flex', alignItems: 'center', padding: '26px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(250,247,242,0.96) 0%, rgba(250,247,242,0.85) 55%, rgba(250,247,242,0.3) 100%)' }} />
                  {editing && (
                    <button onClick={() => { const v = prompt('URL ảnh nền banner:', img || ''); if (v != null) setField(`promo${i}_img`, v.trim()); }}
                      style={{ position: 'absolute', top: 8, right: 8, zIndex: 5, background: 'rgba(0,0,0,0.72)', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 8px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>🖼 Ảnh nền</button>
                  )}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <Editable k={`promo${i}_title`} def={b.title} as="h3" multiline style={{ fontSize: 18, fontWeight: 900, color: ESPRESSO, textTransform: 'uppercase', lineHeight: 1.25, letterSpacing: '0.01em', marginBottom: 16 }} />
                    {b.type === 'button' ? (
                      <Link href="/products" onClick={noNav} style={{ display: 'inline-block', backgroundColor: '#4a3325', color: '#fff', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '11px 22px', borderRadius: 6, textDecoration: 'none' }}>
                        <Editable k={`promo${i}_cta`} def={b.cta} as="span" />
                      </Link>
                    ) : (
                      <Link href="/products" onClick={noNav} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: ESPRESSO, fontWeight: 800, fontSize: 12, textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#6f4e37'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = ESPRESSO; }}>
                        <Editable k={`promo${i}_cta`} def={b.cta} as="span" /> →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .cf-feat-strip { grid-template-columns: repeat(2, 1fr) !important; } .cf-feat-strip > div { border-right: none !important; } .cf-promo-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .cf-feat-strip { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

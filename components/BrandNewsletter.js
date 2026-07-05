'use client';
import React, { useState } from 'react';
import { SectionHead } from '@/components/CategoryGrid';
import { Editable } from '@/components/LiveEditor';

const BROWN = '#6f4e37';
const BROWN_DARK = '#3b2a20';
const ESPRESSO = '#2b1d12';
const GOLD = '#c8a97e';

const LogoLaMarzocco = () => (
  <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.08em', color: '#111', fontFamily: 'Georgia, serif' }}>LA MARZOCCO</span>
);

const LogoBreville = () => (
  <span style={{ fontSize: 19, fontWeight: 'bold', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#222' }}>Breville</span>
);

const LogoRancilio = () => (
  <div style={{ backgroundColor: '#0f6b47', padding: '5px 12px', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#fff' }}>RANCILIO</span>
    <span style={{ fontSize: 4.5, letterSpacing: '0.02em', color: '#a2d9c0', marginTop: 1, fontWeight: 600 }}>coffeeing the World</span>
  </div>
);

const LogoEureka = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <span style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: '#c0392b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 7, fontWeight: 900 }}>E</span>
    <span style={{ fontSize: 13, fontWeight: 900, color: '#c0392b', letterSpacing: '0.04em' }}>EUREKA</span>
  </div>
);

const LogoLelit = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
    <span style={{ color: '#e74c3c', fontSize: 16, fontWeight: 900, letterSpacing: '-0.5px' }}>LELIT</span>
    <span style={{ color: '#e74c3c', fontSize: 10 }}>🔴</span>
  </div>
);

const LogoHario = () => (
  <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.12em', color: '#7b1fa2' }}>HARIO</span>
);

const brands = [
  { name: 'La Marzocco', component: <LogoLaMarzocco /> },
  { name: 'Breville', component: <LogoBreville /> },
  { name: 'Rancilio', component: <LogoRancilio /> },
  { name: 'Eureka', component: <LogoEureka /> },
  { name: 'Lelit', component: <LogoLelit /> },
  { name: 'Hario', component: <LogoHario /> },
];

export default function BrandNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Đăng ký nhận tin', email, message: 'Đăng ký nhận tin từ Coffee Machine' }) });
    } catch {}
    setStatus('done'); setEmail('');
  };

  return (
    <>
      {/* BRANDS */}
      <section style={{ backgroundColor: '#fff', padding: '40px 0' }}>
        <div className="container mx-auto px-4">
          <SectionHead icon="🏷️" title="Thương hiệu nổi bật" href="/destinations" k="sec_brands" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 38, height: 38, borderRadius: 999, backgroundColor: '#fff', border: '1px solid #ece4d7', color: BROWN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, cursor: 'pointer' }} className="cf-brand-arrow">‹</span>
            <div className="cf-brand-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {brands.map((b, i) => (
                <div key={i} style={{ height: 76, borderRadius: 12, border: '1px solid #efe6d7', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 10px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#efe6d7'; }}>
                  {b.component}
                </div>
              ))}
            </div>
            <span style={{ width: 38, height: 38, borderRadius: 999, backgroundColor: '#fff', border: '1px solid #ece4d7', color: BROWN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, cursor: 'pointer' }} className="cf-brand-arrow">›</span>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: '0 0 48px' }}>
        <div className="container mx-auto px-4">
          <div className="cf-news" style={{ backgroundColor: '#23170e', borderRadius: 16, padding: '24px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: '1 1 50%', minWidth: 320 }}>
              <div style={{ width: 82, height: 82, borderRadius: 999, overflow: 'hidden', flexShrink: 0, border: '2.5px solid #b98a4f', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=300&q=80" alt="Latte art coffee cup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ maxWidth: 440 }}>
                <Editable k="news_title" def="Đăng ký nhận tin" as="h3" style={{ fontSize: 20, fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.02em' }} />
                <Editable k="news_desc" def="Nhận thông tin sản phẩm mới, ưu đãi đặc biệt và kiến thức pha chế hữu ích." as="p" multiline style={{ fontSize: 13, color: '#d6c9b7', fontWeight: 500, lineHeight: 1.5 }} />
              </div>
            </div>
            <form onSubmit={subscribe} style={{ display: 'flex', gap: 10, flex: '1 1 40%', minWidth: 280, maxWidth: 500 }}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email của bạn"
                style={{ flex: 1, padding: '13px 18px', borderRadius: 8, border: '1px solid #4a3424', fontSize: 13, outline: 'none', backgroundColor: '#180f09', color: '#fff' }} />
              <button type="submit" disabled={status === 'sending'}
                style={{ backgroundColor: '#b98a4f', color: '#fff', fontWeight: 800, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '13px 26px', border: 'none', borderRadius: 8, cursor: 'pointer', flexShrink: 0 }}>
                {status === 'done' ? '✓ Đã đăng ký' : 'Đăng ký'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .cf-brand-grid { grid-template-columns: repeat(3, 1fr) !important; } .cf-brand-arrow { display: none !important; } }
        @media (max-width: 600px) { .cf-brand-grid { grid-template-columns: repeat(2, 1fr) !important; } .cf-news { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </>
  );
}

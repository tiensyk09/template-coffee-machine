'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Editable } from '@/components/LiveEditor';

const BROWN = '#6f4e37';
const ESPRESSO = '#2b1d12';

function SectionHead({ icon, title, href = '/products', k }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 900, color: ESPRESSO, textTransform: 'uppercase', letterSpacing: '0.01em' }}>
        <span style={{ color: BROWN }}>{icon}</span>{k ? <Editable k={k} def={title} as="span" /> : title}
      </h2>
      <Link href={href} style={{ fontSize: 12.5, fontWeight: 700, color: BROWN, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        Xem tất cả
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 H20 M14 6 L20 12 L14 18" /></svg>
      </Link>
    </div>
  );
}
export { SectionHead };

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);

  const fallbackCategories = [
    { name: 'Máy pha cà phê Espresso', image: '/images/redesign/cat_espresso_machine.png', slug: 'may-pha-espresso' },
    { name: 'Máy xay cà phê', image: '/images/redesign/cat_grinder.png', slug: 'may-xay-ca-phe' },
    { name: 'Máy pha cà phê chuyên nghiệp', image: '/images/redesign/cat_pro_espresso.png', slug: 'may-pha-chuyen-nghiep' },
    { name: 'Máy pha cà phê nhỏ giọt', image: '/images/redesign/cat_drip.png', slug: 'may-pha-nho-giot' },
    { name: 'Phụ kiện pha chế', image: '/images/redesign/cat_accessories.png', slug: 'phu-kien-pha-che' },
    { name: 'Vệ sinh & bảo dưỡng', image: '/images/redesign/cat_cleaning.png', slug: 've-sinh-bao-duong' },
    { name: 'Cốc & dụng cụ pha chế', image: '/images/redesign/cat_cups.png', slug: 'coc-dung-cu' },
  ];

  // Local images indexed by position (always override API images for clean look)
  const designImages = [
    '/images/redesign/cat_espresso_machine.png',
    '/images/redesign/cat_grinder.png',
    '/images/redesign/cat_pro_espresso.png',
    '/images/redesign/cat_drip.png',
    '/images/redesign/cat_accessories.png',
    '/images/redesign/cat_cleaning.png',
    '/images/redesign/cat_cups.png',
  ];

  useEffect(() => {
    fetch('/api/shop-categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories && data.categories.length > 0) {
          const active = data.categories.filter(c => c.is_active !== 0);
          // Always use our design images by index - never use API lifestyle photos
          setCategories(active.map((c, i) => ({
            ...c,
            image: designImages[i] || designImages[0],
          })));
        }
        else setCategories(fallbackCategories);
      })
      .catch(() => setCategories(fallbackCategories));
  }, []);

  return (
    <section style={{ backgroundColor: '#fff', padding: '48px 0' }}>
      <div className="container mx-auto px-4">
        <SectionHead icon="▦" title="Danh mục sản phẩm" href="/products" k="sec_categories" />
        <div className="cf-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 16 }}>
          {categories.map((cat, idx) => (
            <Link key={idx} href={`/products?cat=${cat.slug}`} className="cf-cat-item"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', textDecoration: 'none', padding: '20px 8px', borderRadius: 12, border: '1px solid #f0e9de', backgroundColor: '#fff', transition: 'all 0.25s' }}>
              <div style={{ width: 84, height: 84, overflow: 'hidden', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.target.src = '/images/redesign/cat_espresso_machine.png'; }} />
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: '#4a3f35', lineHeight: 1.4 }}>{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .cf-cat-item:hover { box-shadow: 0 12px 26px rgba(59,42,32,0.1); transform: translateY(-4px); border-color: #e3d5c0; }
        @media (max-width: 1024px) { .cf-cat-grid { grid-template-columns: repeat(4, minmax(0,1fr)) !important; } }
        @media (max-width: 600px) { .cf-cat-grid { grid-template-columns: repeat(3, minmax(0,1fr)) !important; } }
      `}</style>
    </section>
  );
}

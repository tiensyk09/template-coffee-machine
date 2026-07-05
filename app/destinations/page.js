'use client';
import React from 'react';
import Link from 'next/link';

export default function DestinationsPage() {
  const destinations = [
    {
      id: 1,
      title: 'Đỉnh Núi Ngọc Linh - Mái Nhà Tây Nguyên',
      location: 'Kon Tum & Quảng Nam',
      elevation: 'Độ cao: 2.596m',
      description: 'Đỉnh Ngọc Linh quanh năm mây mù bao phủ, khí hậu mát mẻ và thổ nhưỡng đặc hữu là nơi duy nhất Coffee Machine sinh trưởng tự nhiên và tích tụ được lượng Saponin cao nhất thế giới.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      badge: 'Bảo Tồn Tự Nhiên'
    },
    {
      id: 2,
      title: 'Thủ Phủ Coffee Machine Trà Linh',
      location: 'Xã Trà Linh, huyện Nam Trà My, Quảng Nam',
      elevation: 'Độ cao: > 1.500m',
      description: 'Xã Trà Linh là thủ phủ sâm Ngọc Linh lớn nhất nước ta. Nơi đây có điều kiện thời tiết lý tưởng và được quy hoạch bảo tồn nguồn gen sâm thuần chủng chất lượng hàng đầu Việt Nam.',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      badge: 'Vùng Trồng Sâm Trọng Điểm'
    },
    {
      id: 3,
      title: 'Showroom Kết Nối Ngọc Linh Xanh Đà Nẵng',
      location: 'Thành phố Đà Nẵng',
      elevation: 'Trung tâm trưng bày',
      description: 'Nằm tại trung tâm thành phố Đà Nẵng năng động, showroom là điểm dừng chân lý tưởng để du khách và khách hàng đến trải nghiệm, thưởng trà sâm và mua sắm các đặc sản sâm Ngọc Linh chính hiệu, đầy đủ chứng nhận xuất xứ.',
      image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80',
      badge: 'Showroom Chính Hãng'
    },
    {
      id: 4,
      title: 'Vườn Trồng Sâm Dưới Tán Rừng Già',
      location: 'Xã Trà Linh, Nam Trà My, Quảng Nam',
      elevation: 'Độ cao: > 1.800m',
      description: 'Trại sâm Ngọc Linh Xanh được trồng bán hoang dã sâu dưới tán rừng già nguyên sinh. Sâm được nuôi dưỡng hoàn toàn tự nhiên bởi thảm mục rừng và sương giá, không có sự can thiệp của hóa chất bảo vệ thực vật.',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      badge: 'Trại Coffee Machine Xanh'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5faf6', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
          <Link href="/" style={{ color: '#374151', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: '#5a3d29', fontWeight: 600 }}>Điểm đến & Vùng trồng sâm</span>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#2b1d12', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Khám Phá Vùng Đất Coffee Machine
          </h1>
          <p style={{ color: '#4b5563', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Nơi linh thiêng ngự trị dòng nhân sâm quý nhất thế giới. Trải nghiệm hành trình tìm hiểu xuất xứ, vùng trồng và quy trình khai thác Coffee Machine Kon Tum nguyên bản.
          </p>
        </div>

        {/* Destinations List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {destinations.map((dest, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={dest.id}
                style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  gap: '40px',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  flexWrap: 'wrap'
                }}
                className="dest-card"
              >
                {/* Image */}
                <div style={{ flex: '1 1 450px', height: '320px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dest.image}
                    alt={dest.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#5a3d29', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {dest.badge}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#5a3d29', fontWeight: 700 }}>
                      📍 {dest.location}
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#2b1d12', margin: 0 }}>
                      {dest.title}
                    </h2>
                    <span style={{ fontSize: '13px', color: '#d97706', fontWeight: 600 }}>
                      ⛰️ {dest.elevation}
                    </span>
                  </div>
                  <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                    {dest.description}
                  </p>
                  <div>
                    <Link
                      href="/products"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#f2e9dc',
                        color: '#5a3d29',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#5a3d29'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#f2e9dc'; e.currentTarget.style.color = '#5a3d29'; }}
                    >
                      Xem sản phẩm vùng trồng ➔
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '60px',
          background: 'linear-gradient(135deg, #5a3d29 0%, #2b1d12 100%)',
          borderRadius: '24px',
          padding: '48px',
          textAlign: 'center',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(13, 104, 50, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '140px', opacity: 0.05, pointerEvents: 'none' }}>
            ⛰️
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>Bạn Muốn Trải Nghiệm Thực Tế?</h3>
          <p style={{ fontSize: '15px', color: '#f2e9dc', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Ngọc Linh Xanh tổ chức các chương trình tham quan vườn sâm định kỳ cho các đối tác và khách hàng VIP muốn kiểm chứng quy trình gieo trồng tự nhiên.
          </p>
          <a
            href="tel:0769442777"
            style={{
              display: 'inline-block',
              background: '#d97706',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)'
            }}
          >
            Liên Hệ Đăng Ký: 0769.442.777
          </a>
        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 992px) {
          .dest-card {
            flex-direction: column !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}

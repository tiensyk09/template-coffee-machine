'use client';
import React from 'react';
import Link from 'next/link';

export default function DestinationsPage() {
  const destinations = [
    {
      id: 1,
      title: 'Thủ Phủ Cà Phê Buôn Ma Thuột',
      location: 'Đắk Lắk, Tây Nguyên',
      elevation: 'Độ cao: 500 - 800m',
      description: 'Buôn Ma Thuột được mệnh danh là thủ phủ cà phê của Việt Nam. Đất đỏ bazan màu mỡ cùng khí hậu Tây Nguyên tạo nên những hạt Robusta đậm đà, hậu vị mạnh mẽ và hàm lượng caffeine cao bậc nhất thế giới.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      badge: 'Vùng Cà Phê Trọng Điểm'
    },
    {
      id: 2,
      title: 'Cầu Đất - Đà Lạt',
      location: 'Xã Xuân Trường, TP. Đà Lạt, Lâm Đồng',
      elevation: 'Độ cao: > 1.500m',
      description: 'Cầu Đất là vùng trồng Arabica trứ danh của Đà Lạt. Độ cao lý tưởng trên 1.500m cùng biên độ nhiệt ngày đêm lớn giúp hạt cà phê Arabica chín chậm, tích tụ hương vị tinh tế với vị chua thanh và hương trái cây đặc trưng.',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      badge: 'Vùng Arabica Cao Cấp'
    },
    {
      id: 3,
      title: 'Cà Phê Khe Sanh',
      location: 'Huyện Hướng Hóa, Quảng Trị',
      elevation: 'Độ cao: 600 - 700m',
      description: 'Khe Sanh là vùng đất giàu tiềm năng của cà phê Arabica miền Trung. Thổ nhưỡng và khí hậu vùng cao nguyên Hướng Hóa mang đến những mẻ cà phê sạch, hương thơm dịu, được rang xay và kiểm soát chất lượng theo tiêu chuẩn đặc sản.',
      image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80',
      badge: 'Vùng Nguyên Liệu Sạch'
    },
    {
      id: 4,
      title: 'Cà Phê Sơn La Vùng Núi Tây Bắc',
      location: 'Tỉnh Sơn La, Tây Bắc',
      elevation: 'Độ cao: > 1.000m',
      description: 'Sơn La là vựa cà phê Arabica lớn của vùng núi Tây Bắc. Được trồng trên các sườn đồi cao, cây cà phê hấp thụ sương giá và khí hậu ôn hòa, cho ra hạt Arabica hương vị cân bằng, thanh nhẹ, canh tác theo hướng bền vững và tự nhiên.',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      badge: 'Vùng Arabica Tây Bắc'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5faf6', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#6b7280' }}>
          <Link href="/" style={{ color: '#374151', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: '#5a3d29', fontWeight: 600 }}>Điểm đến & Vùng nguyên liệu cà phê</span>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#2b1d12', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Bản Đồ Cà Phê Việt Nam
          </h1>
          <p style={{ color: '#4b5563', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Nơi hội tụ những vùng nguyên liệu cà phê danh tiếng nhất Việt Nam. Trải nghiệm hành trình tìm hiểu xuất xứ, giống cà phê Robusta - Arabica và quy trình canh tác từ những vùng trồng đặc sản.
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
                      Xem cà phê vùng này ➔
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
            Coffee Machine tổ chức các chương trình tham quan nông trại cà phê định kỳ cho các đối tác và khách hàng VIP muốn kiểm chứng quy trình canh tác và rang xay tự nhiên.
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

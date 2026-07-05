import './globals.css';
import { CartProvider } from '@/components/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import PluginRunner from '@/components/PluginRunner';
import TopLoader from '@/components/TopLoader';

export const metadata = {
  title: 'Coffee Machine - Máy pha cà phê chính hãng cho quán, văn phòng & gia đình',
  description: 'Coffee Machine chuyên cung cấp máy pha cà phê Espresso, máy xay, máy pha chuyên nghiệp & phụ kiện pha chế chính hãng. Bảo hành 12-24 tháng, hỗ trợ kỹ thuật 24/7, giao hàng toàn quốc.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <TopLoader color="#6f4e37" />
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <PluginRunner />
        </CartProvider>
      </body>
    </html>
  );
}


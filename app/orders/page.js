import OrdersPageClient from '@/components/OrdersPageClient';

export const metadata = {
  title: 'Tài khoản & Lịch sử đơn hàng | Coffee Machine',
  description: 'Tra cứu thông tin vận chuyển, xem chi tiết lịch sử giao hàng và cập nhật địa chỉ, số điện thoại giao nhận máy pha cà phê Coffee Machine.'
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}

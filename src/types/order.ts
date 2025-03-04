import { DistrictData, ProvinceData, WardData } from './address';
import { Pagination } from './ApiResponse';
import { CartDetail } from './cart';
import { OrderStatus, PaymentGateway, PaymentMethod } from './common';

export interface UpdateStatusOrderBody {
  status: string;
  orderId: string;
}

export interface Order {
  address: {
    province: ProvinceData;
    district: DistrictData;
    ward: WardData;
    street: string;
  };
  buyerEmail: string;
  buyerName: string;
  buyerPhone: string;
  cartDetails: CartDetail[];
  isPaid: boolean;
  note: string;
  payUrl: string;
  paymentMethod: PaymentMethod;
  paymentGateway: PaymentGateway;
  recipientName: string;
  recipientPhone: string;
  shippingFee: number;
  status: OrderStatus;
  totalAmount: number;
  userId: string;
  _id: string;
}

export interface GetOrderResponse extends Pagination {
  orders: Order[];
}

import { DistrictData, ProvinceData, WardData } from './address';

export interface CheckoutFormValues {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  recipientName: string;
  recipientPhone: string;
  province: ProvinceData | null;
  district: DistrictData | null;
  ward: WardData | null;
  street: string;
  method: string;
  paymentMethod: string;
  shippingFee: number;
  note: string;
}

export interface CheckoutBody {
  cartId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  recipientName: string;
  recipientPhone: string;
  shippingFee: number;
  paymentMethod: string;
  paymentGateway: string;
  address: {
    province: ProvinceData;
    district: DistrictData;
    ward: WardData;
    street: string;
  };
  note: string;
}

export interface AddOrderResponse {
  amount: number;
  message: string;
  orderId: string;
  partnerCode: string;
  payUrl: string;
  requestId: string;
  responseTime: number;
  resultCode: number;
  shortLink: string;
}

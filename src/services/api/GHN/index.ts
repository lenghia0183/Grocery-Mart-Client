import { ApiResponse } from '@/types/ApiResponse';
import { ghnApi } from '../axios';

export interface ProvinceData {
  ProvinceID: number;
  ProvinceName: string;
}

export interface DistrictData {
  DistrictID: number;
  DistrictName: string;
}

export interface WardData {
  WardCode: string;
  WardName: string;
}

interface ShipPriceData {
  service_type_id: number;
  to_district_id?: number;
  to_ward_code: string;
  insurance_value: number;
  weight: number;
  items: {
    name: string;
    quantity: number;
    height: number;
    weight: number;
    width: number;
    length: number;
  }[];
}

interface ShipPriceResponseData {
  total: number;
  service_fee: number;
  insurance_fee: number;
  pick_station_fee: number;
  coupon_value: number;
  r2s_fee: number;
  return_again: number;
  document_return: number;
  double_check: number;
  cod_fee: number;
  pick_remote_areas_fee: number;
  deliver_remote_areas_fee: number;
  cod_failed_fee: number;
}

export const getProvinceData = (): Promise<ApiResponse<ProvinceData[]>> => {
  const url = '/master-data/province';
  return ghnApi.get<ProvinceData[]>(url);
};

export const getDistrictData = (provinceId: string | number): Promise<ApiResponse<DistrictData[]>> => {
  const url = '/master-data/district';
  return ghnApi.get<DistrictData[]>(url, {
    params: { province_id: provinceId },
  });
};

export const getWardData = (districtID: string | number): Promise<ApiResponse<WardData[]>> => {
  const url = '/master-data/ward';
  return ghnApi.get<WardData[]>(url, {
    params: { district_id: districtID },
  });
};

export const getShipPrice = (data: ShipPriceData): Promise<ApiResponse<ShipPriceResponseData>> => {
  const url = '/v2/shipping-order/fee';
  return ghnApi.post(url, data);
};

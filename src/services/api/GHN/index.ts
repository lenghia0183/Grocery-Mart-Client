import { ApiResponse } from '@/types/ApiResponse';
import { ghnApi } from '../axios';
import { DistrictData, ProvinceData, WardData } from '@/types/address';
import { ShipPriceData, ShipPriceResponseData } from '@/types/shipping';

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

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

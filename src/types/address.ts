export interface ProvinceData {
  ProvinceID: number;
  ProvinceName: string;
  provinceName: string;
  provinceId: number;
}

export interface DistrictData {
  DistrictID: number;
  DistrictName: string;
  districtName: string;
  districtId: number;
}

export interface WardData {
  WardCode: string;
  WardName: string;
  wardName: string;
  wardCode: number;
}

export interface ChangeAddressFormValues {
  province: ProvinceData | null;
  district: DistrictData | null;
  ward: WardData | null;
  street: string;
}

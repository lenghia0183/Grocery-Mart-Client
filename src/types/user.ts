import { DistrictData, ProvinceData, WardData } from './address';

export interface UserData {
  address?: {
    district: DistrictData;
    province: ProvinceData;
    ward: WardData;
    street: string;
  };
  avatar: string;
  createdAt: string;
  email: string;
  phone?: string;
  _id: string;
  fullname: string;
  displayName?: string;
}

export interface ChangeUserDataFormValues {
  name: string;
  phone: string;
  displayName?: string;
  email: string;
}

export interface ChangeUserDataBody {
  fullname?: string;
  phone?: string;
  address?: {
    district: DistrictData | null;
    province: ProvinceData | null;
    ward: WardData | null;
    street: string;
  };
}

export interface ChangeAddressFormValues {
  province: ProvinceData | null;
  district: DistrictData | null;
  ward: WardData | null;
  street: string;
}

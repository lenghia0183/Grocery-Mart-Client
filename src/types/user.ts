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

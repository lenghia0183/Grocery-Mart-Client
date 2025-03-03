export interface ShipPriceResponseData {
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

export interface ShipPriceData {
  service_type_id: number;
  to_district_id?: number;
  to_ward_code: number;
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

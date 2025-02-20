import { Pagination } from './ApiResponse';

export interface Manufacturer {
  _id: string;
  name: string;
}

export interface GetManufacturerResponse extends Pagination {
  manufacturers: Manufacturer[];
}

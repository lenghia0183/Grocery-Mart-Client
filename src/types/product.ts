import { Pagination } from './ApiResponse';
import { Category } from './category';
import { Manufacturer } from './manufacturer';

export interface Product {
  _id: string;
  name: string;
  price: number;
  manufacturerId: Manufacturer;
  categoryId: Omit<Category, 'image'>;
  description: string;
  inStock: boolean;
  ratings: number;
  image: string;
}
export interface GetProductResponse extends Pagination {
  products: Product[];
}

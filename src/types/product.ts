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

export interface ProductFilterFormValues {
  keyword?: string;
  minRating: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  manufacturers?: string[];
  displayOption?: string;
}

export interface ProductFilter {
  minRating: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  manufacturers?: string[];
  displayOption?: string;
  limit?: number;
}
export interface GetProductResponse extends Pagination {
  products: Product[];
}

export interface GetProductParams {
  minRating?: number;
  categoryId?: string;
  manufacturerId?: string[];
  sortBy: string;
  minPrice?: number;
  maxPrice?: number;
  keyword?: string;
  page?: number;
  limit: number;
}

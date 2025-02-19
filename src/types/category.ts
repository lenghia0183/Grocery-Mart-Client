import { Pagination } from './ApiResponse';

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug?: string;
}

export interface CategoryResponse extends Pagination {
  categories: Category[];
}

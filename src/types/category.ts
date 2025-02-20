import { Pagination } from './ApiResponse';

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug?: string;
}

export interface GetCategoryResponse extends Pagination {
  categories: Category[];
}

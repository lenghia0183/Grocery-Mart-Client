import { Pagination } from './ApiResponse';
import { Product } from './product';

export type AddProductToFavoriteListBody = Record<string, unknown>;

export interface GetFavoriteListResponse extends Pagination {
  favorites: Product[];
}

import { Pagination } from './ApiResponse';
import { Product } from './product';

export interface CartDetails {
  commentStatus: string;

  quantity: number;
  totalMoney: number;
  productId: Product;
}

export interface AddProductToCartBody {
  productId: string;
  quantity: number;
}

export interface AddProductToCartFormValues {
  quantity: number;
  isFavorite: boolean;
}

export interface GetMyCartResponse extends Pagination {
  id: string;
  cartDetails: CartDetails[];
  cartTotalMoney: number;
}

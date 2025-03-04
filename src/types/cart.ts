import { Pagination } from './ApiResponse';
import { CommentStatus } from './common';
import { ProductDetail } from './product';

export interface CartDetail {
  commentStatus: CommentStatus;
  quantity: number;
  totalMoney: number;
  productId: ProductDetail;
  _id: string;
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
  cartDetails: CartDetail[];
  cartTotalMoney: number;
}

export interface UpdateCartDetailBody {
  productId: string;
  quantity: number;
  cartId: string;
  cartDetailId: string;
}

export interface DeleteCartDetailBody {
  cartId: string;
  cartDetailId: string;
}

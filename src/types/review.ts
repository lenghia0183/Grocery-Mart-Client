import { QueryState } from './common';
import { UserData } from './user';

import { Pagination } from './ApiResponse';

export interface Review {
  content: string;
  createdAt: string;
  productId: string;
  rating: number;
  userId: UserData;
}
export interface ReviewFormValues {
  content: string;
  rating: {
    label: string;
    value: number;
  };
}

export interface AddReviewBody {
  cartDetailId: string;
  content: string;
  productId: string;
  rating: number;
}

export interface GetReviewByProductIdParams extends QueryState {
  productId: string;
}

export interface GetReviewByProductIdResponse extends Pagination {
  comments: Review[];
}

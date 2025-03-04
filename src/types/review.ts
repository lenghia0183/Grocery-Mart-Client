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

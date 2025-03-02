export interface AddProductToCartBody {
  productId: string;
  quantity: number;
}

export interface AddProductToCartFormValues {
  quantity: number;
  isFavorite: boolean;
}

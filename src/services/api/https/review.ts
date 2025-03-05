import { AddReviewBody, GetReviewByProductIdParams, GetReviewByProductIdResponse } from '@/types/review';
import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import useSWR from 'swr';

export const useAddReview = () => {
  const url = 'v1/comment';
  const fetcher = async (url: string, { arg }: { arg: AddReviewBody }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useGetReviewByProductId = (filters: GetReviewByProductIdParams) => {
  const { productId, ...restFilters } = filters;
  const url = `v1/comment/${productId}`;

  const fetcher = async (url: string) => {
    const response = await api.get<GetReviewByProductIdResponse>(url, restFilters);

    return response.data;
  };

  return useSWR(url, fetcher);
};

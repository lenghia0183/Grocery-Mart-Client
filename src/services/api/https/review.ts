import { AddReviewBody } from '@/types/review';
import useSWRMutation from 'swr/mutation';
import { api } from '../axios';

export const useAddReview = () => {
  const url = 'v1/comment';
  const fetcher = async (url: string, { arg }: { arg: AddReviewBody }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

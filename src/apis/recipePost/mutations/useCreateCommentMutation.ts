import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { TRecipePostCommentData } from '../queries/useGetCommentQuery';

export type TCreateCommentVariables = {
    recipePostId: number;
    comment: string;
    parentId: number | null;
};

export type TCreateCommentData = TRecipePostCommentData;

export const useCreateCommentMutation = (
    options?: UseMutationOptions<TCreateCommentData, AxiosError<TAxiosError>, TCreateCommentVariables>,
) => {
    return useMutation<TCreateCommentData, AxiosError<TAxiosError>, TCreateCommentVariables>(
        async (data) => {
            const res = await defaultAxios.post('/recipe/comment', data);
            return res.data;
        },
        { ...options },
    );
};

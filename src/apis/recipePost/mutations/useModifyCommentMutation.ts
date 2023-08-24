import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TModifyCommentVariables = {
    commentId: number;
    comment: string;
};

export type TModifyCommentData = {
    commentId: number;
    comment: string;
    updatedAt: Date;
};

export const useModifyCommentMutation = (
    options?: UseMutationOptions<TModifyCommentData, AxiosError<TAxiosError>, TModifyCommentVariables>,
) => {
    return useMutation<TModifyCommentData, AxiosError<TAxiosError>, TModifyCommentVariables>(
        async (data) => {
            const res = await defaultAxios.patch('/recipe/comment', data);
            return res.data;
        },
        { ...options },
    );
};

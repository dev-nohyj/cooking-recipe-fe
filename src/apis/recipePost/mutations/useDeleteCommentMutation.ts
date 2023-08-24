import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TDeleteCommentVariables = {
    commentId: number;
};

export type TDeleteCommentData = {
    commentId: number;
    deletedAt: Date;
};

export const useDeleteCommentMutation = (
    options?: UseMutationOptions<TDeleteCommentData, AxiosError<TAxiosError>, TDeleteCommentVariables>,
) => {
    return useMutation<TDeleteCommentData, AxiosError<TAxiosError>, TDeleteCommentVariables>(
        async (data) => {
            const res = await defaultAxios.delete(`/recipe/comment?commentId=${data.commentId}`);
            return res.data;
        },
        { ...options },
    );
};

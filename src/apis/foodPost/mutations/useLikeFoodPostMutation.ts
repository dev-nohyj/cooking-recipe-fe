import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';

export type TLikeFoodPostVariables = {
    foodPostId: number;
    likeType: LikeTypeLabel;
};

export type TLikeFoodPostData = {
    foodPostId: number;
    likeType: LikeTypeLabel;
};

export const useLikeFoodPostMutation = (
    options?: UseMutationOptions<TLikeFoodPostData, AxiosError<TAxiosError>, TLikeFoodPostVariables>,
) => {
    return useMutation<TLikeFoodPostData, AxiosError<TAxiosError>, TLikeFoodPostVariables>(
        async (data) => {
            const res = await defaultAxios.patch('/food/like', data);
            return res.data;
        },
        { ...options },
    );
};

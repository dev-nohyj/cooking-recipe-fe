import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';

export type TLikeRecipePostVariables = {
    recipePostId: number;
    likeType: LikeTypeLabel;
};

export type TLikeRecipePostData = {
    recipePostId: number;
    likeType: LikeTypeLabel;
};

export const useLikeRecipePostMutation = (
    options?: UseMutationOptions<TLikeRecipePostData, AxiosError<TAxiosError>, TLikeRecipePostVariables>,
) => {
    return useMutation<TLikeRecipePostData, AxiosError<TAxiosError>, TLikeRecipePostVariables>(
        async (data) => {
            const res = await defaultAxios.patch('/recipe/like', data);

            return res.data;
        },
        { ...options },
    );
};

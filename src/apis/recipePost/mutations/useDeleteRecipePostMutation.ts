import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TDeleteRecipePostVariables = {
    recipePostId: number;
};

export type TDeleteRecipePostData = {
    recipePostId: number;
};

export const useDeleteRecipePostMutation = (
    options?: UseMutationOptions<TDeleteRecipePostData, AxiosError<TAxiosError>, TDeleteRecipePostVariables>,
) => {
    return useMutation<TDeleteRecipePostData, AxiosError<TAxiosError>, TDeleteRecipePostVariables>(
        async (data) => {
            const res = await defaultAxios.delete(`/recipe/delete?recipePostId=${data.recipePostId}`);
            return res.data;
        },
        { ...options },
    );
};

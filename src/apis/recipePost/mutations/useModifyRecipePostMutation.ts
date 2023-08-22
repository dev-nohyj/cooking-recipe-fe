import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TModifyRecipePostVariables = {
    title: string;
    content: string;
    thumbnailUrl: string;
    category: ValueOf<typeof RecipePostCategoryLabel>;
    tags: string[] | null;
    recipePostId: number;
};

export type TModifyRecipePostData = {};

export const useModifyRecipePostMutation = (
    options?: UseMutationOptions<TModifyRecipePostData, AxiosError<TAxiosError>, TModifyRecipePostVariables>,
) => {
    return useMutation<TModifyRecipePostData, AxiosError<TAxiosError>, TModifyRecipePostVariables>(
        async (data) => {
            const res = await defaultAxios.put('/recipe/modify', data);
            return res.data;
        },
        { ...options },
    );
};

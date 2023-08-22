import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TCreateRecipePostVariables = {
    title: string;
    content: string;
    thumbnailUrl: string;
    category: ValueOf<typeof RecipePostCategoryLabel>;
    tags: string[] | null;
};

export type TCreateRecipePostData = {};

export const useCreateRecipePostMutation = (
    options?: UseMutationOptions<TCreateRecipePostData, AxiosError<TAxiosError>, TCreateRecipePostVariables>,
) => {
    return useMutation<TCreateRecipePostData, AxiosError<TAxiosError>, TCreateRecipePostVariables>(
        async (data) => {
            const res = await defaultAxios.post('/recipe/create', data);
            return res.data;
        },
        { ...options },
    );
};

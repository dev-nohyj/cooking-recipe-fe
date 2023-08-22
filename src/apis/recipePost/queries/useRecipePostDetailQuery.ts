import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type TRecipePostDetailData = {
    id: number;
    thumbnailUrl: string;
    title: string;
    createdAt: Date;
    content: string;
    authorId: string;
    category: ValueOf<typeof RecipePostCategoryLabel>;
};

export type TRecipePostDetailVariables = {
    recipePostId: number;
};

export const RecipePostDetailQueryKey = (variable: TRecipePostDetailVariables) => [
    'recipePostDetail',
    variable.recipePostId,
];

export const RecipePostDetailQueryFn = async (variable: TRecipePostDetailVariables, cookie?: string) => {
    const { data } = await defaultAxios.get(
        `/recipe/detail/${variable.recipePostId}`,
        cookie
            ? {
                  headers: { cookie: cookie },
              }
            : undefined,
    );
    return data;
};

export const useRecipePostDetailQuery = (
    variable: TRecipePostDetailVariables,
    options?: UseQueryOptions<TRecipePostDetailData, AxiosError<TAxiosError>>,
) => {
    return useQuery<TRecipePostDetailData, AxiosError<TAxiosError>>(
        RecipePostDetailQueryKey(variable),
        () => RecipePostDetailQueryFn(variable),
        { ...options },
    );
};

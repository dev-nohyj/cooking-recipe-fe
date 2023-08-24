import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RecipePostCategoryLabel } from '../../../asset/labels/recipePostLabel';

export type TRecipePostData = {
    id: number;
    title: string;
    thumbnailUrl: string;
    author: {
        nickname: string;
        profileImageUrl: string | null;
    };
    isLike: boolean;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TGetRecipePostData = {
    hasMore: boolean;
    recipePostList: TRecipePostData[];
};

export type TGetRecipePostVariables = {
    category?: ValueOf<typeof RecipePostCategoryLabel>;
};

export const GetRecipePostQueryKey = (variable: TGetRecipePostVariables) => ['recipeList', variable.category];

export const GetRecipePostQueryFn = async (variable: TGetRecipePostVariables, cursor: number | undefined) => {
    let url = variable.category ? `/recipe?size=20&category=${variable.category}` : '/recipe?size=20';
    if (cursor) {
        url = url + `&cursor=${cursor}`;
    }

    const { data } = await defaultAxios.get(url);
    return data;
};

export const useGetRecipePostQuery = (
    variable: TGetRecipePostVariables,
    options?: UseInfiniteQueryOptions<TGetRecipePostData, AxiosError<TAxiosError>>,
) => {
    return useInfiniteQuery<TGetRecipePostData, AxiosError<TAxiosError>>(
        GetRecipePostQueryKey(variable),
        ({ pageParam }) => GetRecipePostQueryFn(variable, pageParam),
        {
            ...options,
            getNextPageParam: (lastPage) => {
                if (!lastPage.hasMore) return undefined;
                const cursor = lastPage.recipePostList[lastPage.recipePostList.length - 1].id;
                return cursor;
            },
        },
    );
};

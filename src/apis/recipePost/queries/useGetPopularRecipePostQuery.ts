import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TRecipePostData } from './useGetRecipePostQuery';

export type TGetPopularRecipePostData = {
    recipePostList: TRecipePostData[];
};

export const GetPopularRecipePostQueryKey = () => ['recipePopular'];

export const GetPopularRecipePostQueryFn = async () => {
    const { data } = await defaultAxios.get('/recipe/popular');
    return data;
};

export const useGetPopularRecipePostQuery = (
    options?: UseQueryOptions<TGetPopularRecipePostData, AxiosError<TAxiosError>>,
) => {
    return useQuery<TGetPopularRecipePostData, AxiosError<TAxiosError>>(
        GetPopularRecipePostQueryKey(),
        () => GetPopularRecipePostQueryFn(),
        { ...options },
    );
};

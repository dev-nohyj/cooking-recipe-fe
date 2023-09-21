import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TFoodPostData } from './useGetFoodPostQuery';

export type TGetPopularFoodPostData = {
    foodPostList: TFoodPostData[];
};

export const GetPopularFoodPostQueryKey = () => ['foodPopular'];

export const GetPopularFoodPostQueryFn = async () => {
    const { data } = await defaultAxios.get('/food/popular');
    return data;
};

export const useGetPopularFoodPostQuery = (
    options?: UseQueryOptions<TGetPopularFoodPostData, AxiosError<TAxiosError>>,
) => {
    return useQuery<TGetPopularFoodPostData, AxiosError<TAxiosError>>(
        GetPopularFoodPostQueryKey(),
        () => GetPopularFoodPostQueryFn(),
        { ...options },
    );
};

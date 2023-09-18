import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type TGetFoodPostDetailData = {
    id: number;
    description: string | null;
    author: {
        id: string;
        nickname: string;
        profileImageUrl: string | null;
        introduction: string | null;
    };
    foodImages: { id: number; url: string }[];
    isLike: boolean;
    likeCount: number;
    tags: { id: number; title: string }[];
    createdAt: Date;
    updatedAt: Date;
};

export type TGetFoodPostDetailVariables = {
    foodPostId: number;
};

export const GetFoodPostDetailQueryKey = (variable: TGetFoodPostDetailVariables) => [
    'foodPostDetail',
    variable.foodPostId,
];

export const GetFoodPostDetailQueryFn = async (variable: TGetFoodPostDetailVariables, cookie?: string) => {
    const { data } = await defaultAxios.get(
        `/food/detail/${variable.foodPostId}`,
        cookie
            ? {
                  headers: { cookie: cookie },
              }
            : undefined,
    );
    return data;
};

export const useGetFoodPostDetailQuery = (
    variable: TGetFoodPostDetailVariables,
    options?: UseQueryOptions<TGetFoodPostDetailData, AxiosError<TAxiosError>>,
) => {
    return useQuery<TGetFoodPostDetailData, AxiosError<TAxiosError>>(
        GetFoodPostDetailQueryKey(variable),
        () => GetFoodPostDetailQueryFn(variable),
        { ...options },
    );
};

import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type TFoodPostData = {
    id: number;
    description: string | null;
    author: {
        nickname: string;
        profileImageUrl: string | null;
    };
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TGetFoodPostData = {
    hasMore: boolean;
    foodPostList: TFoodPostData[];
};

export const GetFoodPostQueryKey = () => ['foodPostList'];

export const GetFoodPostQueryFn = async (cursor: number | undefined) => {
    let url = `/food?size=20`;
    if (cursor) {
        url = url + `&cursor=${cursor}`;
    }

    const { data } = await defaultAxios.get(url);
    return data;
};

export const useGetFoodPostQuery = (options?: UseInfiniteQueryOptions<TGetFoodPostData, AxiosError<TAxiosError>>) => {
    return useInfiniteQuery<TGetFoodPostData, AxiosError<TAxiosError>>(
        GetFoodPostQueryKey(),
        ({ pageParam }) => GetFoodPostQueryFn(pageParam),
        {
            ...options,
            getNextPageParam: (lastPage) => {
                if (!lastPage.hasMore) return undefined;
                const cursor = lastPage.foodPostList[lastPage.foodPostList.length - 1].id;
                return cursor;
            },
        },
    );
};

'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { TFoodPostData, useGetFoodPostQuery } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import FoodList from './FoodList';

interface Props {}

const Main = ({}: Props) => {
    const router = useRouter();

    const onCreate = useCallback(() => {
        router.push('/food/write');
    }, []);

    const { data, fetchNextPage, isLoading, error } = useGetFoodPostQuery({
        keepPreviousData: true,
    });
    const { data: user } = useGetProfileQuery();

    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const { foodPostList, hasMore } = useMemo(() => {
        if (!data || data.pages[0].foodPostList.length === 0) return { foodPostList: [], hasMore: false };
        let foodPostList: TFoodPostData[] = [];
        data.pages.forEach((list) => {
            foodPostList = [...foodPostList, ...list.foodPostList];
        });
        return { foodPostList, hasMore: data.pages[data.pages.length - 1].hasMore };
    }, [data?.pages]);

    const props = {
        isLoading,
        foodPostList,
        onCreate,
        fetchNextPage,
        hasMore,
        isLogin: !!user?.profile,
    };

    return <FoodList {...props} />;
};

export default Main;

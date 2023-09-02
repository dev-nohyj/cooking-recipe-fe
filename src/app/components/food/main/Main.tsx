'use client';
import { useLikeFoodPostMutation } from '@/apis/foodPost/mutations/useLikeFoodPostMutation';
import { TFoodPostData, TGetFoodPostData, useGetFoodPostQuery } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {}

const Main = ({}: Props) => {
    const cache = useQueryClient();
    const router = useRouter();

    const { data, fetchNextPage, isLoading, error } = useGetFoodPostQuery({ keepPreviousData: true });
    const { foodPostList, hasMore } = useMemo(() => {
        if (!data || data.pages[0].foodPostList.length === 0) return { foodPostList: [], hasMore: false };
        let foodPostList: TFoodPostData[] = [];
        data.pages.forEach((list) => {
            foodPostList = [...foodPostList, ...list.foodPostList];
        });
        return { foodPostList, hasMore: data.pages[data.pages.length - 1].hasMore };
    }, [data?.pages]);

    const onDetail = useCallback((id: number) => {
        router.push(`/food/detail/${id}`);
    }, []);

    const { mutate, isLoading: isLikeLoading } = useLikeFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (_, variables) => {
            cache.setQueriesData<InfiniteData<TGetFoodPostData>>(['foodPostList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.foodPostList.forEach((item) => {
                                if (item.id === variables.foodPostId) {
                                    if (variables.likeType === LikeTypeLabel.like) {
                                        item.isLike = true;
                                        item.likeCount = item.likeCount + 1;
                                    } else {
                                        item.isLike = false;
                                        item.likeCount = item.likeCount - 1;
                                    }
                                }
                            });
                        });
                    });
                    return newData;
                }
            });
        },
    });
    const onLike = useCallback((foodPostId: number, isLike: boolean) => {
        mutate({ foodPostId, likeType: isLike ? LikeTypeLabel.unLike : LikeTypeLabel.like });
    }, []);

    if (isLoading || error) return <></>;
    if (foodPostList.length === 0) return <>empty list</>;

    return (
        <InfiniteScroll dataLength={foodPostList.length} next={fetchNextPage} hasMore={hasMore} loader={<></>}>
            <div>
                {foodPostList.map((v) => {
                    return (
                        <div
                            key={nanoid(6)}
                            onClick={() => {
                                onDetail(v.id);
                            }}
                        >
                            <Image alt="img" src={v.imageUrl} width={300} height={200} />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onLike(v.id, v.isLike);
                                }}
                                disabled={isLikeLoading}
                            >
                                {v.isLike ? 'unLike' : 'like'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </InfiniteScroll>
    );
};

export default Main;

'use client';
import { useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import { useDeleteFoodPostMutation } from '@/apis/foodPost/mutations/useDeleteFoodPostMutation';
import { useLikeFoodPostMutation } from '@/apis/foodPost/mutations/useLikeFoodPostMutation';
import {
    GetFoodPostDetailQueryKey,
    TGetFoodPostDetailData,
    useGetFoodPostDetailQuery,
} from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
import { TGetFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useCallback, useEffect, useMemo } from 'react';
import FoodPostView from './FoodPostView';
import { useRouter } from 'next/navigation';
import {
    GetPopularFoodPostQueryKey,
    TGetPopularFoodPostData,
} from '@/apis/foodPost/queries/useGetPopularFoodPostQuery';

interface Props {
    foodPostId: number;
}

const FoodPost = ({ foodPostId }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();
    const [isVisibleModal, onChangeVisibleModal] = useSwitchState();
    const { data: user } = useGetProfileQuery();
    const { data, error } = useGetFoodPostDetailQuery({ foodPostId });
    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const { mutate, isLoading: isDeleteLoading } = useDeleteFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (data) => {
            router.replace('/food');
            cache.setQueriesData<InfiniteData<TGetFoodPostData>>(['foodPostList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.foodPostList = list.foodPostList.filter((item) => {
                                return item.id !== data.foodPostId;
                            });
                        });
                    });
                    return newData;
                }
            });
            cache.setQueryData<TGetPopularFoodPostData>(GetPopularFoodPostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.foodPostList.filter((item) => {
                            return item.id !== data.foodPostId;
                        });
                    });
                    return newData;
                }
            });
        },
    });

    const onModify = useCallback(() => {
        router.push(`/food/write?foodPostId=${foodPostId}`);
    }, [foodPostId]);

    const onDelete = useCallback(() => {
        mutate({ foodPostId });
    }, [foodPostId]);

    const { mutate: like, isLoading: isLikeLoading } = useLikeFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (_, variables) => {
            cache.setQueryData<TGetFoodPostDetailData>(
                GetFoodPostDetailQueryKey({ foodPostId: variables.foodPostId }),
                (prev) => {
                    if (prev) {
                        const newData = produce(prev, (draft) => {
                            if (variables.likeType === LikeTypeLabel.like) {
                                draft.isLike = true;
                                draft.likeCount = draft.likeCount + 1;
                            } else {
                                draft.isLike = false;
                                draft.likeCount = draft.likeCount - 1;
                            }
                        });
                        return newData;
                    }
                },
            );
        },
    });

    const onLike = useCallback(
        (foodPostId: number, likeType: boolean) => {
            if (!user?.profile) {
                return;
            }
            like({
                foodPostId,
                likeType: likeType ? LikeTypeLabel.unLike : LikeTypeLabel.like,
            });
        },
        [user?.profile],
    );

    const isAuthor = useMemo(() => {
        return user?.profile?.id === data?.author.id;
    }, [user?.profile?.id, data?.author.id]);
    if (!data) return;
    const props = {
        data,
        isAuthor,
        onModify,
        isDeleteLoading,
        onChangeVisibleModal,
        isLikeLoading,
        onLike,
        isVisibleModal,
        onDelete,
    };
    return <FoodPostView {...props} />;
};

export default FoodPost;

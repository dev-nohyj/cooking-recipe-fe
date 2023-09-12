import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useLikeRecipePostMutation } from '@/apis/recipePost/mutations/useLikeRecipePostMutation';
import {
    TGetRecipePostData,
    TRecipePostData,
    useGetRecipePostQuery,
} from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { LikeTypeLabel, RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import RecipeList from './RecipeList';

interface Props {
    category: ValueOf<typeof RecipePostCategoryLabel> | undefined;
}

const RecipePost = ({ category }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();

    const onCreate = useCallback(() => {
        router.push('/recipe/write');
    }, []);

    const onDetail = useCallback((id: number) => {
        router.push(`/recipe/detail/${id}`);
    }, []);

    const { data, fetchNextPage, isLoading, error } = useGetRecipePostQuery({ category }, { keepPreviousData: true });
    const user = cache.getQueryData<TGetProfileData>(GetProfileQueryKey());

    const { mutate, isLoading: isLikeLoading } = useLikeRecipePostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (_, variables) => {
            cache.setQueriesData<InfiniteData<TGetRecipePostData>>(['recipeList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.recipePostList.forEach((item) => {
                                if (item.id === variables.recipePostId) {
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
            cache.setQueryData<TRecipePostDetailData>(
                RecipePostDetailQueryKey({ recipePostId: variables.recipePostId }),
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
        (recipePostId: number, likeType: boolean) => {
            if (!user?.profile) {
                return;
            }
            mutate({
                recipePostId,
                likeType: likeType ? LikeTypeLabel.unLike : LikeTypeLabel.like,
            });
        },
        [user?.profile],
    );
    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const { recipePostList, hasMore } = useMemo(() => {
        if (!data || data.pages[0].recipePostList.length === 0) return { recipePostList: [], hasMore: false };
        let recipePostList: TRecipePostData[] = [];
        data.pages.forEach((list) => {
            recipePostList = [...recipePostList, ...list.recipePostList];
        });
        return { recipePostList, hasMore: data.pages[data.pages.length - 1].hasMore };
    }, [data?.pages]);

    const props = {
        recipePostList,
        hasMore,
        fetchNextPage,
        onCreate,
        onDetail,
        onLike,
        isLoading,
        isLikeLoading,
    };

    return <RecipeList {...props} />;
};

export default RecipePost;

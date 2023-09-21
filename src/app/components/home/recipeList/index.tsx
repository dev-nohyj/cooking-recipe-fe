import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecipeListView from './RecipeListView';
import {
    GetPopularRecipePostQueryKey,
    TGetPopularRecipePostData,
    useGetPopularRecipePostQuery,
} from '@/apis/recipePost/queries/useGetPopularRecipePostQuery';
import { useLikeRecipePostMutation } from '@/apis/recipePost/mutations/useLikeRecipePostMutation';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { TGetRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { produce } from 'immer';
import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';

interface Props {}

const RecipeList = ({}: Props) => {
    const router = useRouter();
    const cache = useQueryClient();

    const onRouteRecipe = useCallback(() => {
        router.push('/recipe');
    }, []);

    const onDetail = useCallback((id: number) => {
        router.push(`/recipe/detail/${id}`);
    }, []);

    const { data, isLoading, error } = useGetPopularRecipePostQuery();
    const user = cache.getQueryData<TGetProfileData>(GetProfileQueryKey());

    const { mutate, isLoading: isLikeLoading } = useLikeRecipePostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (_, variables) => {
            cache.setQueryData<TGetPopularRecipePostData>(GetPopularRecipePostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.recipePostList.forEach((item) => {
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
                    return newData;
                }
            });
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

    const props = {
        onRouteRecipe,
        data,
        isLoading,
        onDetail,
        onLike,
        isLikeLoading,
    };
    return <RecipeListView {...props} />;
};

export default RecipeList;

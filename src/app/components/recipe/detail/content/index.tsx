import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { useDeleteRecipePostMutation } from '@/apis/recipePost/mutations/useDeleteRecipePostMutation';
import { useRouter } from 'next/navigation';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { TGetRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { produce } from 'immer';
import { useCallback } from 'react';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import moment from 'moment-timezone';
import ContentView from './ContentView';
import { useLikeRecipePostMutation } from '@/apis/recipePost/mutations/useLikeRecipePostMutation';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';
import {
    GetPopularRecipePostQueryKey,
    TGetPopularRecipePostData,
} from '@/apis/recipePost/queries/useGetPopularRecipePostQuery';

interface Props {
    data: TRecipePostDetailData;
    recipePostId: number;
    isAuthor: boolean;
    isLogin: boolean;
}

const Content = ({ data, recipePostId, isAuthor, isLogin }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();
    const [isVisibleModal, onChangeVisibleModal] = useSwitchState();
    const { createdAt, title, tags, isLike, likeCount, content, author } = data;

    const { mutate: likePost, isLoading: isLikeLoading } = useLikeRecipePostMutation({
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
        },
    });

    const onLike = useCallback(
        (likeType: boolean) => {
            if (!isLogin) {
                return;
            }
            likePost({
                recipePostId,
                likeType: likeType ? LikeTypeLabel.unLike : LikeTypeLabel.like,
            });
        },
        [isLogin],
    );
    const { mutate, isLoading: isDeleteLoading } = useDeleteRecipePostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (data) => {
            router.replace('/recipe');
            cache.setQueriesData<InfiniteData<TGetRecipePostData>>(['recipeList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.recipePostList = list.recipePostList.filter((item) => {
                                return item.id !== data.recipePostId;
                            });
                        });
                    });
                    return newData;
                }
            });
            cache.setQueryData<TGetPopularRecipePostData>(GetPopularRecipePostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.recipePostList.filter((item) => {
                            return item.id !== data.recipePostId;
                        });
                    });
                    return newData;
                }
            });
        },
    });

    const onModify = useCallback(() => {
        router.push(`/recipe/write?recipePostId=${recipePostId}`);
    }, [recipePostId]);

    const onDelete = useCallback(() => {
        mutate({
            recipePostId,
        });
    }, [recipePostId]);

    const props = {
        onDelete,
        onModify,
        isDeleteLoading,
        isVisibleModal,
        onChangeVisibleModal,
        date: moment(createdAt).format('YYYY년 MM월 DD일'),
        title,
        tags,
        isLike,
        likeCount,
        content,
        author,
        isAuthor,
        onLike,
        isLikeLoading,
    };

    return <ContentView {...props} />;
};

export default Content;

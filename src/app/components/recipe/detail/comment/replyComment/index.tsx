import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCreateCommentMutation } from '@/apis/recipePost/mutations/useCreateCommentMutation';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import {
    GetCommentQueryKey,
    TGetCommentData,
    TRecipePostCommentData,
    useGetCommentQuery,
} from '@/apis/recipePost/queries/useGetCommentQuery';
import { produce } from 'immer';
import ReplyCommentList from './ReplyCommentList';
import CreateComment from '../CreateComment';
import { TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useDeleteCommentMutation } from '@/apis/recipePost/mutations/useDeleteCommentMutation';
import { ReplyContainer } from '../Comment.style';

interface Props {
    recipePostId: number;
    parentId: number;
    user: TGetProfileData | undefined;
    isVisible: boolean;
}

const ReplyComment = ({ recipePostId, parentId, user, isVisible }: Props) => {
    const cache = useQueryClient();

    const [comment, setComment] = useState('');
    const onChangeComment = useCallback((v: string) => {
        setComment(v);
    }, []);

    const {
        data,
        fetchNextPage,
        error,
        isLoading: isCommentLoading,
    } = useGetCommentQuery(
        {
            recipePostId,
            parentId,
        },
        { enabled: isVisible },
    );

    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const { commentList, hasMore } = useMemo(() => {
        if (!data || data.pages[0].commentList.length === 0) {
            return { commentList: [], hasMore: false };
        }
        let commentList: TRecipePostCommentData[] = [];

        data.pages.forEach((list) => {
            commentList = [...commentList, ...list.commentList];
        });
        return { commentList, hasMore: data.pages[data.pages.length - 1].hasMore };
    }, [data?.pages]);

    const { mutate, isLoading } = useCreateCommentMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '댓글 작성에 실패했습니다.');
        },
        onSuccess: (data) => {
            onChangeComment('');

            cache.setQueryData<InfiniteData<TGetCommentData>>(
                GetCommentQueryKey({ recipePostId, parentId }),
                (prev) => {
                    if (prev) {
                        const newData = produce(prev, (draft) => {
                            draft.pages[draft.pages.length - 1].commentList = [...draft.pages[0].commentList, data];
                        });
                        return newData;
                    }
                },
            );
        },
    });
    const { mutate: deleteComment, isLoading: isDeleteLoading } = useDeleteCommentMutation({
        onError: (err) => {
            if (err) {
                alert(err.response?.data.message ?? '에러가 발생했습니다.');
            }
        },
        onSuccess: (data) => {
            cache.setQueryData<InfiniteData<TGetCommentData>>(
                GetCommentQueryKey({ recipePostId, parentId }),
                (prev) => {
                    if (prev) {
                        const newData = produce(prev, (draft) => {
                            draft.pages.forEach((list) => {
                                list.commentList.forEach((item) => {
                                    if (item.id === data.commentId) {
                                        item.deletedAt = data.deletedAt;
                                    }
                                });
                            });
                        });
                        return newData;
                    }
                },
            );
        },
    });

    const onDelete = useCallback((commentId: number) => {
        const check = confirm('정말로 삭제하시겠습니까?');
        if (check) {
            deleteComment({ commentId });
        }
    }, []);

    const onCreate = useCallback(() => {
        mutate({
            recipePostId,
            comment,
            parentId,
        });
    }, [recipePostId, comment, parentId]);

    const createCommentProps = {
        isLogin: !!user?.profile,
        comment,
        onChangeComment,
        onCreate,
        isLoading,
    };

    const replyListProps = {
        recipePostId,
        parentId,
        commentList,
        hasMore,
        isCommentLoading,
        fetchNextPage,
        onDelete,
        isDeleteLoading,
        user,
    };

    return (
        <ReplyContainer>
            <CreateComment {...createCommentProps} />
            <ReplyCommentList {...replyListProps} />
        </ReplyContainer>
    );
};

export default ReplyComment;

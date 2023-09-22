import { useCreateCommentMutation } from '@/apis/recipePost/mutations/useCreateCommentMutation';
import {
    GetCommentQueryKey,
    TGetCommentData,
    TRecipePostCommentData,
    useGetCommentQuery,
} from '@/apis/recipePost/queries/useGetCommentQuery';
import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CommentList from './CommentList';
import { CommentCount, Container } from './Comment.style';
import CreateComment from './CreateComment';
import { TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useDeleteCommentMutation } from '@/apis/recipePost/mutations/useDeleteCommentMutation';

interface Props {
    commentCount: number;
    recipePostId: number;
    user: TGetProfileData | undefined;
}

const Comment = ({ commentCount, recipePostId, user }: Props) => {
    const cache = useQueryClient();

    const {
        data,
        fetchNextPage,
        error,
        isLoading: isCommentLoading,
    } = useGetCommentQuery({
        recipePostId,
    });

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

    const [comment, setComment] = useState('');
    const onChangeComment = useCallback((v: string) => {
        setComment(v);
    }, []);

    const { mutate, isLoading } = useCreateCommentMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '댓글 작성에 실패했습니다.');
        },
        onSuccess: (data) => {
            onChangeComment('');
            cache.setQueryData<TRecipePostDetailData>(RecipePostDetailQueryKey({ recipePostId }), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.commentCount = draft.commentCount + 1;
                    });
                    return newData;
                }
            });
            cache.setQueryData<InfiniteData<TGetCommentData>>(GetCommentQueryKey({ recipePostId }), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages[0].commentList = [data, ...draft.pages[0].commentList];
                    });
                    return newData;
                }
            });
        },
    });

    const { mutate: deleteComment, isLoading: isDeleteLoading } = useDeleteCommentMutation({
        onError: (err) => {
            if (err) {
                alert(err.response?.data.message ?? '에러가 발생했습니다.');
            }
        },
        onSuccess: (data) => {
            cache.setQueryData<InfiniteData<TGetCommentData>>(GetCommentQueryKey({ recipePostId }), (prev) => {
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
            });
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
            parentId: null,
        });
    }, [recipePostId, comment]);

    const createCommentProps = {
        isLogin: !!user?.profile,
        comment,
        onChangeComment,
        onCreate,
        isLoading,
    };
    const commentListProps = {
        commentList,
        hasMore,
        isCommentLoading,
        fetchNextPage,
        recipePostId,
        user,
        onDelete,
        isDeleteLoading,
    };

    return (
        <Container>
            <CommentCount>댓글 {commentCount}개</CommentCount>
            <CreateComment {...createCommentProps} />
            <CommentList {...commentListProps} />
        </Container>
    );
};

export default Comment;

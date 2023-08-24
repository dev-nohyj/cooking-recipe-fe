'use client';
import { useCreateCommentMutation } from '@/apis/recipePost/mutations/useCreateCommentMutation';
import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import CommentList from './CommentList';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { produce } from 'immer';
import { GetCommentQueryKey, TGetCommentData } from '@/apis/recipePost/queries/useGetCommentQuery';

interface Props {
    commentCount: number;
    recipePostId: number;
}

const CommentContainer = ({ commentCount, recipePostId }: Props) => {
    const cache = useQueryClient();
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

    const onCreate = useCallback(() => {
        if (comment.trim().length === 0) {
            return alert('댓글을 입력해주세요.');
        }
        mutate({
            recipePostId,
            comment,
            parentId: null,
        });
    }, [recipePostId, comment]);

    return (
        <Container>
            <p>댓글 {commentCount}개</p>
            <div>
                <textarea
                    placeholder="댓글을 작성하세요."
                    value={comment}
                    onChange={(e) => {
                        onChangeComment(e.target.value);
                    }}
                    maxLength={300}
                />
                <button onClick={onCreate} disabled={isLoading}>
                    댓글 달기
                </button>
            </div>
            <CommentList recipePostId={recipePostId} />
        </Container>
    );
};

const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`;

export default CommentContainer;

import { useDeleteCommentMutation } from '@/apis/recipePost/mutations/useDeleteCommentMutation';
import {
    GetCommentQueryKey,
    TGetCommentData,
    TRecipePostCommentData,
} from '@/apis/recipePost/queries/useGetCommentQuery';
import { useCallback, useMemo, useState } from 'react';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { useModifyCommentMutation } from '@/apis/recipePost/mutations/useModifyCommentMutation';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

interface Props {
    recipePostId: number;
    parentId: number;
    data: TRecipePostCommentData;
}

const ReplyCommentItem = ({ data, recipePostId, parentId }: Props) => {
    const cache = useQueryClient();
    const [isModify, onChangeModify] = useSwitchState();
    const [comment, setComment] = useState(data.comment);
    const onChangeComment = useCallback((comment: string) => {
        setComment(comment);
    }, []);
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
    const { mutate: modifyComment, isLoading: isModifyLoading } = useModifyCommentMutation({
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
                                        item.comment = data.comment;
                                        item.updatedAt = data.updatedAt;
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
        deleteComment({ commentId });
    }, []);

    const onModify = useCallback(
        (commentId: number) => {
            modifyComment({ comment, commentId });
        },
        [comment],
    );
    const isModified = useMemo(() => {
        return data.createdAt !== data.updatedAt;
    }, [data]);

    if (!!data.deletedAt) return <div>삭제된 글입니다.</div>;
    return (
        <div>
            {isModified && <div>(수정됨)</div>}
            {isModify ? (
                <>
                    <textarea
                        value={comment}
                        maxLength={300}
                        onChange={(e) => {
                            onChangeComment(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            onModify(data.id);
                        }}
                        disabled={isModifyLoading}
                    >
                        수정
                    </button>
                </>
            ) : (
                <span>{data.comment}</span>
            )}

            <button onClick={onChangeModify}>{isModify ? '취소' : '수정'}</button>
            <button
                onClick={() => {
                    onDelete(data.id);
                }}
                disabled={isDeleteLoading}
            >
                삭제
            </button>
        </div>
    );
};

export default ReplyCommentItem;

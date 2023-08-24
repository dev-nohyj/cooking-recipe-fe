import { useSwitchState } from '@/app/hooks/useSwitchState';
import ReplyCommentList from './ReplyCommentList';
import { useCallback, useState } from 'react';
import { useCreateCommentMutation } from '@/apis/recipePost/mutations/useCreateCommentMutation';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { GetCommentQueryKey, TGetCommentData } from '@/apis/recipePost/queries/useGetCommentQuery';
import { produce } from 'immer';

interface Props {
    replyCount: number;
    recipePostId: number;
    parentId: number;
}

const ReplyComment = ({ recipePostId, replyCount, parentId }: Props) => {
    const cache = useQueryClient();
    const [isVisible, onChangeVisible] = useSwitchState();
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
            cache.setQueryData<InfiniteData<TGetCommentData>>(GetCommentQueryKey({ recipePostId }), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.commentList.forEach((item) => {
                                if (item.id === parentId) {
                                    item.replyCount = item.replyCount + 1;
                                }
                            });
                        });
                    });
                    return newData;
                }
            });
            cache.setQueryData<InfiniteData<TGetCommentData>>(
                GetCommentQueryKey({ recipePostId, parentId }),
                (prev) => {
                    if (prev) {
                        const newData = produce(prev, (draft) => {
                            draft.pages[0].commentList = [data, ...draft.pages[0].commentList];
                        });
                        return newData;
                    }
                },
            );
        },
    });

    const onCreate = useCallback(() => {
        if (comment.trim().length === 0) {
            return alert('댓글을 입력해주세요.');
        }
        mutate({
            recipePostId,
            comment,
            parentId,
        });
    }, [recipePostId, comment, parentId]);

    return (
        <div>
            <button onClick={onChangeVisible}>{replyCount === 0 ? '답글 달기' : `${replyCount}개의 답글`}</button>
            {isVisible && (
                <>
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
                            답글 달기
                        </button>
                    </div>
                    {replyCount > 0 && <ReplyCommentList recipePostId={recipePostId} parentId={parentId} />}
                </>
            )}
        </div>
    );
};

export default ReplyComment;

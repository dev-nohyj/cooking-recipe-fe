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
import CommentItemView from './CommentItemView';
import { TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';

interface Props {
    recipePostId: number;
    data: TRecipePostCommentData;
    user: TGetProfileData | undefined;
    onDelete: (v: number) => void;
    isDeleteLoading: boolean;
}

const CommentItem = ({ recipePostId, data, user, onDelete, isDeleteLoading }: Props) => {
    const cache = useQueryClient();
    const [isEdit, onChangeEdit] = useSwitchState();
    const [isVisible, onChangeVisible] = useSwitchState();
    const [comment, setComment] = useState(data.comment);
    const onChangeComment = useCallback((comment: string) => {
        setComment(comment);
    }, []);

    const { mutate: modifyComment, isLoading: isModifyLoading } = useModifyCommentMutation({
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
                                    item.comment = data.comment;
                                    item.updatedAt = data.updatedAt;
                                }
                            });
                        });
                    });
                    return newData;
                }
            });
        },
    });

    const onModify = useCallback(() => {
        modifyComment({ comment, commentId: data.id });
    }, [comment, data.id]);

    const { isModified, isDeleted } = useMemo(() => {
        return {
            isModified: data.createdAt !== data.updatedAt,
            isDeleted: !!data.deletedAt,
        };
    }, [data.createdAt, data.updatedAt, data.deletedAt]);

    const isAuthor = useMemo(() => {
        return user?.profile?.id === data.writer?.id;
    }, [user?.profile?.id, data.writer?.id]);

    const props = {
        data,
        isDeleted,
        isModified,
        isEdit,
        onChangeEdit,
        comment,
        onChangeComment,
        onModify,
        isModifyLoading,
        isAuthor,
        recipePostId,
        onDelete,
        isDeleteLoading,
        user,
        isVisible,
        onChangeVisible,
    };

    return <CommentItemView {...props} />;
};

export default CommentItem;

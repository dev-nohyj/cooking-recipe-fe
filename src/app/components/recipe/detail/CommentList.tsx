import { TRecipePostCommentData, useGetCommentQuery } from '@/apis/recipePost/queries/useGetCommentQuery';
import { nanoid } from 'nanoid';
import { useEffect, useMemo } from 'react';
import CommentItem from './CommentItem';

interface Props {
    recipePostId: number;
}

const CommentList = ({ recipePostId }: Props) => {
    const { data, fetchNextPage, error } = useGetCommentQuery({
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

    return (
        <div>
            {commentList.map((v) => {
                return <CommentItem key={`comment-${nanoid(6)}`} data={v} recipePostId={recipePostId} />;
            })}
            {hasMore && (
                <button
                    onClick={() => {
                        fetchNextPage();
                    }}
                >
                    더보기
                </button>
            )}
        </div>
    );
};

export default CommentList;
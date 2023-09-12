import { TRecipePostCommentData } from '@/apis/recipePost/queries/useGetCommentQuery';
import { nanoid } from 'nanoid';
import { FetchMoreBtn } from '../Comment.style';
import LoadingComment from './LoadingComment';
import CommentItem from './commentItem';
import { TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';

interface Props {
    commentList: TRecipePostCommentData[];
    hasMore: boolean;
    isCommentLoading: boolean;
    fetchNextPage: () => void;
    recipePostId: number;
    user: TGetProfileData | undefined;
    onDelete: (v: number) => void;
    isDeleteLoading: boolean;
}

const CommentList = ({
    commentList,
    hasMore,
    isCommentLoading,
    fetchNextPage,
    recipePostId,
    user,
    onDelete,
    isDeleteLoading,
}: Props) => {
    if (isCommentLoading) return <LoadingComment />;
    return (
        <>
            {commentList.map((v) => {
                return (
                    <CommentItem
                        key={`comment-${nanoid(6)}`}
                        data={v}
                        recipePostId={recipePostId}
                        user={user}
                        onDelete={onDelete}
                        isDeleteLoading={isDeleteLoading}
                    />
                );
            })}
            {hasMore && (
                <FetchMoreBtn
                    onClick={() => {
                        fetchNextPage();
                    }}
                >
                    더보기
                </FetchMoreBtn>
            )}
        </>
    );
};

export default CommentList;

import { nanoid } from 'nanoid';
import { TRecipePostCommentData } from '@/apis/recipePost/queries/useGetCommentQuery';
import { FetchMoreBtn } from '../Comment.style';
import ReplyCommentItem from './replyCommentItem';
import { TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';

interface Props {
    recipePostId: number;
    parentId: number;
    isCommentLoading: boolean;
    commentList: TRecipePostCommentData[];
    hasMore: boolean;
    fetchNextPage: () => void;
    onDelete: (v: number) => void;
    isDeleteLoading: boolean;
    user: TGetProfileData | undefined;
}

const ReplyCommentList = ({
    recipePostId,
    parentId,
    commentList,
    isCommentLoading,
    hasMore,
    fetchNextPage,
    onDelete,
    isDeleteLoading,
    user,
}: Props) => {
    if (isCommentLoading || commentList.length === 0) return <></>;

    return (
        <div>
            {commentList.map((v) => {
                return (
                    <ReplyCommentItem
                        key={`replyCommentItem-${nanoid(6)}`}
                        data={v}
                        recipePostId={recipePostId}
                        parentId={parentId}
                        onDelete={onDelete}
                        isDeleteLoading={isDeleteLoading}
                        user={user}
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
        </div>
    );
};

export default ReplyCommentList;

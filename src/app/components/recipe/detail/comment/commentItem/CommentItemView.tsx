import { colors } from '@/asset/colors';
import {
    CommentWrapper,
    Date,
    Img,
    ItemContainer,
    Nickname,
    ProfileContainer,
    RightWrapper,
    TextWrapper,
} from '../Comment.style';
import { commonImages } from '../../../../../../../public/images';
import { TRecipePostCommentData } from '@/apis/recipePost/queries/useGetCommentQuery';
import { convertTime } from '@/app/utils/convertTime';
import { TextButton } from '@/app/components/shared/button/TextButton';
import ReplyComment from '../replyComment';
import { TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';

interface Props {
    data: TRecipePostCommentData;
    isDeleted: boolean;
    isModified: boolean;
    isEdit: boolean;
    onChangeEdit: () => void;
    comment: string;
    onChangeComment: (v: string) => void;
    onModify: () => void;
    isModifyLoading: boolean;
    recipePostId: number;
    onDelete: (v: number) => void;
    isDeleteLoading: boolean;
    isAuthor: boolean;
    user: TGetProfileData | undefined;
    isVisible: boolean;
    onChangeVisible: () => void;
}

const CommentItemView = ({
    data,
    isDeleted,
    isModified,
    isEdit,
    onChangeEdit,
    comment,
    onChangeComment,
    onModify,
    isModifyLoading,
    recipePostId,
    onDelete,
    isDeleteLoading,
    isAuthor,
    user,
    isVisible,
    onChangeVisible,
}: Props) => {
    if (isDeleted)
        return (
            <ItemContainer>
                <TextWrapper>
                    <p>삭제된 글입니다.</p>
                </TextWrapper>
            </ItemContainer>
        );
    return (
        <>
            <ItemContainer>
                <ProfileContainer>
                    <Img
                        src={
                            data.writer?.profileImageUrl
                                ? data.writer?.profileImageUrl
                                : commonImages.defaultProfileSm.uri
                        }
                        alt="profileImg"
                        width={24}
                        height={24}
                    />
                    <RightWrapper>
                        <Nickname>{data.writer ? data.writer.nickname : '탈퇴 유저'}</Nickname>
                        <Date>
                            {convertTime(data.createdAt)}
                            {isModified && <span>(수정됨)</span>}
                        </Date>
                    </RightWrapper>
                </ProfileContainer>
                <div>
                    {isEdit ? (
                        <CommentWrapper>
                            <textarea
                                value={comment}
                                maxLength={300}
                                onChange={(e) => {
                                    onChangeComment(e.target.value);
                                }}
                            />
                            <button onClick={onModify} disabled={isModifyLoading}>
                                수정
                            </button>
                        </CommentWrapper>
                    ) : (
                        <TextWrapper>
                            <p>{data.comment}</p>
                        </TextWrapper>
                    )}
                </div>

                {isAuthor && (
                    <>
                        <TextButton fontSize={'1.2rem'} color={colors.black200} onClick={onChangeEdit}>
                            {isEdit ? '취소' : '수정'}
                        </TextButton>
                        <TextButton
                            fontSize={'1.2rem'}
                            color={colors.black200}
                            onClick={() => {
                                onDelete(data.id);
                            }}
                            disabled={isDeleteLoading}
                        >
                            삭제
                        </TextButton>
                    </>
                )}
            </ItemContainer>
            <TextButton color={colors.black200} fontSize={'1.4rem'} onClick={onChangeVisible}>
                {isVisible ? '답글 닫기' : '답글 보기'}
            </TextButton>
            {isVisible && (
                <ReplyComment recipePostId={recipePostId} parentId={data.id} user={user} isVisible={isVisible} />
            )}
        </>
    );
};

export default CommentItemView;

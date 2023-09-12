import { CommentWrapper } from '../Comment.style';

interface Props {
    isLogin: boolean;
    comment: string;
    onChangeComment: (v: string) => void;
    onCreate: () => void;
    isLoading: boolean;
}

const CreateComment = ({ isLogin, comment, onChangeComment, onCreate, isLoading }: Props) => {
    return (
        <CommentWrapper>
            <textarea
                placeholder={isLogin ? '댓글을 작성하세요.' : '로그인 후 댓글을 작성하세요.'}
                value={comment}
                onChange={(e) => {
                    onChangeComment(e.target.value);
                }}
                disabled={!isLogin}
                maxLength={300}
            />
            <button onClick={onCreate} disabled={isLoading || comment.trim().length === 0}>
                댓글 달기
            </button>
        </CommentWrapper>
    );
};

export default CreateComment;

import { TextButton } from '@/app/components/shared/button/TextButton';
import { colors } from '@/asset/colors';
import { MobileSize, TabletSize } from '@/asset/const/deviceSize';
import { styled } from 'styled-components';
import LikeIcon from '../../../../../../public/svg/LikeIcon';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import { commonImages } from '../../../../../../public/images';
import CheckConfirmModal from '@/app/components/shared/modal/CheckConfirmModal';

interface Props {
    onModify: () => void;
    onDelete: () => void;
    isDeleteLoading: boolean;
    isVisibleModal: boolean;
    onChangeVisibleModal: () => void;
    isAuthor: boolean;
    date: string;
    title: string;
    tags: { id: number; title: string }[];
    isLike: boolean;
    likeCount: number;
    content: string;
    author: {
        id: string;
        nickname: string;
        profileImageUrl: string | null;
        introduction: string | null;
    };
    onLike: (likeType: boolean) => void;
    isLikeLoading: boolean;
}

const ContentView = ({
    onModify,
    onDelete,
    isDeleteLoading,
    isVisibleModal,
    onChangeVisibleModal,
    isAuthor,
    date,
    title,
    tags,
    isLike,
    likeCount,
    content,
    author,
    onLike,
    isLikeLoading,
}: Props) => {
    return (
        <>
            <Container>
                {isAuthor && (
                    <ButtonWrapper>
                        <TextButton fontSize={'1.6rem'} color={colors.grey9} onClick={onModify}>
                            수정
                        </TextButton>
                        <HorizontalGap />
                        <TextButton
                            fontSize={'1.6rem'}
                            color={colors.red}
                            disabled={isDeleteLoading}
                            onClick={onChangeVisibleModal}
                        >
                            삭제
                        </TextButton>
                    </ButtonWrapper>
                )}
                <section>
                    <Wrapper>
                        <Text>{date}</Text>
                        <Btn
                            disabled={isLikeLoading}
                            onClick={(e) => {
                                onLike(isLike);
                            }}
                        >
                            <LikeIcon isLike={isLike} />
                            <span>{likeCount}</span>
                        </Btn>
                    </Wrapper>
                    <MarginView size={'25px'} />
                    <Title>{title}</Title>
                    <TagWrapper>
                        {tags.map((tag) => {
                            return <p key={`tag-${tag.id}`}>{tag.title}</p>;
                        })}
                    </TagWrapper>

                    <MarginView size={'52px'} />
                </section>
                <div
                    className="recipePost"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(content, {
                            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'ins', 'del']),
                            allowedAttributes: {
                                '*': ['class', 'style'],
                                img: ['src', 'alt', 'draggable'],
                                a: ['href', 'rel', 'target'],
                            },
                        }),
                    }}
                />
                <ProfileContainer>
                    <Img
                        src={author.profileImageUrl ? author.profileImageUrl : commonImages.defaultProfile.uri}
                        alt="profileImg"
                        width={96}
                        height={96}
                    />
                    <AuthorProfile>
                        <Nickname>{author.nickname}</Nickname>
                        {author.introduction && <Intro>introcution</Intro>}
                    </AuthorProfile>
                </ProfileContainer>
            </Container>
            {isVisibleModal && (
                <CheckConfirmModal
                    isVisibleModal={isVisibleModal}
                    onChangeVisibleModal={onChangeVisibleModal}
                    onClick={onDelete}
                    isLoading={isDeleteLoading}
                    title="정말로 삭제하시겠습니까?"
                />
            )}
        </>
    );
};

const Container = styled.article`
    max-width: 840px;
    margin: 0 auto;
    padding: 5% 30px 0;
    @media only screen and (max-width: ${TabletSize}) {
        max-width: 748px;
        padding: 5% 20px 0;
    }
    @media only screen and (max-width: ${MobileSize}) {
        max-width: 414px;
        padding: 5% 16px 0;
    }
    @media only screen and (max-width: 414px) {
        max-width: 335px;
        padding: 5% 0 0;
    }

    .recipePost p {
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 16px;
            line-height: 1.2em;
        }
    }

    .recipePost h1 {
        font-weight: 600;
        font-size: 40px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 24px;
            line-height: 1.2em;
        }
    }

    .recipePost h2 {
        font-weight: 600;
        font-size: 32px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 24px;
            line-height: 1.2em;
        }
    }

    .recipePost blockquote {
        padding-left: 9px;
        margin-left: 25px;
        border-left: 3px solid #6b6b6b;
        font-weight: 300;
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 16px;
            line-height: 1.2em;
            margin-left: 15px;
        }
    }

    .recipePost a {
        text-decoration-line: underline;
        word-break: break-all;
    }

    .recipePost strong {
        font-weight: 500;
    }

    .recipePost em {
        font-style: italic;
    }
    .recipePost ins {
        text-decoration: underline;
    }
    .recipePost del {
        text-decoration: line-through;
    }

    .recipePost ul {
        margin: 16px 0;
        padding: 0;
    }

    .recipePost ol {
        margin: 16px 0;
        padding: 0;
    }

    .recipePost ul > li {
        list-style-type: disc;
        margin-left: 1.5em;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        min-height: 16px;
        padding-left: 0.2em;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 16px;
            line-height: 19px;
        }
    }

    .recipePost ol > li {
        list-style-type: decimal;
        margin-left: 1.5em;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        min-height: 16px;
        padding-left: 0.2em;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 16px;
            line-height: 19px;
        }
    }

    .recipePost .ql-align-right {
        text-align: right;
    }
    .recipePost .ql-align-center {
        text-align: center;
    }
    .recipePost .ql-align-justify {
        text-align: justify;
    }

    .recipePost .recipe-image {
        display: block;
        width: 100%;
        height: auto;
        padding: 0;
    }
    .recipePost .recipe-image:hover {
        border-radius: unset;
        cursor: unset;
        filter: unset;
        -webkit-filter: unset;
    }
`;

const ButtonWrapper = styled.section`
    display: flex;
    align-items: center;
`;
const HorizontalGap = styled.div`
    width: 1px;
    height: 16px;
    margin: 0 4px;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Btn = styled.button`
    display: flex;
    align-items: center;
    & span {
        font-size: 1.5rem;
        font-weight: 200;
        color: ${colors.black200};
        padding-left: 6px;
    }
`;
const Title = styled.h1`
    font-weight: 600;
    font-size: 4rem;
    line-height: 5.6rem;
    letter-spacing: -0.03em;
    color: ${colors.black};
    white-space: pre-line;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 2.4rem;
        line-height: 2.9rem;
    }
`;

const Text = styled.span`
    font-weight: 300;
    font-size: 2.4rem;
    line-height: 3.4rem;
    letter-spacing: -0.03em;
    color: ${colors.grey0};
    white-space: pre-line;

    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.6rem;
        line-height: 1.9rem;
    }
`;

const TagWrapper = styled.div`
    padding: 0 16px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 40px;
    &::-webkit-scrollbar {
        display: none;
    }
    & p {
        flex: 0 0 auto;
        margin-right: 10px;
        font-size: 1.6rem;
        line-height: 1;
        padding: 8px 10px;
        border-radius: 16px;
        color: ${colors.sandyBrown};
        background-color: ${colors.grey8};
    }
`;

const MarginView = styled.div<{ size: string }>`
    width: 100%;
    height: ${(props) => props.size};
`;

const ProfileContainer = styled.section`
    padding: 32px 0;
    border-bottom: 1px solid ${colors.grey9};
    display: flex;
    align-items: center;
`;
const Img = styled(Image)`
    border-radius: 50%;
    @media only screen and (max-width: ${MobileSize}) {
        width: 40px;
        height: 40px;
    }
`;
const AuthorProfile = styled.div`
    margin-left: 16px;
`;
const Nickname = styled.p`
    font-size: 1.8rem;
    line-height: 2.7rem;
    color: ${colors.black};
    font-weight: 700;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.4rem;
    }
`;

const Intro = styled.p`
    margin-top: 16px;
    font-size: 1.6rem;
    line-height: 2rem;
    color: ${colors.grey9};
    @media only screen and (max-width: ${MobileSize}) {
        margin-top: 8px;
        font-size: 1.2rem;
    }
`;

export default ContentView;

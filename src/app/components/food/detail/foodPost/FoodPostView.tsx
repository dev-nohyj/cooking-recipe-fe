import { colors } from '@/asset/colors';
import { MobileSize } from '@/asset/const/deviceSize';
import Image from 'next/image';
import { styled } from 'styled-components';
import { TextButton } from '../../../shared/button/TextButton';
import LikeIcon from '../../../../../../public/svg/LikeIcon';
import ImageSlide from '../ImageSlide';
import { TagItem, TagWrapper } from '../../forms/FoodForm.style';
import CheckConfirmModal from '../../../shared/modal/CheckConfirmModal';
import { nanoid } from 'nanoid';
import { commonImages } from '../../../../../../public/images';
import { TGetFoodPostDetailData } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';

interface Props {
    data: TGetFoodPostDetailData;
    isAuthor: boolean;
    onModify: () => void;
    isDeleteLoading: boolean;
    onChangeVisibleModal: () => void;
    isLikeLoading: boolean;
    onLike: (foodPostId: number, likeType: boolean) => void;
    isVisibleModal: boolean;
    onDelete: () => void;
}

const FoodPostView = ({
    data,
    isAuthor,
    onModify,
    isDeleteLoading,
    onChangeVisibleModal,
    isLikeLoading,
    onLike,
    isVisibleModal,
    onDelete,
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
                <LikeWrapper>
                    <Btn
                        disabled={isLikeLoading}
                        onClick={() => {
                            onLike(data.id, data.isLike);
                        }}
                    >
                        <LikeIcon isLike={data.isLike} />
                        <span>{data.likeCount}</span>
                    </Btn>
                </LikeWrapper>
                <ImageSlide foodImages={data.foodImages} />
                {data.description && <Desc>{data.description}</Desc>}
                <ProfileContainer>
                    <Img
                        src={
                            data.author.profileImageUrl ? data.author.profileImageUrl : commonImages.defaultProfile.uri
                        }
                        alt="profileImg"
                        width={96}
                        height={96}
                    />
                    <AuthorProfile>
                        <Nickname>{data.author.nickname}</Nickname>
                        {data.author.introduction && <Intro>{data.author.introduction}</Intro>}
                    </AuthorProfile>
                </ProfileContainer>
                {data.tags.length > 0 && (
                    <>
                        <Nickname>관련 태그</Nickname>

                        <TagWrapper>
                            {data.tags.map((v) => {
                                return <TagItem key={`tag-${nanoid(6)}`}>{v.title}</TagItem>;
                            })}
                        </TagWrapper>
                    </>
                )}
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
    max-width: 1024px;
    margin: 0 auto;
    padding: 32px 16px;
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
const LikeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const Btn = styled.button`
    display: flex;
    & span {
        font-size: 1.5rem;
        font-weight: 200;
        color: ${colors.black200};
        padding-left: 6px;
    }
`;

const Desc = styled.p`
    margin: 32px 0;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: ${colors.black200};
    white-space: pre-line;
    word-wrap: break-word;
`;
const ProfileContainer = styled.section`
    padding: 32px 0;
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

export default FoodPostView;

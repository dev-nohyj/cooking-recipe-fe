import { colors } from '@/asset/colors';
import { TextButton } from '../../../shared/button/TextButton';
import LikeIcon from '../../../../../../public/svg/LikeIcon';
import ImageSlide from '../ImageSlide';
import CheckConfirmModal from '../../../shared/modal/CheckConfirmModal';
import { nanoid } from 'nanoid';
import { commonImages } from '../../../../../../public/images';
import { TGetFoodPostDetailData } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
import { Dispatch } from 'react';
import {
    AuthorProfile,
    Btn,
    ButtonWrapper,
    Container,
    Desc,
    HorizontalGap,
    Intro,
    LikeWrapper,
    Nickname,
    ProfileContainer,
    ProfileImg,
    TagWrapper,
} from '../FoodDetail.style';

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
    thumbsSwiper: any;
    setThumbsSwiper: Dispatch<any>;
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
    thumbsSwiper,
    setThumbsSwiper,
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
                <ImageSlide
                    foodImages={data.foodImages}
                    thumbsSwiper={thumbsSwiper}
                    setThumbsSwiper={setThumbsSwiper}
                />
                {data.description && <Desc>{data.description}</Desc>}
                <ProfileContainer>
                    <ProfileImg
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
                                return <p key={`tag-${nanoid(6)}`}>{v.title}</p>;
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

export default FoodPostView;

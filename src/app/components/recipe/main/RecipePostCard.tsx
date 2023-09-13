import { TRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { colors } from '@/asset/colors';
import { blurDataURL } from '@/asset/const/blurUrl';
import Image from 'next/image';
import { styled } from 'styled-components';
import LikeIcon from '../../../../../public/svg/LikeIcon';
import { commonImages } from '../../../../../public/images';
import { convertTime } from '@/app/utils/convertTime';

interface Props {
    data: TRecipePostData;
    onDetail: (id: number) => void;
    onLike: (recipePostId: number, likeType: boolean) => void;
    isLikeLoading: boolean;
}

const RecipePostCard = ({ data, onDetail, onLike, isLikeLoading }: Props) => {
    const { id, thumbnailUrl, title, author, isLike, likeCount, createdAt } = data;
    return (
        <Card
            onClick={() => {
                onDetail(id);
            }}
        >
            <Img
                src={thumbnailUrl}
                alt={`thumbnail-${id}`}
                width={300}
                height={180}
                placeholder="blur"
                blurDataURL={blurDataURL}
            />

            <Content>
                <Title>{title}</Title>
                <Date>{convertTime(createdAt)}</Date>
                <BottomWrapper>
                    <UserInfo>
                        <ProfileImage
                            width={24}
                            height={24}
                            src={author.profileImageUrl ? author.profileImageUrl : commonImages.defaultProfileSm.uri}
                            alt="profileImage"
                        />
                        <span>{author.nickname}</span>
                    </UserInfo>
                    <Btn
                        disabled={isLikeLoading}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike(id, isLike);
                        }}
                    >
                        <LikeIcon isLike={isLike} />
                        <span>{likeCount}</span>
                    </Btn>
                </BottomWrapper>
            </Content>
        </Card>
    );
};
const Card = styled.div`
    width: 300px;
    flex: 0 0 auto;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const Img = styled(Image)`
    width: 100%;
    object-fit: none;
    border-radius: 12px;
`;
const Content = styled.div`
    margin-top: 10px;
    padding: 0 4px;
`;

const Title = styled.p`
    margin: 4px 0;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.05em;
    font-weight: 600;
    color: ${colors.black};
    overflow: hidden;
    text-overflow: ellipsis;
`;
const Date = styled.p`
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1;
    color: ${colors.grey0};
    white-space: pre-line;
    text-align: end;
`;
const BottomWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const UserInfo = styled.div`
    font-weight: 200;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.05em;
    color: ${colors.black};
    display: flex;
    align-items: center;
    & span {
        margin-left: 5px;
    }
`;
const ProfileImage = styled(Image)`
    border-radius: 50%;
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

export default RecipePostCard;

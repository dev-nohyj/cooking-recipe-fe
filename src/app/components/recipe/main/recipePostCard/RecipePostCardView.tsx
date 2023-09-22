import { blurDataURL } from '@/asset/const/blurUrl';
import { BottomWrapper, Btn, Card, Content, Date, Img, ProfileImage, Title, UserInfo } from '../RecipeMain.style';
import LikeIcon from '../../../../../../public/svg/LikeIcon';
import { TRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { convertTime } from '@/app/utils/convertTime';
import { commonImages } from '../../../../../../public/images';
import { MouseEvent } from 'react';

interface Props {
    onDetail: () => void;
    data: TRecipePostData;
    onLike: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    isLikeLoading: boolean;
}

const RecipePostCardView = ({ onDetail, data, onLike, isLikeLoading }: Props) => {
    return (
        <Card onClick={onDetail}>
            <Img
                src={data.thumbnailUrl}
                alt={`thumbnail-${data.id}`}
                width={300}
                height={180}
                placeholder="blur"
                blurDataURL={blurDataURL}
            />

            <Content>
                <Title>{data.title}</Title>
                <Date>{convertTime(data.createdAt)}</Date>
                <BottomWrapper>
                    <UserInfo>
                        <ProfileImage
                            width={24}
                            height={24}
                            src={
                                data.author.profileImageUrl
                                    ? data.author.profileImageUrl
                                    : commonImages.defaultProfileSm.uri
                            }
                            alt="profileImage"
                        />
                        <span>{data.author.nickname}</span>
                    </UserInfo>
                    <Btn disabled={isLikeLoading} onClick={onLike}>
                        <LikeIcon isLike={data.isLike} />
                        <span>{data.likeCount}</span>
                    </Btn>
                </BottomWrapper>
            </Content>
        </Card>
    );
};

export default RecipePostCardView;

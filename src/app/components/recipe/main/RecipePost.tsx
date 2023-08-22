import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useLikeRecipePostMutation } from '@/apis/recipePost/mutations/useLikeRecipePostMutation';
import { TGetRecipePostData, TRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { colors } from '@/asset/colors';
import { blurDataURL } from '@/asset/const/blurUrl';
import { LikeTypeLabel } from '@/asset/labels/recipePostLabel';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CSSProperties, useCallback, useMemo } from 'react';
import { styled } from 'styled-components';

interface Props {
    data: TRecipePostData;
}

const RecipePost = ({ data }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();
    const user = cache.getQueryData<TGetProfileData>(GetProfileQueryKey());
    const { id, title, thumbnailUrl, author, isLike, likeCount } = data;

    const onRouter = useCallback(() => {
        router.push(`/recipe/detail/${id}`);
    }, []);
    const imageStyle = useMemo(() => {
        return { borderRadius: '12px' } as CSSProperties;
    }, []);
    const { mutate, isLoading } = useLikeRecipePostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (_, variables) => {
            // detail cache

            cache.setQueriesData<InfiniteData<TGetRecipePostData>>(['recipeList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.recipePostList.forEach((item) => {
                                if (item.id === variables.recipePostId) {
                                    if (variables.likeType === LikeTypeLabel.like) {
                                        item.isLike = true;
                                        item.likeCount = item.likeCount + 1;
                                    } else {
                                        item.isLike = false;
                                        item.likeCount = item.likeCount - 1;
                                    }
                                }
                            });
                        });
                    });
                    return newData;
                }
            });
        },
    });
    const onLike = useCallback(() => {
        // check auth
        if (!user?.profile) {
            return alert('로그인이 필요합니다.');
        }
        mutate({
            recipePostId: data.id,
            likeType: data.isLike ? LikeTypeLabel.unLike : LikeTypeLabel.like,
        });
    }, [data.id, data.isLike, user?.profile]);
    return (
        <Card onClick={onRouter}>
            <Img
                src={thumbnailUrl}
                alt={`thumbnail-${id}`}
                width={300}
                height={180}
                style={imageStyle}
                placeholder="blur"
                blurDataURL={blurDataURL}
            />
            <Content>
                <Title>{title}</Title>
                <BottomWrapper>
                    <UserInfo>
                        {/* {author.profileImageUrl && image} */}
                        <span>{author.nickname}</span>
                    </UserInfo>
                    <button
                        disabled={isLoading}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike();
                        }}
                    >
                        {isLike ? 'unLike' : 'like'} {likeCount}
                    </button>
                    {/* <CopyToClipboard text={``} onCopy={onCopy}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <ClipboardIcon />
                        </button>
                    </CopyToClipboard> */}
                </BottomWrapper>
            </Content>
        </Card>
    );
};
const Card = styled.div`
    width: 300px;
    flex: 0 0 auto;
    cursor: pointer;
`;
const Img = styled(Image)`
    width: 100%;
    height: auto;
`;
const Content = styled.div`
    margin-top: 10px;
    padding: 0 4px;
`;

const Title = styled.p`
    margin: 4px 0 16px;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.05em;
    font-weight: 600;
    color: ${colors.black};
    overflow: hidden;
    text-overflow: ellipsis;
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

export default RecipePost;

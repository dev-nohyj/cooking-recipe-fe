import { TRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import { styled } from 'styled-components';
import RecipePostCard from './RecipePostCard';
import LoadingRecipePostList from './LoadingRecipePostList';
import EmptyList from '../../shared/layouts/EmptyList';
import { FloatingButton } from '../../shared/button/FloatingButton';
import WriteIcon from '../../../../../public/svg/WriteIcon';

interface Props {
    recipePostList: TRecipePostData[];
    hasMore: boolean;
    fetchNextPage: () => void;
    onCreate: () => void;
    onDetail: (id: number) => void;
    onLike: (recipePostId: number, likeType: boolean) => void;
    isLoading: boolean;
    isLikeLoading: boolean;
    isLogin: boolean;
}

const RecipeList = ({
    recipePostList,
    hasMore,
    fetchNextPage,
    onCreate,
    onDetail,
    onLike,
    isLoading,
    isLikeLoading,
    isLogin,
}: Props) => {
    if (isLoading) return <LoadingRecipePostList />;
    if (recipePostList.length === 0)
        return (
            <EmptyList
                title={'게시물이 존재하지 않습니다.'}
                desc={'게시물을 추가해서 나만의 레시피를 공유해세요!'}
                onCreate={onCreate}
            />
        );

    return (
        <>
            <InfiniteScroll dataLength={recipePostList.length} next={fetchNextPage} hasMore={hasMore} loader={<></>}>
                <Container>
                    {recipePostList.map((recipePost) => {
                        return (
                            <RecipePostCard
                                key={`recipePost-${recipePost.id}`}
                                data={recipePost}
                                onDetail={onDetail}
                                onLike={onLike}
                                isLikeLoading={isLikeLoading}
                            />
                        );
                    })}
                </Container>
            </InfiniteScroll>
            {isLogin && (
                <FloatingButton onClick={onCreate}>
                    <WriteIcon />
                </FloatingButton>
            )}
        </>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 35px;
    max-width: 1024px;
    margin: 0 auto;
    gap: 24px;
    @media only screen and (max-width: 1024px) {
        max-width: 694px;
    }
    @media only screen and (max-width: 693px) {
        justify-content: center;
    }
`;

export default RecipeList;

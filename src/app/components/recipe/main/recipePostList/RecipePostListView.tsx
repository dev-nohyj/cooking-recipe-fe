import { TRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingRecipePostList from './LoadingRecipePostList';
import EmptyList from '@/app/components/shared/layouts/EmptyList';
import { PostListWrapper } from '../RecipeMain.style';
import { FloatingButton } from '@/app/components/shared/button/FloatingButton';
import WriteIcon from '../../../../../../public/svg/WriteIcon';
import RecipePostCard from '../recipePostCard';

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

const RecipeListView = ({
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
                <PostListWrapper>
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
                </PostListWrapper>
            </InfiniteScroll>
            {isLogin && (
                <FloatingButton onClick={onCreate}>
                    <WriteIcon />
                </FloatingButton>
            )}
        </>
    );
};

export default RecipeListView;

'use client';
import { TRecipePostData, useGetRecipePostQuery } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { styled } from 'styled-components';
import RecipePost from './RecipePost';
import LoadingRecipePostList from './LoadingRecipePostList';

interface Props {
    category: ValueOf<typeof RecipePostCategoryLabel> | undefined;
}

const RecipeList = ({ category }: Props) => {
    const { data, fetchNextPage, isLoading, error } = useGetRecipePostQuery({ category }, { keepPreviousData: true });

    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const { recipePostList, hasMore } = useMemo(() => {
        if (!data || data.pages[0].recipePostList.length === 0) return { recipePostList: [], hasMore: false };
        let recipePostList: TRecipePostData[] = [];
        data.pages.forEach((list) => {
            recipePostList = [...recipePostList, ...list.recipePostList];
        });
        return { recipePostList, hasMore: data.pages[data.pages.length - 1].hasMore };
    }, [data?.pages]);

    if (isLoading || error) return <LoadingRecipePostList />;
    if (recipePostList.length === 0) return <>empty list</>;
    return (
        <InfiniteScroll dataLength={recipePostList.length} next={fetchNextPage} hasMore={hasMore} loader={<></>}>
            <Container>
                {recipePostList.map((v) => {
                    return <RecipePost key={`recipePost-${v.id}`} data={v} />;
                })}
            </Container>
        </InfiniteScroll>
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

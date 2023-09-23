import { FloatingButton } from '../../shared/button/FloatingButton';
import WriteIcon from '../../../../../public/svg/WriteIcon';
import EmptyList from '../../shared/layouts/EmptyList';
import { TFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import { nanoid } from 'nanoid';
import FoodPostCard from './foodPostCard';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { Container } from './FoodMain.style';

interface Props {
    isLoading: boolean;
    foodPostList: TFoodPostData[];
    onCreate: () => void;
    fetchNextPage: () => void;
    hasMore: boolean;
    isLogin: boolean;
}

const FoodList = ({ isLoading, foodPostList, onCreate, fetchNextPage, hasMore, isLogin }: Props) => {
    if (isLoading) return <></>;
    if (foodPostList.length === 0) {
        return (
            <EmptyList
                title={'게시물이 존재하지 않습니다.'}
                desc={'게시물을 추가해서 음식 사진을 공유해세요!'}
                onCreate={onCreate}
                isLogin={isLogin}
            />
        );
    }

    return (
        <Container>
            {isLogin && (
                <FloatingButton onClick={onCreate}>
                    <WriteIcon />
                </FloatingButton>
            )}

            <InfiniteScroll dataLength={foodPostList.length} next={fetchNextPage} hasMore={hasMore} loader={<></>}>
                <MasonryInfiniteGrid align="center" gap={15}>
                    {foodPostList.map((foodPost) => {
                        return <FoodPostCard key={nanoid(6)} data={foodPost} />;
                    })}
                </MasonryInfiniteGrid>
            </InfiniteScroll>
        </Container>
    );
};

export default FoodList;

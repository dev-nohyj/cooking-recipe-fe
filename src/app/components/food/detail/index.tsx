import { cookies } from 'next/headers';
import getQueryClient from '@/config/reactQuery/getQueryClient';
import { GetFoodPostDetailQueryFn, GetFoodPostDetailQueryKey } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/config/reactQuery/hydrate.client';
import FoodPost from './foodPost';

interface Props {
    foodPostId: number;
}

const Main = async ({ foodPostId }: Props) => {
    const cookie = cookies().toString();
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(GetFoodPostDetailQueryKey({ foodPostId }), () =>
        GetFoodPostDetailQueryFn({ foodPostId }, cookie),
    );

    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrateOnClient state={dehydratedState}>
            <FoodPost foodPostId={foodPostId} />
        </HydrateOnClient>
    );
};

export default Main;

import { redirect } from 'next/navigation';
import Main from './Main';
import { cookies } from 'next/headers';
import getQueryClient from '@/config/reactQuery/getQueryClient';
import { GetFoodPostDetailQueryFn, GetFoodPostDetailQueryKey } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/config/reactQuery/hydrate.client';

interface Props {
    foodPostId: number;
}

const HydratedModifyFoodPost = async ({ foodPostId }: Props) => {
    if (foodPostId === 0 || typeof foodPostId !== 'number' || isNaN(foodPostId)) {
        redirect('/food');
    }
    const cookie = cookies().toString();
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(GetFoodPostDetailQueryKey({ foodPostId }), () =>
        GetFoodPostDetailQueryFn({ foodPostId }, cookie),
    );
    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrateOnClient state={dehydratedState}>
            <Main foodPostId={foodPostId} />
        </HydrateOnClient>
    );
};

export default HydratedModifyFoodPost;

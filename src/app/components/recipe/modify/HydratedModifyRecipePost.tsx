import { RecipePostDetailQueryFn, RecipePostDetailQueryKey } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import getQueryClient from '@/config/reactQuery/getQueryClient';
import HydrateOnClient from '@/config/reactQuery/hydrate.client';
import { dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

interface Props {
    recipePostId: number;
}
const Main = dynamic(() => import('@/app/components/recipe/modify/Main'), {
    ssr: false,
});

const HydratedModifyRecipePost = async ({ recipePostId }: Props) => {
    if (recipePostId === 0 || typeof recipePostId !== 'number' || isNaN(recipePostId)) {
        redirect('/recipe');
    }
    const cookie = cookies().toString();
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(RecipePostDetailQueryKey({ recipePostId }), () =>
        RecipePostDetailQueryFn({ recipePostId }, cookie),
    );
    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrateOnClient state={dehydratedState}>
            <Main recipePostId={recipePostId} />
        </HydrateOnClient>
    );
};

export default HydratedModifyRecipePost;

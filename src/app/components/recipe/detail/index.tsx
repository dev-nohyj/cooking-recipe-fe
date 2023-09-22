import { cookies } from 'next/headers';
import getQueryClient from '@/config/reactQuery/getQueryClient';
import { RecipePostDetailQueryFn, RecipePostDetailQueryKey } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/config/reactQuery/hydrate.client';
import RecipePost from './RecipePost';

interface Props {
    recipePostId: number;
}

const Main = async ({ recipePostId }: Props) => {
    const cookie = cookies().toString();
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(RecipePostDetailQueryKey({ recipePostId }), () =>
        RecipePostDetailQueryFn({ recipePostId }, cookie),
    );

    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrateOnClient state={dehydratedState}>
            <RecipePost recipePostId={recipePostId} />
        </HydrateOnClient>
    );
};

export default Main;

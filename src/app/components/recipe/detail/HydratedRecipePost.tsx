import { RecipePostDetailQueryFn, RecipePostDetailQueryKey } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import getQueryClient from '@/config/reactQuery/getQueryClient';
import HydrateOnClient from '@/config/reactQuery/hydrate.client';
import { dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import RecipePost from './RecipePost';

interface Props {
    recipePostId: number;
}

const HydratedRecipePost = async ({ recipePostId }: Props) => {
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

export default HydratedRecipePost;

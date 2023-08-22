import HydratedModifyRecipePost from '@/app/components/recipe/modify/HydratedModifyRecipePost';
import dynamic from 'next/dynamic';

interface Props {
    searchParams: { recipePostId: string };
}
const Main = dynamic(() => import('@/app/components/recipe/create/Main'), {
    ssr: false,
});

const RecipeWritePage = ({ searchParams: { recipePostId } }: Props) => {
    if (recipePostId) {
        return <HydratedModifyRecipePost recipePostId={parseInt(recipePostId)} />;
    }
    return <Main />;
};

export default RecipeWritePage;

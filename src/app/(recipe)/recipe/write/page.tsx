import ModifyMain from '@/app/components/recipe/modify/HydratedModifyRecipePost';
import dynamic from 'next/dynamic';

interface Props {
    searchParams: { recipePostId: string };
}
const CreateMain = dynamic(() => import('@/app/components/recipe/create'), {
    ssr: false,
});

const RecipeWritePage = ({ searchParams: { recipePostId } }: Props) => {
    if (recipePostId) {
        return <ModifyMain recipePostId={parseInt(recipePostId)} />;
    }
    return <CreateMain />;
};

export default RecipeWritePage;

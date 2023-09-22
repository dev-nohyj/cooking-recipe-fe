import Main from '@/app/components/recipe/detail';
import { redirect } from 'next/navigation';

interface Props {
    params: { recipePostId: string };
}

const RecipeDetailPage = ({ params: { recipePostId } }: Props) => {
    if (parseInt(recipePostId) === 0 || typeof parseInt(recipePostId) !== 'number' || isNaN(parseInt(recipePostId))) {
        redirect('/recipe');
    }
    return <Main recipePostId={parseInt(recipePostId)} />;
};

export default RecipeDetailPage;

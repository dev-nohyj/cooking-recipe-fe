import ModifyMain from '@/app/components/recipe/modify/HydratedModifyRecipePost';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: { recipePostId: string };
}
const CreateMain = dynamic(() => import('@/app/components/recipe/create'), {
    ssr: false,
});

const RecipeWritePage = ({ searchParams: { recipePostId } }: Props) => {
    const cookie = cookies().get(process.env.COOKIE as string);
    if (!cookie) {
        redirect('/');
    }
    if (recipePostId) {
        return <ModifyMain recipePostId={parseInt(recipePostId)} />;
    }
    return <CreateMain />;
};

export default RecipeWritePage;

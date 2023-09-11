import Main from '@/app/components/recipe/main/Main';
import { CategoryAllType, RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: { type: keyof typeof RecipePostCategoryLabel | undefined };
}

const RecipeMainPage = ({ searchParams: { type } }: Props) => {
    if (!CategoryAllType.includes(type)) {
        redirect('/recipe');
    }
    const category = typeof type === 'undefined' ? undefined : RecipePostCategoryLabel[type];

    return <Main category={category} />;
};

export default RecipeMainPage;

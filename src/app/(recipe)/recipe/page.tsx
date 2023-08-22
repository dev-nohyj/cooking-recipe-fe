import Main from '@/app/components/recipe/main/Main';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: { type: keyof typeof RecipePostCategoryLabel | undefined };
}

const RecipeMainPage = ({ searchParams: { type } }: Props) => {
    const allType = ['korean', 'chinese', 'japanese', 'western', 'etc', undefined];
    if (!allType.includes(type)) {
        redirect('/recipe');
    }
    return <Main type={type} />;
};

export default RecipeMainPage;

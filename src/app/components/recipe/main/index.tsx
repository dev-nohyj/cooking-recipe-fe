'use client';

import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import RecipeCategory from './recipeCategory';
import { Container } from './RecipeMain.style';
import RecipePostList from './recipePostList';

interface Props {
    category: ValueOf<typeof RecipePostCategoryLabel> | undefined;
}

const Main = ({ category }: Props) => {
    return (
        <Container>
            <RecipeCategory category={category} />
            <RecipePostList category={category} />
        </Container>
    );
};

export default Main;

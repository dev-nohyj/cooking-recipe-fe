'use client';

import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import RecipeCategory from './RecipeCategory';
import { styled } from 'styled-components';
import RecipePost from './RecipePost';

interface Props {
    category: ValueOf<typeof RecipePostCategoryLabel> | undefined;
}

const Main = ({ category }: Props) => {
    return (
        <Container>
            <RecipeCategory category={category} />
            <RecipePost category={category} />
        </Container>
    );
};

const Container = styled.section`
    max-width: 1024px;
    margin: 0 auto;
    padding-bottom: 5%;
`;

export default Main;

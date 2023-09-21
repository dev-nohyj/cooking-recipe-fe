'use client';

import { styled } from 'styled-components';
import Banner from './Banner';
import FoodList from './foodList';
import RecipeBot from './recipeBot';
import RecipeList from './recipeList';

interface Props {}

const Main = ({}: Props) => {
    return (
        <Container>
            <Banner />
            <RecipeList />
            <RecipeBot />
            <FoodList />
        </Container>
    );
};

const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 32px 32px;
`;

export default Main;

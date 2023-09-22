'use client';
import Banner from './Banner';
import FoodList from './foodList';
import RecipeBot from './recipeBot';
import RecipeList from './recipeList';
import { HomeContainer } from './Home.style';

interface Props {}

const Main = ({}: Props) => {
    return (
        <HomeContainer>
            <Banner />
            <RecipeList />
            <RecipeBot />
            <FoodList />
        </HomeContainer>
    );
};

export default Main;

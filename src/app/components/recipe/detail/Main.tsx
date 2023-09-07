import HydratedRecipePost from './HydratedRecipePost';

interface Props {
    recipePostId: number;
}

const Main = ({ recipePostId }: Props) => {
    return <HydratedRecipePost recipePostId={recipePostId} />;
};

export default Main;

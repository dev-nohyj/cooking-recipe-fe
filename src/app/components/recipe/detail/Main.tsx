import HydratedRecipePost from './HydratedRecipePost';

interface Props {
    recipePostId: number;
}

const Main = ({ recipePostId }: Props) => {
    return (
        <main>
            <HydratedRecipePost recipePostId={recipePostId} />
        </main>
    );
};

export default Main;

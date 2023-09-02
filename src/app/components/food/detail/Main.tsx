import HydratedFoodPost from './HydratedFoodPost';

interface Props {
    foodPostId: number;
}

const Main = ({ foodPostId }: Props) => {
    return (
        <main>
            <HydratedFoodPost foodPostId={foodPostId} />
        </main>
    );
};

export default Main;

import HydratedFoodPost from './HydratedFoodPost';

interface Props {
    foodPostId: number;
}

const Main = ({ foodPostId }: Props) => {
    return <HydratedFoodPost foodPostId={foodPostId} />;
};

export default Main;

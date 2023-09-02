import Main from '@/app/components/food/create/Main';
import HydratedModifyFoodPost from '@/app/components/food/modify/HydratedModifyFoodPost';

interface Props {
    searchParams: { foodPostId: string };
}

const FoodWritePage = ({ searchParams: { foodPostId } }: Props) => {
    if (foodPostId) {
        return <HydratedModifyFoodPost foodPostId={parseInt(foodPostId)} />;
    }
    return <Main />;
};

export default FoodWritePage;

import CreateMain from '@/app/components/food/create';
import ModifyMain from '@/app/components/food/modify/HydratedModifyFoodPost';

interface Props {
    searchParams: { foodPostId: string };
}

const FoodWritePage = ({ searchParams: { foodPostId } }: Props) => {
    if (foodPostId) {
        return <ModifyMain foodPostId={parseInt(foodPostId)} />;
    }
    return <CreateMain />;
};

export default FoodWritePage;

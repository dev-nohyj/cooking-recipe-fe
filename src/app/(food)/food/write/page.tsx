import CreateMain from '@/app/components/food/create';
import ModifyMain from '@/app/components/food/modify/HydratedModifyFoodPost';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: { foodPostId: string };
}

const FoodWritePage = ({ searchParams: { foodPostId } }: Props) => {
    const cookie = cookies().get(process.env.COOKIE as string);
    if (!cookie) {
        redirect('/');
    }
    if (foodPostId) {
        return <ModifyMain foodPostId={parseInt(foodPostId)} />;
    }
    return <CreateMain />;
};

export default FoodWritePage;

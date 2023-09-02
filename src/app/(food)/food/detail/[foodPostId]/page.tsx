import Main from '@/app/components/food/detail/Main';
import { redirect } from 'next/navigation';

interface Props {
    params: { foodPostId: string };
}

const RecipeDetailPage = ({ params: { foodPostId } }: Props) => {
    if (parseInt(foodPostId) === 0 || typeof parseInt(foodPostId) !== 'number' || isNaN(parseInt(foodPostId))) {
        redirect('/food');
    }
    return <Main foodPostId={parseInt(foodPostId)} />;
};

export default RecipeDetailPage;

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import FoodListView from './FoodListView';
import { useGetPopularFoodPostQuery } from '@/apis/foodPost/queries/useGetPopularFoodPostQuery';

interface Props {}

const FoodList = ({}: Props) => {
    const router = useRouter();
    const onRouteFood = useCallback(() => {
        router.push('/recipe');
    }, []);

    const { data, isLoading, error } = useGetPopularFoodPostQuery();

    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const props = {
        onRouteFood,
        data,
        isLoading,
    };
    return <FoodListView {...props} />;
};

export default FoodList;

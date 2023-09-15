import { TFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import FoodPostCardView from './FoodPostCardView';
import { useHoverGetId } from '@/app/hooks/useHoverGetId';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    data: TFoodPostData;
}

const FoodPostCard = ({ data }: Props) => {
    const router = useRouter();

    const onDetail = useCallback((id: number) => {
        router.push(`/food/detail/${id}`);
    }, []);

    const [targetVisibleId, onMouseEnter, onMouseLeave] = useHoverGetId();

    const props = {
        onDetail,
        data,
        targetVisibleId,
        onMouseEnter,
        onMouseLeave,
    };
    return <FoodPostCardView {...props} />;
};

export default FoodPostCard;

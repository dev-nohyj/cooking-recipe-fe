import { TFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import FoodPostCardView from './FoodPostCardView';
import { useHoverGetId } from '@/app/hooks/useHoverGetId';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    data: TFoodPostData;
    isImgSize?: boolean;
}

const FoodPostCard = ({ data, isImgSize }: Props) => {
    const router = useRouter();

    const onDetail = useCallback((id: number) => {
        router.push(`/food/detail/${id}`);
    }, []);

    const [targetVisibleId, onMouseEnter, onMouseLeave] = useHoverGetId();

    const props = {
        onDetail: () => {
            onDetail(data.id);
        },
        data,
        targetVisibleId,
        onMouseEnter: () => {
            onMouseEnter(data.id);
        },
        onMouseLeave,
        isImgSize,
    };
    return <FoodPostCardView {...props} />;
};

export default FoodPostCard;

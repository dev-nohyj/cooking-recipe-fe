import { TRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { MouseEvent } from 'react';
import RecipePostCardView from './RecipePostCardView';

interface Props {
    data: TRecipePostData;
    onDetail: (id: number) => void;
    onLike: (recipePostId: number, likeType: boolean) => void;
    isLikeLoading: boolean;
}

const RecipePostCard = ({ data, onDetail, onLike, isLikeLoading }: Props) => {
    const props = {
        onDetail: () => {
            onDetail(data.id);
        },
        data,
        onLike: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
            e.stopPropagation();
            onLike(data.id, data.isLike);
        },
        isLikeLoading,
    };

    return <RecipePostCardView {...props} />;
};

export default RecipePostCard;

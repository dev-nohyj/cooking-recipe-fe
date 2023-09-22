'use client';

import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { useMemo } from 'react';
import RecipeCategoryView from './RecipeCategoryView';

interface Props {
    category: ValueOf<typeof RecipePostCategoryLabel> | undefined;
}

const RecipeCategory = ({ category }: Props) => {
    const recipePostCategory = useMemo(() => {
        return [
            { href: `/recipe`, label: '전체', isActive: category === undefined },
            {
                href: `/recipe?type=korean`,
                label: '한식',

                isActive: category === RecipePostCategoryLabel.korean,
            },
            {
                href: '/recipe?type=chinese',
                label: '중식',

                isActive: category === RecipePostCategoryLabel.chinese,
            },
            {
                href: '/recipe?type=japanese',
                label: '일식',

                isActive: category === RecipePostCategoryLabel.japanese,
            },
            {
                href: '/recipe?type=western',
                label: '양식',

                isActive: category === RecipePostCategoryLabel.western,
            },
            {
                href: '/recipe?type=etc',
                label: '기타',

                isActive: category === RecipePostCategoryLabel.etc,
            },
        ];
    }, [category]);

    return <RecipeCategoryView recipePostCategory={recipePostCategory} />;
};

export default RecipeCategory;

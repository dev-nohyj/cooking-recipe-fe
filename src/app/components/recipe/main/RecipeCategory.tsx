'use client';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { styled } from 'styled-components';

interface Props {
    category: ValueOf<typeof RecipePostCategoryLabel> | undefined;
}

const RecipeCategory = ({ category }: Props) => {
    const recipePostCategory = [
        { href: `/recipe`, label: '전체', value: undefined },
        { href: `/recipe?type=korean`, label: '한식', value: RecipePostCategoryLabel.korean },
        { href: '/recipe?type=chinese', label: '중식', value: RecipePostCategoryLabel.chinese },
        { href: '/recipe?type=japanese', label: '일식', value: RecipePostCategoryLabel.japanese },
        { href: '/recipe?type=western', label: '양식', value: RecipePostCategoryLabel.western },
        { href: '/recipe?type=etc', label: '기타', value: RecipePostCategoryLabel.etc },
    ];

    return (
        <nav>
            <CategoryList>
                {recipePostCategory.map((item) => {
                    return (
                        <CategoryItem key={`cagtegory-${nanoid(6)}`} isActive={item.value === category}>
                            <Link href={item.href}>{item.label}</Link>
                        </CategoryItem>
                    );
                })}
            </CategoryList>
        </nav>
    );
};

const CategoryList = styled.ul`
    display: flex;
    align-items: center;
`;
const CategoryItem = styled.li<{ isActive: boolean }>`
    ${(props) => props.isActive && { color: 'red' }}
`;

export default RecipeCategory;

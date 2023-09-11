'use client';

import { colors } from '@/asset/colors';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useMemo } from 'react';
import { styled } from 'styled-components';

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

    return (
        <nav>
            <CategoryList>
                {recipePostCategory.map((item) => {
                    return (
                        <li key={`cagtegory-${nanoid(6)}`}>
                            <LinkTo isActive={item.isActive} href={item.href}>
                                {item.label}
                            </LinkTo>
                        </li>
                    );
                })}
            </CategoryList>
        </nav>
    );
};

const CategoryList = styled.ul`
    margin: 24px 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 40px;
    &::-webkit-scrollbar {
        display: none;
    }
    & li {
        flex: 0 0 auto;
        margin-right: 10px;
    }
`;

const LinkTo = styled(Link)<{ isActive: boolean }>`
    font-size: 1.6rem;
    line-height: 1;
    padding: 2px 24px;
    border-radius: 16px;
    color: ${(props) => (props.isActive ? colors.white : colors.sandyBrown)};
    border: 1px solid ${colors.sandyBrown};
    background-color: ${(props) => (props.isActive ? colors.sandyBrown : colors.white)};
    &:hover {
        opacity: 0.8;
    }
`;

export default RecipeCategory;

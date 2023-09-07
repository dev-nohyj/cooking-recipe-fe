'use client';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import RecipeCategory from './RecipeCategory';
import { styled } from 'styled-components';
import { useMemo } from 'react';
import RecipeList from './RecipeList';
import Link from 'next/link';

interface Props {
    type: keyof typeof RecipePostCategoryLabel | undefined;
}

const Main = ({ type }: Props) => {
    const category: ValueOf<typeof RecipePostCategoryLabel> | undefined = useMemo(() => {
        if (typeof type === 'undefined') {
            return undefined;
        } else {
            return RecipePostCategoryLabel[type];
        }
    }, [type]);

    return (
        <Container>
            <div>
                <Link href={'/recipe/write'}>생성</Link>
            </div>
            <RecipeCategory category={category} />
            <RecipeList category={category} />
        </Container>
    );
};

const Container = styled.section`
    max-width: 1024px;
    margin: 0 auto;
`;

export default Main;

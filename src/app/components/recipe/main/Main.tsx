'use client';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import RecipeCategory from './RecipeCategory';
import { styled } from 'styled-components';
import { useCallback, useMemo } from 'react';
import RecipeList from './RecipeList';

import WriteIcon from '../../../../../public/svg/WriteIcon';
import { useRouter } from 'next/navigation';
import { FloatingButton } from '../../shared/button/FloatingButton';

interface Props {
    type: keyof typeof RecipePostCategoryLabel | undefined;
}

const Main = ({ type }: Props) => {
    const router = useRouter();

    const onCreate = useCallback(() => {
        router.push('/recipe/write');
    }, []);

    const category: ValueOf<typeof RecipePostCategoryLabel> | undefined = useMemo(() => {
        if (typeof type === 'undefined') {
            return undefined;
        } else {
            return RecipePostCategoryLabel[type];
        }
    }, [type]);

    return (
        <Container>
            <RecipeCategory category={category} />
            <RecipeList category={category} />
            <FloatingButton onClick={onCreate}>
                <WriteIcon />
            </FloatingButton>
        </Container>
    );
};

const Container = styled.section`
    max-width: 1024px;
    margin: 0 auto;
`;

export default Main;

'use client';

import { styled } from 'styled-components';
import ModifyForm from './ModifyForm';
import { useRecipePostDetailQuery } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { useQueryClient } from '@tanstack/react-query';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface Props {
    recipePostId: number;
}

const Main = ({ recipePostId }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();
    const user = cache.getQueryData<TGetProfileData>(GetProfileQueryKey());
    const { data } = useRecipePostDetailQuery({ recipePostId });

    useLayoutEffect(() => {
        if (!data || user?.profile?.id !== data.authorId) {
            router.replace('/recipe');
        }
    }, []);

    return (
        <Container>
            <ModifyForm recipePostData={data!} />
        </Container>
    );
};

const Container = styled.main`
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
`;

export default Main;

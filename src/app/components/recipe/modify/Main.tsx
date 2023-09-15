'use client';

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
        if (!data || user?.profile?.id !== data.author.id) {
            router.replace('/recipe');
        }
    }, []);

    return <ModifyForm recipePostData={data!} />;
};

export default Main;

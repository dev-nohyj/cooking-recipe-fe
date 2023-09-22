'use client';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useGetFoodPostDetailQuery } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import ModifyForm from './ModifyForm';

interface Props {
    foodPostId: number;
}

const Main = ({ foodPostId }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();
    const user = cache.getQueryData<TGetProfileData>(GetProfileQueryKey());
    const { data } = useGetFoodPostDetailQuery({ foodPostId });

    useLayoutEffect(() => {
        if (!data || user?.profile?.id !== data.author.id) {
            router.replace('/food');
        }
    }, []);

    return <ModifyForm foodPostData={data!} />;
};

export default Main;

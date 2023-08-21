import { cookies } from 'next/headers';
import getQueryClient from '@/config/reactQuery/getQueryClient';
import { GetProfileQueryFn, GetProfileQueryKey } from '@/apis/auth/queries/useGetProfileQuery';
import { dehydrate } from '@tanstack/react-query';
import HydrateOnClient from '@/config/reactQuery/hydrate.client';
import Navigation from './Navigation';

interface Props {}

const Header = async ({}: Props) => {
    const cookie = cookies().toString();
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(GetProfileQueryKey(), () => GetProfileQueryFn(cookie));
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrateOnClient state={dehydratedState}>
            <Navigation />
        </HydrateOnClient>
    );
};

export default Header;

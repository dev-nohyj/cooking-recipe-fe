'use client';
import { useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import ProfileForm from './ProfileForm';

interface Props {}

const Main = ({}: Props) => {
    const { data } = useGetProfileQuery();

    return <ProfileForm profile={data?.profile!} />;
};

export default Main;

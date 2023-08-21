'use client';
import { useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import ProfileForm from './ProfileForm';

interface Props {}

const Main = ({}: Props) => {
    const { data } = useGetProfileQuery();

    return (
        <section>
            <ProfileForm profile={data?.profile!} />
        </section>
    );
};

export default Main;

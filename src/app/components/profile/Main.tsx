'use client';
import { useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import { useLayoutEffect } from 'react';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { Container } from './Profile.style';
import ProfileImage from './profileImage';
import ProfileInfo from './profileInfo';
import DeleteProfile from './deleteProfile';
import { useRouter } from 'next/navigation';

interface Props {}

export type TModifyProfileInfo = {
    nickname: string;
    introduction: string;
};

const Main = ({}: Props) => {
    const router = useRouter();
    const [isClient, onChange] = useSwitchState();
    const { data } = useGetProfileQuery();

    useLayoutEffect(() => {
        onChange(true);
        if (!data || !data.profile) {
            router.replace('/');
        }
    }, []);

    if (!isClient || !data || !data.profile) return <></>;
    return (
        <Container>
            <ProfileImage profileImageUrl={data.profile.profileImageUrl} />
            <ProfileInfo nickname={data.profile.nickname} introduction={data.profile.introduction} />
            <DeleteProfile />
        </Container>
    );
};

export default Main;

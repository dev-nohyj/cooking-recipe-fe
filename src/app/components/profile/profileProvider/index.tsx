import { ProviderLabel } from '@/asset/labels/providerLabel';
import ProfileProviderView from './ProfileProviderView';
import { useMemo } from 'react';
import GoogleIcon from '../../../../../public/svg/GoogleIcon';
import KakaoIcon from '../../../../../public/svg/KakaoIcon';

interface Props {
    email: string;
    provider: ValueOf<typeof ProviderLabel>;
}

const ProfileProvider = ({ email, provider }: Props) => {
    const socialInfo = useMemo(() => {
        switch (provider) {
            case ProviderLabel.google:
                return '구글';
            case ProviderLabel.kakao:
                return '카카오';
        }
    }, [provider]);

    const providerIcon = useMemo(() => {
        switch (provider) {
            case ProviderLabel.google:
                return <GoogleIcon />;
            case ProviderLabel.kakao:
                return <KakaoIcon />;
        }
    }, [provider]);

    return <ProfileProviderView email={email} socialInfo={socialInfo} providerIcon={providerIcon} />;
};

export default ProfileProvider;

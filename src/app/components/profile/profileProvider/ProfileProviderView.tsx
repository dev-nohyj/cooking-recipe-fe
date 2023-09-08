import { Desc, ProfileContainer, Text, Title, Wrapper } from '../Profile.style';

interface Props {
    email: string;
    socialInfo: string;
    providerIcon: JSX.Element;
}

const ProfileProviderView = ({ email, socialInfo, providerIcon }: Props) => {
    return (
        <ProfileContainer>
            <Title>{email}</Title>
            <Text>소셜 로그인 정보</Text>
            <Wrapper>
                {providerIcon}
                <Desc padding={'0 0 0 8px'}>{socialInfo} 연동 계정입니다.</Desc>
            </Wrapper>
        </ProfileContainer>
    );
};

export default ProfileProviderView;

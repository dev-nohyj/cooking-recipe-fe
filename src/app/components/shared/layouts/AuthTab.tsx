import { colors } from '@/asset/colors';
import Image from 'next/image';
import { styled } from 'styled-components';
import { commonImages } from '../../../../../public/images';
import { MutableRefObject } from 'react';
import TopTabToggleIcon from '../../../../../public/svg/TopTabToggleIcon';
import LoginModal from '../modals/LoginModal';
import Link from 'next/link';

interface Props {
    isLoginModalVisible: boolean;
    onChangeLoginModalVisible: () => void;
    isSignupState: boolean;
    onChangeState: () => void;
    isLoading: boolean;
    onLogout: () => void;
    isLogin: boolean;
    profileImageUrl: string | null | undefined;
    modalRef: MutableRefObject<null>;
    isActive: boolean;
    onTargetClick: () => void;
}

const AuthTab = ({
    isLoginModalVisible,
    onChangeLoginModalVisible,
    isSignupState,
    onChangeState,
    isLoading,
    onLogout,
    isLogin,
    profileImageUrl,
    modalRef,
    isActive,
    onTargetClick,
}: Props) => {
    return (
        <>
            {isLogin ? (
                <li>
                    <div ref={modalRef}>
                        <ProfileButton onClick={onTargetClick}>
                            {!!profileImageUrl ? (
                                <Image src={profileImageUrl} alt={'profileImage'} width={40} height={40} />
                            ) : (
                                <Image
                                    src={commonImages.defaultProfileSm.uri}
                                    alt={'profileImage'}
                                    width={40}
                                    height={40}
                                />
                            )}
                            <TopTabToggleIcon />
                        </ProfileButton>
                        {isActive && (
                            <DropdownContainer>
                                <LinkTo href={'/profile'} onClick={onTargetClick}>
                                    내 프로필
                                </LinkTo>
                                <LogoutBtn disabled={isLoading} onClick={onLogout}>
                                    로그아웃
                                </LogoutBtn>
                            </DropdownContainer>
                        )}
                    </div>
                </li>
            ) : (
                <li>
                    <Login onClick={onChangeLoginModalVisible}>로그인</Login>
                </li>
            )}
            {isLoginModalVisible && (
                <LoginModal
                    isLoginModalVisible={isLoginModalVisible}
                    onChangeLoginModalVisible={onChangeLoginModalVisible}
                    isSignupState={isSignupState}
                    onChangeState={onChangeState}
                />
            )}
        </>
    );
};

const Login = styled.button`
    height: 3.2rem;
    background-color: ${colors.sandyBrown};
    padding: 1px 1.6rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.white};
    border: none;
    border-radius: 1.6rem;
    &:hover {
        opacity: 0.9;
    }
`;

const ProfileButton = styled.button`
    display: flex;
    align-items: center;
`;

const DropdownContainer = styled.div`
    position: absolute;
    top: 68px;
    right: 1.6rem;
    z-index: 5;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    width: 192px;
    background-color: ${colors.white};
`;

const LinkTo = styled(Link)`
    display: block;
    color: ${colors.black100};
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 500;
    padding: 12px 16px;
    width: 100%;
    text-align: start;
    &:hover {
        background-color: ${colors.grey8};
        color: ${colors.sandyBrown};
    }
`;
const LogoutBtn = styled.button`
    display: block;
    color: ${colors.black100};
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 500;
    padding: 12px 16px;
    width: 100%;
    text-align: start;
    &:hover {
        background-color: ${colors.grey8};
        color: ${colors.sandyBrown};
    }
`;

export default AuthTab;

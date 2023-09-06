'use client';
import { colors } from '@/asset/colors';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import ReactModal from 'react-modal';
import { keyframes, styled } from 'styled-components';
import GoogleIcon from '../../../../../public/svg/GoogleIcon';
import KakaoIcon from '../../../../../public/svg/KakaoIcon';
import CloseIcon from '../../../../../public/svg/CloseIcon';

interface Props {
    isLoginModalVisible: boolean;
    onChangeLoginModalVisible: () => void;
    isSignupState: boolean;
    onChangeState: () => void;
}

const LoginModal = ({ isLoginModalVisible, onChangeLoginModalVisible, isSignupState, onChangeState }: Props) => {
    useEffect(() => {
        document.body.className = 'modal-open';

        return () => {
            document.body.className = '';
        };
    }, []);

    const styles = useMemo(
        () =>
            ({
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 10000,
                },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '530px',
                    width: '100%',
                    aspectRatio: '1.1',
                    border: 'none',
                    padding: 0,
                    background: `${colors.white}`,
                    cursor: 'default',
                },
            } as { [k: string]: React.CSSProperties }),
        [],
    );

    return (
        <ReactModal
            className={'authModal'}
            isOpen={isLoginModalVisible}
            onRequestClose={onChangeLoginModalVisible}
            style={{ overlay: styles.overlay, content: styles.content }}
            overlayElement={(props, children) => {
                return (
                    <ModalWrapper isOpen={isLoginModalVisible} {...props}>
                        {children}
                    </ModalWrapper>
                );
            }}
        >
            <Container>
                <CloseIconWrapper onClick={onChangeLoginModalVisible}>
                    <CloseIcon color={colors.grey0} />
                </CloseIconWrapper>
                <div>
                    <div>
                        <Title>{isSignupState ? 'Food Share 회원가입' : 'Food Share 로그인'}</Title>
                        <Desc>소셜로그인으로 가볍게 시작하세요!</Desc>
                    </div>
                    <SocialWrapper>
                        <GoogleLinkTo href={process.env.BACKEND_URL + '/auth/google'}>
                            <GoogleIcon />
                            <span>구글 {isSignupState ? '회원가입' : '로그인'}</span>
                        </GoogleLinkTo>
                        <KakaoLinkTo href={process.env.BACKEND_URL + '/auth/kakao'}>
                            <KakaoIcon />
                            <span>카카오 {isSignupState ? '회원가입' : '로그인'}</span>
                        </KakaoLinkTo>
                    </SocialWrapper>
                </div>
                <Footer>
                    <span>{isSignupState ? '계정이 이미 있으신가요?' : '아직 회원이 아니신가요?'}</span>
                    <button onClick={onChangeState}>{isSignupState ? '로그인' : '회원 가입'}</button>
                </Footer>
            </Container>
        </ReactModal>
    );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ModalWrapper = styled.div<{ isOpen: boolean }>`
    animation: ${(prop) => (prop.isOpen ? fadeIn : fadeOut)} 0.2s ease-in;
    visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
    transition: visibility 0.2s ease-out;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 4rem 4.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
`;
const CloseIconWrapper = styled.button`
    display: none;
    position: absolute;
    top: 2rem;
    right: 2.4rem;
    @media only screen and (max-width: 530px) {
        display: block;
    }
`;
const Title = styled.h2`
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: 500;
    text-align: center;
`;
const Desc = styled.p`
    margin-top: 1rem;
    text-align: center;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${colors.grey0};
`;

const SocialWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20rem;
    gap: 1rem;
    align-items: center;
`;

const GoogleLinkTo = styled(Link)`
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid ${colors.grey6};
    & span {
        font-size: 1.4rem;
        margin-left: 1.5rem;
    }
`;
const KakaoLinkTo = styled(GoogleLinkTo)`
    background-color: #ffe500;
    border: none;
`;

const Footer = styled.div`
    font-size: 1.2rem;
    line-height: 2rem;
    color: ${colors.black100};
    text-align: right;
    & button {
        font-size: 1.2rem;
        line-height: 2rem;
        color: ${colors.sandyBrown};
        margin-left: 4px;
    }
`;

export default LoginModal;

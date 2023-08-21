'use client';
import { colors } from '@/asset/colors';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import ReactModal from 'react-modal';
import { styled } from 'styled-components';

interface Props {
    isLoginModalVisible: boolean;
    onChangeLoginModalVisible: (v?: any) => void;
}

const LoginModal = ({ isLoginModalVisible, onChangeLoginModalVisible }: Props) => {
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
        >
            <Container>
                <Link href={process.env.BACKEND_URL + '/auth/google'}>구글 로그인</Link>
                <Link href={process.env.BACKEND_URL + '/auth/kakao'}>카카오 로그인</Link>
            </Container>
        </ReactModal>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export default LoginModal;

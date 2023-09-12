import { ModalWrapper } from '@/app/styles/ModalFade.style';
import { colors } from '@/asset/colors';
import { useEffect, useMemo } from 'react';
import ReactModal from 'react-modal';
import { TextButton } from '../button/TextButton';
import { styled } from 'styled-components';

interface Props {
    isVisibleModal: boolean;
    onChangeVisibleModal: (v?: any) => void;
    onClick: () => void;
    isLoading: boolean;
    title: string;
}

const CheckConfirmModal = ({ isVisibleModal, onChangeVisibleModal, onClick, isLoading, title }: Props) => {
    useEffect(() => {
        document.body.className = 'modal_open';

        return () => {
            document.body.className = '';
        };
    }, []);

    const styles = useMemo(
        () =>
            ({
                overlay: {
                    zIndex: 10000,
                    margin: '0 16px',
                },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '530px',
                    width: '100%',
                    aspectRatio: '3',
                    minHeight: '150px',
                    border: 'none',
                    padding: '32px',
                    background: `${colors.white}`,
                    cursor: 'default',
                    boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 12px 0px',
                },
            } as { [k: string]: React.CSSProperties }),
        [],
    );

    return (
        <ReactModal
            isOpen={isVisibleModal}
            onRequestClose={onChangeVisibleModal}
            style={{ overlay: styles.overlay, content: styles.content }}
            overlayElement={(props, children) => {
                return (
                    <ModalWrapper isOpen={isVisibleModal} {...props}>
                        {children}
                    </ModalWrapper>
                );
            }}
        >
            <Container>
                <Title>{title}</Title>
                <BtnWrapper>
                    <TextButton fontSize={'1.4rem'} onClick={onChangeVisibleModal} color={colors.black}>
                        닫기
                    </TextButton>
                    <TextButton
                        disabled={isLoading}
                        onClick={onClick}
                        fontSize={'1.4rem'}
                        color={colors.sandyBrown}
                        marginLeft="10px"
                    >
                        확인
                    </TextButton>
                </BtnWrapper>
            </Container>
        </ReactModal>
    );
};

const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
const Title = styled.p`
    text-align: center;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${colors.black};
    font-weight: 500;
`;
const BtnWrapper = styled.div`
    align-self: flex-end;
`;
export default CheckConfirmModal;

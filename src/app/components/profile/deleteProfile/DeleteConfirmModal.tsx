import { colors } from '@/asset/colors';
import { useEffect, useMemo } from 'react';
import ReactModal from 'react-modal';
import { BtnWrapper, DeleteModalContainer, DeleteModalTitle } from '../Profile.style';
import { ModalWrapper } from '../../../styles/ModalFade.style';
import { TextButton } from '../../shared/button/TextButton';

interface Props {
    isVisibleModal: boolean;
    onChangeVisibleModal: (v?: any) => void;
    onDelete: () => void;
    isDeleteLoading: boolean;
}

const DeleteConfirmModal = ({ isVisibleModal, onChangeVisibleModal, onDelete, isDeleteLoading }: Props) => {
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
            <DeleteModalContainer>
                <DeleteModalTitle>정말로 탈퇴 하시겠습니까?</DeleteModalTitle>
                <BtnWrapper>
                    <TextButton fontSize={'1.4rem'} onClick={onChangeVisibleModal} color={colors.black}>
                        닫기
                    </TextButton>
                    <TextButton
                        disabled={isDeleteLoading}
                        onClick={onDelete}
                        fontSize={'1.4rem'}
                        color={colors.sandyBrown}
                        marginLeft="10px"
                    >
                        확인
                    </TextButton>
                </BtnWrapper>
            </DeleteModalContainer>
        </ReactModal>
    );
};

export default DeleteConfirmModal;

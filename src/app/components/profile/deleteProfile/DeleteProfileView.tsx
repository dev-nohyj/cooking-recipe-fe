import { colors } from '@/asset/colors';
import { Desc, ProfileContainer, Title } from '../Profile.style';
import { RectangleButton } from '../../shared/button/RectangleButton';
import CheckConfirmModal from '../../shared/modal/CheckConfirmModal';

interface Props {
    isVisibleModal: boolean;
    onChangeVisibleModal: (v?: any) => void;
    onDelete: () => void;
    isDeleteLoading: boolean;
}

const DeleteProfileView = ({ isVisibleModal, onChangeVisibleModal, onDelete, isDeleteLoading }: Props) => {
    return (
        <>
            <ProfileContainer>
                <Title>회원 탈퇴</Title>
                <RectangleButton
                    backgroundColor={colors.red}
                    color={colors.white}
                    margin={'16px 0 8px'}
                    onClick={onChangeVisibleModal}
                >
                    회원 탈퇴
                </RectangleButton>
                <Desc>탈퇴 시 작성하신 게시물은 모두 삭제되며 복구되지 않습니다.</Desc>
            </ProfileContainer>
            {isVisibleModal && (
                <CheckConfirmModal
                    isVisibleModal={isVisibleModal}
                    onChangeVisibleModal={onChangeVisibleModal}
                    onClick={onDelete}
                    isLoading={isDeleteLoading}
                    title={'정말로 탈퇴 하시겠습니까?'}
                />
            )}
        </>
    );
};

export default DeleteProfileView;

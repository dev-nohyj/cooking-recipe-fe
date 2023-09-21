import { useDeleteUserMutation } from '@/apis/auth/mutations/useDeleteUserMutation';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import DeleteProfileView from './DeleteProfileView';

interface Props {}

const DeleteProfile = ({}: Props) => {
    const router = useRouter();
    const cache = useQueryClient();

    const [isVisibleModal, onChangeVisibleModal] = useSwitchState();

    const { mutate: deleteUser, isLoading: isDeleteLoading } = useDeleteUserMutation({
        onError: () => {
            alert('시스템 에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
            onChangeVisibleModal(false);
        },
        onSuccess: () => {
            onChangeVisibleModal(false);
            cache.removeQueries();
            cache.setQueryData<TGetProfileData>(GetProfileQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.profile = null;
                    });
                    return newData;
                }
                return prev;
            });
            router.replace('/');
            router.refresh();
        },
    });
    const onDelete = useCallback(() => {
        deleteUser();
    }, []);

    const props = {
        isVisibleModal,
        onChangeVisibleModal,
        onDelete,
        isDeleteLoading,
    };

    return <DeleteProfileView {...props} />;
};

export default DeleteProfile;

import { useLogoutMutation } from '@/apis/auth/mutations/useLogoutMutation';
import { GetProfileQueryKey, TGetProfileData, useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import AuthTab from './AuthTab';
import { useOutsideClick } from '@/app/hooks/useOutsizeClick';

interface Props {}

const AuthTabController = ({}: Props) => {
    const modalRef = useRef(null);
    const router = useRouter();
    const cache = useQueryClient();
    const { data } = useGetProfileQuery({});
    const [isLoginModalVisible, onChangeLoginModalVisible] = useSwitchState();
    const [isSignupState, onChangeState] = useSwitchState();
    const [isActive, onTargetClick] = useOutsideClick(modalRef, false);

    // toast
    // useEffect(() => {
    //     if (error) {
    //         alert('유저 정보를 불러오는데 실패했습니다.');
    //     }
    // }, [error?.response?.data.message]);

    const isLogin = useMemo(() => {
        return !!data?.profile;
    }, [data?.profile]);

    const { mutate, isLoading } = useLogoutMutation({
        onError: () => {
            alert('시스템 에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
        },
        onSuccess: () => {
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
        },
    });

    const onLogout = useCallback(() => {
        mutate();
    }, []);

    const props = {
        isLoginModalVisible,
        onChangeLoginModalVisible,
        isSignupState,
        onChangeState,
        isLoading,
        onLogout,
        isLogin,
        profileImageUrl: data?.profile?.profileImageUrl,
        modalRef,
        isActive,
        onTargetClick,
    };

    return <AuthTab {...props} />;
};

export default AuthTabController;

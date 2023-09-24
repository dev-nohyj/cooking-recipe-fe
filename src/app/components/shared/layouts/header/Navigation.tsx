'use client';

import Link from 'next/link';
import { styled } from 'styled-components';
import { colors } from '@/asset/colors';
import { usePathname, useRouter } from 'next/navigation';
import { hideHeaderPage } from '@/asset/const/hideRoutePage';
import NavList from './NavList';
import MobileNavList from './MobileNavList';
import { useCallback, useMemo, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GetProfileQueryKey, TGetProfileData, useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { useOutsideClick } from '@/app/hooks/useOutsizeClick';
import { useLogoutMutation } from '@/apis/auth/mutations/useLogoutMutation';
import { produce } from 'immer';
import LoginModal from './LoginModal';
import Image from 'next/image';
import { commonImages } from '../../../../../../public/images';

interface Props {}

const Navigation = ({}: Props) => {
    const pathname = usePathname();
    const modalRef = useRef(null);
    const toggleRef = useRef(null);
    const router = useRouter();
    const cache = useQueryClient();
    const { data } = useGetProfileQuery({});
    const [isMobileToggleActive, onToggleClick] = useOutsideClick(toggleRef, false);

    const [isLoginModalVisible, onChangeLoginModalVisible] = useSwitchState();
    const [isSignupState, onChangeState] = useSwitchState();

    const [isActive, onTargetClick] = useOutsideClick(modalRef, false);

    const isLogin = useMemo(() => {
        return !!data?.profile;
    }, [data?.profile]);

    const { mutate, isLoading } = useLogoutMutation({
        onError: () => {
            alert('시스템 에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
        },
        onSuccess: () => {
            onToggleClick(false);
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

    const onLogout = useCallback(() => {
        mutate();
    }, []);

    const navList = useMemo(() => {
        return [
            { title: '🥣 레시피', href: '/recipe', isActive: pathname.startsWith('/recipe') },
            { title: '🍖 음식', href: '/food', isActive: pathname.startsWith('/food') },
            { title: '🤖 레시피 봇', href: '/ai/recipeAiInfo', isActive: pathname.startsWith('/ai') },
        ];
    }, [pathname]);

    const props = {
        onChangeLoginModalVisible,
        isLoading,
        onLogout,
        isLogin,
        profileImageUrl: data?.profile?.profileImageUrl,
        modalRef,
        isActive,
        onTargetClick,
        navList,
    };

    const mobileProps = {
        onChangeLoginModalVisible,
        isLoading,
        onLogout,
        isLogin,
        toggleRef,
        isMobileToggleActive,
        onToggleClick,
        navList,
    };

    const modalProps = {
        isLoginModalVisible,
        onChangeLoginModalVisible,
        isSignupState,
        onChangeState,
    };

    if (hideHeaderPage.includes(pathname)) return <></>;
    return (
        <Container>
            <Nav>
                <Logo href={'/'}>
                    <Img src={commonImages.logoImg.uri} alt="logo" width={0} height={0} sizes="100vw" />
                </Logo>
                <NavList {...props} />
                <MobileNavList {...mobileProps} />
            </Nav>
            {isLoginModalVisible && <LoginModal {...modalProps} />}
        </Container>
    );
};

const Container = styled.header`
    display: block;
    position: sticky;
    top: 0;
    z-index: 10000;
    width: 100%;
    background-color: ${colors.white};
    height: 64px;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.3);
`;

const Nav = styled.nav`
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    position: relative;
`;

const Logo = styled(Link)`
    max-width: 118px;
    width: 100%;
    margin-right: 10px;
`;
const Img = styled(Image)`
    max-width: 118px;
    width: 100%;
    height: auto;
`;

export default Navigation;

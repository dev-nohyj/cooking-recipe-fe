'use client';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import Link from 'next/link';
import LoginModal from '../modals/LoginModal';
import { styled } from 'styled-components';
import { colors } from '@/asset/colors';
import { GetProfileQueryKey, TGetProfileData, useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import { useCallback, useRef } from 'react';
import { useLogoutMutation } from '@/apis/auth/mutations/useLogoutMutation';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { produce } from 'immer';
import { useOutsideClick } from '@/app/hooks/useOutsizeClick';
import { hideHeaderPage } from '@/asset/labels/hideRoutePage';

interface Props {}

const Navigation = ({}: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const cache = useQueryClient();

    const [isLoginModalVisible, onChangeLoginModalVisible] = useSwitchState();

    const { data } = useGetProfileQuery({});

    const modalRef = useRef(null);
    const [isActive, onTargetClick] = useOutsideClick(modalRef, false);

    // toast
    // useEffect(() => {
    //     if (error) {
    //         alert('유저 정보를 불러오는데 실패했습니다.');
    //     }
    // }, [error?.response?.data.message]);

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

    if (hideHeaderPage.includes(pathname)) return <></>;
    return (
        <Container>
            <Nav>
                <NavLeft>
                    <Logo href={'/'}>LOGO</Logo>
                </NavLeft>
                <NavRight>
                    <div>
                        <Link href={'/recipe'}>recipe</Link>
                        <Link href={'/food'}>food</Link>
                    </div>
                    <VerticalLine />
                    {data?.profile ? (
                        <div>
                            <div ref={modalRef}>
                                <button onClick={onTargetClick}>profile</button>
                                {isActive && (
                                    <div>
                                        <Link href={'/profile'} onClick={onTargetClick}>
                                            내 프로필
                                        </Link>
                                        <button disabled={isLoading} onClick={onLogout}>
                                            logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div onClick={onChangeLoginModalVisible}>login</div>
                    )}
                </NavRight>
            </Nav>
            {isLoginModalVisible && (
                <LoginModal
                    isLoginModalVisible={isLoginModalVisible}
                    onChangeLoginModalVisible={onChangeLoginModalVisible}
                />
            )}
        </Container>
    );
};

const Container = styled.header`
    display: block;
    box-shadow: ${colors.grey7} 0px 1px 0px;
    position: sticky;
    top: 0;
    z-index: 10000;
    width: 100%;
    background-color: ${colors.white};
    height: 52px;
`;

const Nav = styled.nav`
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    position: relative;
`;
const NavLeft = styled.div`
    margin-right: 10px;
`;
const NavRight = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;
const VerticalLine = styled.div`
    width: 1px;
    height: 16px;
    margin: 0 1.6rem;
    background-color: ${colors.grey7};
`;
const Logo = styled(Link)`
    display: flex;
    align-items: center;
    font-size: 2.4rem;
`;
export default Navigation;

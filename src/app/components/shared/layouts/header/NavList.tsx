import Link from 'next/link';
import { styled } from 'styled-components';
import { MobileSize } from '@/asset/const/deviceSize';
import { colors } from '@/asset/colors';
import { MutableRefObject } from 'react';
import TopTabToggleIcon from '../../../../../../public/svg/TopTabToggleIcon';
import { commonImages } from '../../../../../../public/images';
import Image from 'next/image';
import { nanoid } from 'nanoid';

interface Props {
    onChangeLoginModalVisible: () => void;
    isLoading: boolean;
    onLogout: () => void;
    isLogin: boolean;
    profileImageUrl: string | null | undefined;
    modalRef: MutableRefObject<null>;
    isActive: boolean;
    onTargetClick: () => void;
    navList: {
        title: string;
        href: string;
        isActive: boolean;
    }[];
}

const NavList = ({
    onChangeLoginModalVisible,
    isLoading,
    onLogout,
    isLogin,
    profileImageUrl,
    modalRef,
    isActive,
    onTargetClick,
    navList,
}: Props) => {
    return (
        <Container>
            {navList.map((item) => {
                return (
                    <li key={`navItem-${nanoid(6)}`}>
                        <NavItem isActive={item.isActive} href={item.href}>
                            {item.title}
                        </NavItem>
                    </li>
                );
            })}
            <HorizontalGap />
            {isLogin ? (
                <li>
                    <div ref={modalRef}>
                        <ProfileButton onClick={onTargetClick}>
                            <Img
                                src={profileImageUrl ? profileImageUrl : commonImages.defaultProfileSm.uri}
                                alt={'profileImage'}
                                width={40}
                                height={40}
                            />
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
        </Container>
    );
};

const Container = styled.ul`
    display: flex;
    align-items: center;
    height: 100%;
    @media only screen and (max-width: ${MobileSize}) {
        display: none;
    }
`;

const NavItem = styled(Link)<{ isActive: boolean }>`
    display: block;
    margin-left: 1.6rem;
    color: ${(props) => (props.isActive ? colors.sandyBrown : colors.grey1)};
    font-size: 1.3rem;
    line-height: 2rem;
    padding: 20px 0;
    font-weight: 500;
`;

const HorizontalGap = styled.div`
    width: 1px;
    height: 16px;
    margin: 0 16px;
`;

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
const Img = styled(Image)`
    border-radius: 50%;
`;

export default NavList;

import { styled } from 'styled-components';
import { MobileSize } from '@/asset/const/deviceSize';
import HamburgerIcon from '../../../../../../public/svg/HamburgerIcon';
import { colors } from '@/asset/colors';
import CloseIcon from '../../../../../../public/svg/CloseIcon';
import { MutableRefObject } from 'react';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { RectangleButton } from '../../button/RectangleButton';

interface Props {
    onChangeLoginModalVisible: (v?: any) => void;
    isLoading: boolean;
    onLogout: () => void;
    isLogin: boolean;
    toggleRef: MutableRefObject<null>;
    isMobileToggleActive: boolean;
    onToggleClick: () => void;
    navList: {
        title: string;
        href: string;
        isActive: boolean;
    }[];
}

const MobileNavList = ({
    onChangeLoginModalVisible,
    isLoading,
    onLogout,
    isLogin,
    toggleRef,
    isMobileToggleActive,
    onToggleClick,
    navList,
}: Props) => {
    return (
        <Container ref={toggleRef}>
            <button onClick={onToggleClick}>
                {isMobileToggleActive ? <CloseIcon color={colors.grey0} /> : <HamburgerIcon color={colors.grey0} />}
            </button>
            {isMobileToggleActive && (
                <DropdownContainer>
                    {navList.map((item) => {
                        return (
                            <LinkTo key={`mobileNavList-${nanoid(6)}`} href={item.href} onClick={onToggleClick}>
                                {item.title}
                            </LinkTo>
                        );
                    })}
                    <Line />
                    {isLogin ? (
                        <>
                            <LinkTo href={'/profile'} onClick={onToggleClick}>
                                내 프로필
                            </LinkTo>
                            <Logout disabled={isLoading} onClick={onLogout}>
                                로그아웃
                            </Logout>
                        </>
                    ) : (
                        <RectangleButton
                            backgroundColor={colors.sandyBrown}
                            color={colors.white}
                            borderRadius={'16px'}
                            maxWidth="100%"
                            margin={'6px 0'}
                            onClick={onChangeLoginModalVisible}
                        >
                            로그인
                        </RectangleButton>
                    )}
                </DropdownContainer>
            )}
        </Container>
    );
};
const Container = styled.div`
    display: none;
    @media only screen and (max-width: ${MobileSize}) {
        display: block;
    }
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
    font-weight: 700;
    padding: 12px 16px;
    width: 100%;
    text-align: start;
`;
const Line = styled.div`
    display: flex;
    margin: 0 auto;
    width: calc(100% - 16px);
    height: 1px;
    background-color: ${colors.grey9};
`;
const Logout = styled.button`
    display: block;
    color: ${colors.black100};
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 700;
    padding: 12px 16px;
    width: 100%;
    text-align: start;
`;

export default MobileNavList;

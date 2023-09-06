'use client';

import Link from 'next/link';
import { styled } from 'styled-components';
import { colors } from '@/asset/colors';
import { usePathname } from 'next/navigation';
import { hideHeaderPage } from '@/asset/labels/hideRoutePage';
import AuthTabController from './AuthTabController';

interface Props {}

const Navigation = ({}: Props) => {
    const pathname = usePathname();

    if (hideHeaderPage.includes(pathname)) return <></>;
    return (
        <Container>
            <Nav>
                <NavLeft>
                    <li>
                        <Logo href={'/'}>LOGO</Logo>
                    </li>
                </NavLeft>
                <NavRight>
                    <li>
                        <Link href={'/recipe'}>recipe</Link>
                    </li>
                    <li>
                        <Link href={'/food'}>food</Link>
                    </li>
                    <AuthTabController />
                </NavRight>
            </Nav>
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
const NavLeft = styled.ul`
    margin-right: 10px;
`;
const Logo = styled(Link)`
    display: flex;
    align-items: center;
    font-size: 2.4rem;
    color: ${colors.sandyBrown};
`;
const NavRight = styled.ul`
    display: flex;
    align-items: center;
    height: 100%;
`;

export default Navigation;

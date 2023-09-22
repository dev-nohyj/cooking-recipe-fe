import { colors } from '@/asset/colors';
import { MobileSize } from '@/asset/const/deviceSize';
import Image from 'next/image';
import { styled } from 'styled-components';

export const HomeContainer = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 32px 32px;
`;

export const Title = styled.h2`
    white-space: pre-line;
    word-wrap: break-word;
    margin: 32px 0;
    font-size: 3.2rem;
    line-height: 4rem;
    color: ${colors.black200};
    font-weight: 500;
    text-align: center;
    & span {
        color: ${colors.sandyBrown};
    }
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 2rem;
        line-height: 3rem;
        margin: 16px 0;
    }
`;

export const Img = styled(Image)`
    width: 100%;
    height: auto;
    @media only screen and (max-width: ${MobileSize}) {
        display: none;
    }
`;

export const MobileImg = styled(Image)`
    display: none;
    width: 100%;
    height: auto;
    @media only screen and (max-width: ${MobileSize}) {
        display: block;
    }
`;

export const Container = styled.section`
    padding-top: 5%;
`;

export const CardList = styled.div`
    margin-top: 32px;
    max-width: 1024px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    gap: 12px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

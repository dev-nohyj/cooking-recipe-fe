'use client';

import { styled } from 'styled-components';
import { commonImages } from '../../../../public/images';
import { MobileSize } from '@/asset/const/deviceSize';
import Image from 'next/image';
import { colors } from '@/asset/colors';

interface Props {}

const Banner = ({}: Props) => {
    return (
        <section>
            <Img src={commonImages.banner.uri} width={0} height={0} sizes="100vw" alt="banner" />
            <MobileImg src={commonImages.bannerSm.uri} width={0} height={0} sizes="100vw" alt="mobile-banner" />
            <Title>
                음식에 대한 정보{'\n'} <span>Food Share</span>에서 시작하세요!
            </Title>
        </section>
    );
};

const Title = styled.h2`
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
const Img = styled(Image)`
    width: 100%;
    height: auto;
    @media only screen and (max-width: ${MobileSize}) {
        display: none;
    }
`;
const MobileImg = styled(Image)`
    display: none;
    width: 100%;
    height: auto;
    @media only screen and (max-width: ${MobileSize}) {
        display: block;
    }
`;
export default Banner;

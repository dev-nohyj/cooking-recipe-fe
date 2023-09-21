'use client';

import { commonImages } from '../../../../public/images';
import { Img, MobileImg, Title } from './Home.style';

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

export default Banner;

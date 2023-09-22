import { colors } from '@/asset/colors';
import { MobileSize } from '@/asset/const/deviceSize';
import Image from 'next/image';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Container = styled.article`
    max-width: 1024px;
    margin: 0 auto;
    padding: 32px 16px;
`;
export const ButtonWrapper = styled.section`
    display: flex;
    align-items: center;
`;
export const HorizontalGap = styled.div`
    width: 1px;
    height: 16px;
    margin: 0 4px;
`;
export const LikeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
export const Btn = styled.button`
    display: flex;
    & span {
        font-size: 1.5rem;
        font-weight: 200;
        color: ${colors.black200};
        padding-left: 6px;
    }
`;

export const Desc = styled.p`
    margin: 32px 0;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: ${colors.black200};
    white-space: pre-line;
    word-wrap: break-word;
`;
export const ProfileContainer = styled.section`
    padding: 32px 0;
    display: flex;
    align-items: center;
`;
export const ProfileImg = styled(Image)`
    border-radius: 50%;
    @media only screen and (max-width: ${MobileSize}) {
        width: 40px;
        height: 40px;
    }
`;
export const AuthorProfile = styled.div`
    margin-left: 16px;
`;
export const Nickname = styled.p`
    font-size: 1.8rem;
    line-height: 2.7rem;
    color: ${colors.black};
    font-weight: 700;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.4rem;
    }
`;

export const Intro = styled.p`
    margin-top: 16px;
    font-size: 1.6rem;
    line-height: 2rem;
    color: ${colors.grey9};
    @media only screen and (max-width: ${MobileSize}) {
        margin-top: 8px;
        font-size: 1.2rem;
    }
`;

export const TagWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    & p {
        margin: 0 10px 14px 0;
        margin-right: 10px;
        font-size: 1.6rem;
        line-height: 1;
        padding: 8px 10px;
        border-radius: 16px;
        color: ${colors.sandyBrown};
        background-color: ${colors.grey8};
    }
`;

export const MainSwiper = styled(Swiper)`
    padding: 32px 0;
    cursor: pointer;
    .swiper-button-prev,
    .swiper-button-next {
        color: ${colors.sandyBrown};
    }
`;

export const Img = styled(Image)`
    width: 100%;
    max-height: 500px;
    height: auto;
    object-fit: contain;
`;

export const ThumbSwiper = styled(Swiper)`
    margin-top: 32px;
    cursor: pointer;
    .swiper-slide-thumb-active img {
        opacity: 1;
    }
`;

export const ThumbWrapper = styled(SwiperSlide)`
    width: 0;
    aspect-ratio: 1;
`;
export const ThumbImg = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
`;

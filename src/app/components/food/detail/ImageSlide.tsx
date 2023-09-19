import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import { FreeMode, Thumbs, Scrollbar, Navigation } from 'swiper/modules';
import { styled } from 'styled-components';
import Image from 'next/image';
import { blurDataURL } from '@/asset/const/blurUrl';
import { useState } from 'react';
import { colors } from '@/asset/colors';

interface Props {
    foodImages: {
        id: number;
        url: string;
    }[];
}

const ImageSlide = ({ foodImages }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

    return (
        <section>
            <MainSwiper
                navigation={true}
                loop={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Thumbs, Navigation]}
            >
                {foodImages.map((img) => {
                    return (
                        <SwiperSlide key={`foodImg-${img.id}`}>
                            <Img
                                src={img.url}
                                width="0"
                                height="0"
                                sizes="100vw"
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                                alt="foodImg"
                                priority
                            />
                        </SwiperSlide>
                    );
                })}
            </MainSwiper>
            {foodImages.length > 1 && (
                <ThumbSwiper
                    onSwiper={setThumbsSwiper}
                    watchSlidesProgress={true}
                    spaceBetween={10}
                    slidesPerView={2}
                    freeMode={true}
                    breakpoints={{
                        530: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    scrollbar={{ hide: true }}
                    modules={[FreeMode, Thumbs, Scrollbar]}
                >
                    {foodImages.map((img) => {
                        return (
                            <ThumbWrapper key={`thumbImg-${img.id}`}>
                                <ThumbImg
                                    src={img.url}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                    alt="thumbImg"
                                    priority
                                />
                            </ThumbWrapper>
                        );
                    })}
                </ThumbSwiper>
            )}
        </section>
    );
};

const MainSwiper = styled(Swiper)`
    padding: 32px 0;
    cursor: pointer;
    .swiper-button-prev,
    .swiper-button-next {
        color: ${colors.sandyBrown};
    }
`;

const Img = styled(Image)`
    width: 100%;
    max-height: 500px;
    height: auto;
    object-fit: contain;
`;

const ThumbSwiper = styled(Swiper)`
    margin-top: 32px;
    cursor: pointer;
    .swiper-slide-thumb-active img {
        opacity: 1;
    }
`;

const ThumbWrapper = styled(SwiperSlide)`
    width: 0;
    aspect-ratio: 1;
`;
const ThumbImg = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
`;

export default ImageSlide;

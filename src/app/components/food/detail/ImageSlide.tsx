import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import { FreeMode, Thumbs, Scrollbar, Navigation } from 'swiper/modules';
import { blurDataURL } from '@/asset/const/blurUrl';
import { Dispatch } from 'react';
import { Img, MainSwiper, ThumbImg, ThumbSwiper, ThumbWrapper } from './FoodDetail.style';

interface Props {
    foodImages: {
        id: number;
        url: string;
    }[];
    thumbsSwiper: any;
    setThumbsSwiper: Dispatch<any>;
}

const ImageSlide = ({ foodImages, thumbsSwiper, setThumbsSwiper }: Props) => {
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

export default ImageSlide;

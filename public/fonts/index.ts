import localFont from 'next/font/local';

export const Pretendard = localFont({
    src: [
        {
            path: '../../public/fonts/woff2-subset/Pretendard-ExtraLight.subset.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-Light.subset.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-Regular.subset.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-Medium.subset.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-SemiBold.subset.woff2',
            weight: '600',
            style: 'nomal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-Bold.subset.woff2',
            weight: '700',
            style: 'nomal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-ExtraBold.subset.woff2',
            weight: '800',
            style: 'nomal',
        },
        {
            path: '../../public/fonts/woff2-subset/Pretendard-Black.subset.woff2',
            weight: '900',
            style: 'nomal',
        },
    ],
    display: 'swap',
    preload: true,
});

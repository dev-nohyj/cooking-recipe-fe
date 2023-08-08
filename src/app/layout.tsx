import { Pretendard } from '../../public/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={Pretendard.className}>
            <body>{children}</body>
        </html>
    );
}

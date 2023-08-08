import { Pretendard } from '../../public/fonts';
import Head from './head';
import Provider from './provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={Pretendard.className}>
            <Head />
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}

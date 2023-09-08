import { Pretendard } from '../../public/fonts';
import Header from './components/shared/layouts/header';
import Head from './head';
import Provider from './provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={Pretendard.className}>
            <Head />
            <body>
                <Provider>
                    <Header />
                    <main>{children}</main>
                </Provider>
            </body>
        </html>
    );
}

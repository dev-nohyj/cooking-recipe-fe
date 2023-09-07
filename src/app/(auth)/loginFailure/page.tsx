'use client';
import { loginFailureLabel } from '@/asset/labels/loginLabel';
import { useRouter } from 'next/navigation';

interface Props {
    searchParams: {
        code: string;
    };
}

const LoginFailurePage = ({ searchParams: { code } }: Props) => {
    const ErrorReason =
        parseInt(code) === loginFailureLabel.providerFail ? '잘못된 소셜로그인 접근' : '시스템에러 발생';
    const router = useRouter();
    const goBack = () => {
        router.replace('/');
    };
    return (
        <section>
            <h1>로그인에 실패했습니다</h1>
            <p>{ErrorReason}</p>
            <button onClick={goBack}>돌아가기</button>
        </section>
    );
};

export default LoginFailurePage;

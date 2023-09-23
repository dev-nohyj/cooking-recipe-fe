'use client';

import { colors } from '@/asset/colors';
import { loginFailureLabel } from '@/asset/labels/loginLabel';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { styled } from 'styled-components';

interface Props {
    searchParams: {
        code: string;
    };
}

const LoginFailurePage = ({ searchParams: { code } }: Props) => {
    const errorReason = useCallback(() => {
        switch (parseInt(code)) {
            case loginFailureLabel.providerFail:
                return '잘못된 소셜로그인 접근';
            case loginFailureLabel.kakaoEmptyEmail:
                return '카카오 이메일 동의를 체크해주셔야 합니다.';
            default:
                return '시스템에러 발생';
        }
    }, [code]);
    const router = useRouter();
    const onClick = useCallback(() => {
        router.replace('/');
    }, []);
    return (
        <Container>
            <div>
                <Title>로그인에 실패했습니다.</Title>
                <Reason>Reason: {errorReason()}</Reason>
                <Btn onClick={onClick}>홈으로 돌아가기</Btn>
            </div>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    max-width: 560px;
    margin: 0 auto;
    word-break: keep-all;
`;

const Title = styled.h2`
    font-size: 3.2rem;
    line-height: 4rem;
    margin-bottom: 16px;
    font-weight: 500;
`;
const Reason = styled.p`
    font-size: 1.6rem;
    line-height: 2.5rem;
    margin-bottom: 20px;
`;
const Btn = styled.button`
    padding: 10px 16px;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.sandyBrown};
    border: 1px solid ${colors.sandyBrown};
    border-radius: 20px;
    &:hover {
        opacity: 0.9;
    }
`;

export default LoginFailurePage;

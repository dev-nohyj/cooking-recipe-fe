'use client';

import { colors } from '@/asset/colors';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { styled } from 'styled-components';

interface Props {
    onSubmit: () => void;
    isLoading: boolean;
    isModify?: boolean;
}

const BottomSction = ({ onSubmit, isLoading, isModify = false }: Props) => {
    const router = useRouter();
    const goBack = useCallback(() => {
        router.back();
    }, []);

    return (
        <Container>
            <Wrapper>
                <button onClick={goBack}>나가기</button>
                <button disabled={isLoading} onClick={onSubmit}>
                    {isModify ? '수정하기' : '작성하기'}
                </button>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    width: 100%;
    background-color: ${colors.grey5};
    height: 52px;
`;

const Wrapper = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default BottomSction;

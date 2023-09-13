'use client';

import { colors } from '@/asset/colors';
import { styled } from 'styled-components';
import { TextButton } from '../../shared/button/TextButton';

interface Props {
    onSubmit: () => void;
    isLoading: boolean;
    onCancel: () => void;
    isModify?: boolean;
}

const SubmitSection = ({ onSubmit, isLoading, onCancel, isModify = false }: Props) => {
    return (
        <Container>
            <Wrapper>
                <TextButton fontSize={'1.6rem'} color={colors.black200} onClick={onCancel}>
                    나가기
                </TextButton>
                <TextButton fontSize={'1.6rem'} color={colors.sandyBrown} disabled={isLoading} onClick={onSubmit}>
                    {isModify ? '수정하기' : '작성하기'}
                </TextButton>
            </Wrapper>
        </Container>
    );
};

const Container = styled.section`
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    width: 100%;
    background-color: ${colors.white};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    height: 52px;
`;

const Wrapper = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 32px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default SubmitSection;

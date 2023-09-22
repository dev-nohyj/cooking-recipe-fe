import { colors } from '@/asset/colors';
import { MobileSize } from '@/asset/const/deviceSize';
import { styled } from 'styled-components';
import { TextButton } from '../shared/button/TextButton';

export const Container = styled.div`
    max-width: 1024px;
    padding: 0 32px;
    margin: 0 auto;
`;
export const TextWrapper = styled.section`
    margin: 32px 0;
`;
export const Title = styled.h2`
    white-space: pre-line;
    word-wrap: break-word;
    font-size: 2.4rem;
    line-height: 3.2rem;
    color: ${colors.black200};
    font-weight: 500;
    text-align: center;
    & span {
        color: ${colors.sandyBrown};
    }
`;

export const InputSection = styled.section`
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
export const InputWrapper = styled.div`
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 32px;
`;
export const Input = styled.input`
    width: 100%;
    padding: 8px 24px;
    font-size: 1.6rem;
    border: 1px solid ${colors.grey9};
    border-radius: 16px;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.4rem;
    }
`;
export const Btn = styled.button`
    margin-right: 8px;
    padding: 4px;
    position: absolute;
    right: 32px;
`;

export const RecipeContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding-bottom: 64px;
`;

export const Recipe = styled.p`
    white-space: pre-line;
    word-wrap: break-word;
    font-size: 1.4rem;
    line-height: 1.8rem;
    background-color: ${colors.sandyBrown};
    padding: 32px 16px;
    border-radius: 8px;
    color: ${colors.white};
    margin-bottom: 24px;
`;
export const CopyBtn = styled(TextButton)`
    align-self: flex-end;
`;

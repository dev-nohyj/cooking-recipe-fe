import { colors } from '@/asset/colors';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 50px 16px 64px;
`;

export const ImgWrapper = styled.section`
    display: flex;
    margin: 24px 0;
    height: auto;
    gap: 16px;
    padding: 0 12px;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const LabelContainer = styled.div`
    position: relative;
    flex: 0 0 auto;

    max-width: 300px;
    width: 100%;
    height: 364px;
`;

export const Label = styled.label`
    flex: 0 0 auto;
    display: block;
    cursor: pointer;
    background-color: ${colors.grey8};
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    width: 100%;
    height: 364px;
    & p {
        margin-top: 24px;
        font-size: 1.6rem;
        color: ${colors.grey1};
    }
`;

export const IconWrapper = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    aspect-ratio: 1;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    *:focus {
        outline: 0;
    }
`;

export const ImgLabel = styled(Label)`
    background-color: unset;
`;

export const Img = styled(Image)`
    width: 100%;
    height: auto;
    max-height: 300px;
`;

export const DescInput = styled.input`
    margin: 24px 0;
    font-size: 1.6rem;
    line-height: 1;
    padding-bottom: 16px;
    border: none;
    border-bottom: 1px solid ${colors.grey9};
    width: 100%;
`;

export const TagWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
`;

export const TagItem = styled.p`
    margin: 0 10px 14px 0;
    margin-right: 10px;
    font-size: 1.6rem;
    line-height: 1;
    padding: 8px 10px;
    border-radius: 16px;
    color: ${colors.sandyBrown};
    background-color: ${colors.grey8};
    cursor: pointer;
`;

export const TagInput = styled.input`
    margin: 24px 0;
    font-size: 1.6rem;
    line-height: 1;
    border: none;
    height: 32px;
    width: 100%;
`;

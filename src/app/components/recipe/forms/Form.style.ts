import { colors } from '@/asset/colors';
import { MobileSize, TabletSize } from '@/asset/const/deviceSize';
import { styled } from 'styled-components';

export const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 50px 16px 64px;
`;
export const TopSection = styled.section`
    display: flex;
    @media only screen and (max-width: ${TabletSize}) {
        flex-direction: column;
    }
`;
export const LeftContainer = styled.div`
    max-width: 320px;
    width: 100%;
    margin-right: 24px;
    @media only screen and (max-width: ${TabletSize}) {
        align-self: center;
        margin-right: 0;
    }
`;

export const Label = styled.label`
    display: block;
    cursor: pointer;
    background-color: ${colors.grey8};
    padding: 32px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 320px;
    width: 100%;
    height: 240px;
`;
export const RightContainer = styled.div`
    width: 100%;
`;
export const TitleInput = styled.input`
    border: none;
    width: 100%;
    font-weight: 600;
    font-size: 40px;
    line-height: 1.42em;
    letter-spacing: -0.03em;
    color: #000000;
    white-space: pre-line;
    @media only screen and (max-width: ${TabletSize}) {
        margin-top: 24px;
    }
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 24px;
        line-height: 1.2em;
    }
`;

export const TagWrapper = styled.div`
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
    margin: 0 10px 14px 0;
    margin-right: 10px;
    font-size: 1.6rem;
    line-height: 1;
    border: none;
    height: 32px;
`;

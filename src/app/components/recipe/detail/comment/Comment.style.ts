import { colors } from '@/asset/colors';
import { MobileSize, TabletSize } from '@/asset/const/deviceSize';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Container = styled.section`
    margin-top: 32px;
    max-width: 840px;
    margin: 0 auto;
    padding: 5% 30px 10%;
    @media only screen and (max-width: ${TabletSize}) {
        max-width: 748px;
        padding: 5% 20px 10%;
    }
    @media only screen and (max-width: ${MobileSize}) {
        max-width: 335px;
        padding: 5% 0 10%;
    }
`;

export const CommentWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    & textarea {
        font-size: 1.6rem;
        min-height: 98px;
        resize: none;
        outline: none;
        border: 1px solid ${colors.grey9};
        padding: 16px 16px 24px;
        border-radius: 4px;
    }
    & button {
        font-size: 1.2rem;
        line-height: 1;
        margin-top: 16px;
        align-self: flex-end;
        background-color: ${colors.sandyBrown};
        color: ${colors.white};
        padding: 8px 32px;
        border-radius: 4px;
    }
`;

export const CommentCount = styled.p`
    font-size: 1.8rem;
    line-height: 2.7rem;
    color: ${colors.black};
    font-weight: 500;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.4rem;
    }
`;

export const FetchMoreBtn = styled.button`
    margin-top: 32px;
    width: 100%;
    padding: 8px 0;
    font-size: 1.4rem;
    color: ${colors.sandyBrown};
    background-color: rgba(0, 0, 0, 0.05);
`;

export const ItemContainer = styled.div`
    margin-top: 32px;
`;
export const Img = styled(Image)`
    border-radius: 50%;
`;

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;
export const RightWrapper = styled.div`
    margin-left: 12px;
`;
export const Nickname = styled.p`
    font-size: 1.4rem;
    font-weight: 500;
`;
export const Date = styled.p`
    font-size: 1.2rem;
    font-size: 300;
    color: ${colors.grey0};
    & span {
        padding-left: 8px;
    }
`;

export const TextWrapper = styled.div`
    background-color: ${colors.grey8};
    width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    & p {
        white-space: pre-line;
        word-wrap: break-word;
        font-size: 1.4rem;
        line-height: 1.8rem;
    }
    margin-bottom: 16px;
`;

export const ReplyContainer = styled.div`
    width: 90%;
    padding: 16px;
    margin: 0 auto;
    border: 1px solid ${colors.grey8};
`;

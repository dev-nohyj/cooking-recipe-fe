import { colors } from '@/asset/colors';
import { MobileSize } from '@/asset/const/deviceSize';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Container = styled.div`
    max-width: 768px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 0 16px 80px;
`;

export const ProfileImageContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 24px;
`;

export const Img = styled(Image)`
    border-radius: 50%;
`;

export const ImageLabel = styled.label`
    background-color: ${colors.sandyBrown};
    font-size: 1.6rem;
    color: ${colors.white};
    font-weight: 700;
    text-align: center;
    padding: 8px 0;
    max-width: 150px;
    width: 100%;
    border-radius: 4px;
    margin: 16px 0;
    &:hover {
        opacity: 0.8;
    }
`;

export const ProfileContainer = styled.section`
    border-top: 1px solid ${colors.grey10};
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
`;

export const ModifyProfileInput = styled.input`
    font-size: 1.8rem;
    margin-bottom: 8px;
    padding: 4px 8px;
    border: 1px solid ${colors.grey9};
    border-radius: 4px;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.6rem;
    }
`;

export const Title = styled.p`
    font-size: 1.8rem;
    line-height: 2.7rem;
    color: ${colors.black};
    font-weight: 700;
`;

export const Desc = styled.span`
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${colors.grey2};
`;

export const DeleteModalContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
export const DeleteModalTitle = styled.p`
    text-align: center;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${colors.black};
    font-weight: 500;
`;

export const BtnWrapper = styled.div`
    align-self: flex-end;
`;

export const ErrorMsg = styled.span`
    color: ${colors.red};
    font-size: 1rem;
    margin-bottom: 8px;
`;

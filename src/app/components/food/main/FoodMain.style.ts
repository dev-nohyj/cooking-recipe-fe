import { colors } from '@/asset/colors';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Container = styled.section`
    max-width: 1024px;
    margin: 0 auto;
    padding: 32px 0 3%;
`;

export const Card = styled.div`
    position: relative;
    cursor: pointer;
`;
export const Img = styled(Image)<{ isImgSize: boolean }>`
    width: 300px;
    height: auto;
    ${(props) =>
        props.isImgSize && {
            aspectRatio: 1.8,
            objectFit: 'cover',
        }}
`;
export const InfoContainer = styled.div`
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
`;

export const Desc = styled.p`
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.05em;
    font-weight: 600;
    color: ${colors.white};
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserInfo = styled.div`
    position: absolute;
    bottom: 12px;
    left: 12px;
    font-weight: 200;
    font-size: 1.2rem;
    line-height: 1.6rem;
    letter-spacing: -0.05em;
    color: ${colors.white};
    display: flex;
    align-items: center;
    & span {
        margin-left: 5px;
        width: 150px;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
`;
export const ProfileImage = styled(Image)`
    border-radius: 50%;
`;
export const Btn = styled.button`
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 8px;
`;

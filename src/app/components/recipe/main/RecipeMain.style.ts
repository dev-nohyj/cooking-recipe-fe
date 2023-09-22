import { colors } from '@/asset/colors';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from 'styled-components';

export const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding-bottom: 5%;
`;

export const CategoryList = styled.ul`
    margin: 24px 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 40px;
    &::-webkit-scrollbar {
        display: none;
    }
    & li {
        flex: 0 0 auto;
        margin-right: 10px;
    }
`;

export const LinkTo = styled(Link)<{ isActive: boolean }>`
    font-size: 1.6rem;
    line-height: 1;
    padding: 2px 24px;
    border-radius: 16px;
    color: ${(props) => (props.isActive ? colors.white : colors.sandyBrown)};
    border: 1px solid ${colors.sandyBrown};
    background-color: ${(props) => (props.isActive ? colors.sandyBrown : colors.white)};
    &:hover {
        opacity: 0.8;
    }
`;

export const PostListWrapper = styled.section`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 35px;
    max-width: 1024px;
    margin: 0 auto;
    gap: 24px;
    @media only screen and (max-width: 1024px) {
        max-width: 694px;
    }
    @media only screen and (max-width: 693px) {
        justify-content: center;
    }
`;

export const Card = styled.div`
    width: 300px;
    flex: 0 0 auto;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const Img = styled(Image)`
    width: 100%;
    object-fit: none;
    border-radius: 12px;
`;
export const Content = styled.div`
    margin-top: 10px;
    padding: 0 4px;
`;

export const Title = styled.p`
    margin: 4px 0;
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: -0.05em;
    font-weight: 600;
    color: ${colors.black};
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const Date = styled.p`
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1;
    color: ${colors.grey0};
    white-space: pre-line;
    text-align: end;
`;
export const BottomWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const UserInfo = styled.div`
    font-weight: 200;
    font-size: 1.5rem;
    line-height: 1.8rem;
    letter-spacing: -0.05em;
    color: ${colors.black};
    display: flex;
    align-items: center;
    & span {
        margin-left: 5px;
    }
`;
export const ProfileImage = styled(Image)`
    border-radius: 50%;
`;
export const Btn = styled.button`
    display: flex;

    & span {
        font-size: 1.5rem;
        font-weight: 200;
        color: ${colors.black200};
        padding-left: 6px;
    }
`;

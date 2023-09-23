import { colors } from '@/asset/colors';
import { styled } from 'styled-components';
import { RectangleButton } from '../button/RectangleButton';

interface Props {
    title: string;
    desc: string;
    onCreate: () => void;
    isLogin: boolean;
}

const EmptyList = ({ title, desc, onCreate, isLogin }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            {isLogin && (
                <RectangleButton backgroundColor={colors.sandyBrown} color={colors.white} onClick={onCreate}>
                    추가하기
                </RectangleButton>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
`;

const Title = styled.h3`
    font-size: 1.8rem;
    line-height: 2.7rem;
    color: ${colors.black};
    font-weight: 700;
`;

const Desc = styled.p<{ padding?: string }>`
    margin: 4px 0 16px;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${colors.grey2};
`;

export default EmptyList;

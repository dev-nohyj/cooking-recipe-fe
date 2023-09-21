import { colors } from '@/asset/colors';
import { RectangleButton } from '../../shared/button/RectangleButton';
import { Title } from '../Home.style';
import { styled } from 'styled-components';

interface Props {
    onRouteBot: () => void;
}

const RecipeBotView = ({ onRouteBot }: Props) => {
    return (
        <Container>
            <Title>
                <span>AI</span>에게 레시피를 물어보세요!
            </Title>
            <RectangleButton
                onClick={onRouteBot}
                color={colors.white}
                backgroundColor={colors.sandyBrown}
                padding={'8px 16px'}
            >
                레시피 공유 받기
            </RectangleButton>
        </Container>
    );
};

const Container = styled.section`
    padding: 32px 0 64px;
    aspect-ratio: 2.67;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default RecipeBotView;

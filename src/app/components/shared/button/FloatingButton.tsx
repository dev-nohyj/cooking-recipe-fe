import { colors } from '@/asset/colors';
import { CSSProp, styled } from 'styled-components';

interface Props {
    btnStyle?: CSSProp;
}

export const FloatingButton = styled.button<Props>`
    width: 48px;
    aspect-ratio: 1;
    position: fixed;
    bottom: 3%;
    right: 3%;
    border-radius: 50%;
    background-color: ${colors.sandyBrown};
    opacity: 0.8;
    z-index: 100;
    ${(props) => props.btnStyle && props.btnStyle};
`;

import { styled } from 'styled-components';
interface Props {
    backgroundColor: string;
    color: string;
    padding?: string;
    maxWidth?: string;
    margin?: string;
    borderRadius?: string;
    fontWeight?: string;
}
export const RectangleButton = styled.button<Props>`
    font-size: 1.6rem;
    line-height: 1;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    font-weight: 700;
    text-align: center;
    padding: ${(props) => (props.padding ? props.padding : '8px 0')};
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : '150px')};
    width: 100%;
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '4px')};
    margin: ${(props) => (props.margin ? props.margin : '0')};
    &:hover {
        opacity: 0.8;
    }
`;

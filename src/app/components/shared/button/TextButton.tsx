import { styled } from 'styled-components';

interface Props {
    fontSize: string;
    color: string;
    marginLeft?: string;
    isUnderLine?: boolean;
}

export const TextButton = styled.button<Props>`
    font-size: ${(props) => props.fontSize};
    padding: 4px 6px;
    color: ${(props) => props.color};
    margin-left: ${(props) => props.marginLeft};
    ${(props) =>
        props.isUnderLine && {
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
        }}
    &:hover {
        opacity: 0.8;
    }
`;

import { keyframes, styled } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
    animation: ${(prop) => (prop.isOpen ? fadeIn : fadeOut)} 0.2s ease-in;
    visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
    transition: visibility 0.2s ease-out;
`;

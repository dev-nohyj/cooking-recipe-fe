'use client';

import { ToastContainer } from 'react-toastify';
import { styled } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

interface Props {}

const ToastRegistry: React.FC<Props> = () => {
    return (
        <Container>
            <ToastContainer />
        </Container>
    );
};

const Container = styled.div`
    .Toastify__toast-container--top-center {
        z-index: 10000001;
    }
`;

export default ToastRegistry;

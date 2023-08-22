'use client';
import { styled } from 'styled-components';
import RegisterForm from './RegisterForm';

interface Props {}

const Main = ({}: Props) => {
    return (
        <Container>
            <RegisterForm />
        </Container>
    );
};

const Container = styled.main`
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
`;

export default Main;

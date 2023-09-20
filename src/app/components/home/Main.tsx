'use client';

import { styled } from 'styled-components';
import Banner from './Banner';

interface Props {}

const Main = ({}: Props) => {
    return (
        <Container>
            <Banner />
            <section>
                textBtn
                <p>레시피 둘러보기</p>
            </section>
            <section>
                textBtn
                <p>음식 사진 둘러보기</p>
            </section>
            <section>
                <p>AI에게 레시피를 물어보세요!</p>
                <p>레시피 공유 받기</p>
            </section>
        </Container>
    );
};

const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 32px;
`;

export default Main;

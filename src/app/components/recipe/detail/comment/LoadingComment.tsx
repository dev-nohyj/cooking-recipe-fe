import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

interface Props {}

const LoadingComment = ({}: Props) => {
    return (
        <Container>
            <Skeleton width={'100%'} height={142} />
            <Skeleton width={'100%'} height={142} />
            <Skeleton width={'100%'} height={142} />
            <Skeleton width={'100%'} height={142} />
            <Skeleton width={'100%'} height={142} />
        </Container>
    );
};

const Container = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;
export default LoadingComment;

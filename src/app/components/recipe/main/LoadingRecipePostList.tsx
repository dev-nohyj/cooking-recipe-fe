import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { styled } from 'styled-components';

interface Props {}

const LoadingRecipePostList = ({}: Props) => {
    return (
        <Container>
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
            <Skeleton width={300} height={265} borderRadius={12} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 35px;
    max-width: 1024px;
    margin: 0 auto;
    gap: 24px;
    @media only screen and (max-width: 1024px) {
        max-width: 694px;
    }
    @media only screen and (max-width: 693px) {
        justify-content: center;
    }
`;

export default LoadingRecipePostList;

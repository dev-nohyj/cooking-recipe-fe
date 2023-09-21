import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {}

const Loading = ({}: Props) => {
    return (
        <>
            <Skeleton width={300} height={166} />
            <Skeleton width={300} height={166} />
            <Skeleton width={300} height={166} />
            <Skeleton width={300} height={166} />
            <Skeleton width={300} height={166} />
        </>
    );
};

export default Loading;

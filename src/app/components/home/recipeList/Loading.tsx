import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {}

const Loading = ({}: Props) => {
    return (
        <>
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
        </>
    );
};

export default Loading;

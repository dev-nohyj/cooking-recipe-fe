import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { PostListWrapper } from '../RecipeMain.style';

interface Props {}

const LoadingRecipePostList = ({}: Props) => {
    return (
        <PostListWrapper>
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
            <Skeleton width={300} height={255} borderRadius={12} />
        </PostListWrapper>
    );
};

export default LoadingRecipePostList;

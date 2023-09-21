import { colors } from '@/asset/colors';
import { TextButton } from '../../shared/button/TextButton';
import { CardList, Container } from '../Home.style';
import { TGetPopularFoodPostData } from '@/apis/foodPost/queries/useGetPopularFoodPostQuery';
import Loading from './Loading';
import FoodPostCard from '../../food/main/foodPostCard';

interface Props {
    onRouteFood: () => void;
    data: TGetPopularFoodPostData | undefined;
    isLoading: boolean;
}

const FoodListView = ({ onRouteFood, data, isLoading }: Props) => {
    return (
        <Container>
            <TextButton onClick={onRouteFood} fontSize="1.8rem" color={colors.sandyBrown}>
                음식 사진 둘러보기
            </TextButton>
            {isLoading ? (
                <CardList>
                    <Loading />
                </CardList>
            ) : (
                <CardList>
                    {data &&
                        data.foodPostList.map((v) => {
                            return <FoodPostCard key={`popularFoodPostCard-${v.id}`} data={v} isImgSize />;
                        })}
                </CardList>
            )}
        </Container>
    );
};

export default FoodListView;

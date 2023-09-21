import { colors } from '@/asset/colors';
import { TextButton } from '../../shared/button/TextButton';
import { CardList, Container } from '../Home.style';
import { TGetPopularRecipePostData } from '@/apis/recipePost/queries/useGetPopularRecipePostQuery';
import RecipePostCard from '../../recipe/main/RecipePostCard';
import Loading from './Loading';

interface Props {
    onRouteRecipe: () => void;
    isLoading: boolean;
    data: TGetPopularRecipePostData | undefined;
    onDetail: (id: number) => void;
    onLike: (recipePostId: number, likeType: boolean) => void;
    isLikeLoading: boolean;
}

const RecipeListView = ({ onRouteRecipe, isLoading, data, onDetail, onLike, isLikeLoading }: Props) => {
    return (
        <Container>
            <TextButton onClick={onRouteRecipe} fontSize="1.8rem" color={colors.sandyBrown}>
                레시피 둘러보기
            </TextButton>
            {isLoading ? (
                <CardList>
                    <Loading />
                </CardList>
            ) : (
                <CardList>
                    {data &&
                        data.recipePostList.map((v) => {
                            return (
                                <RecipePostCard
                                    key={`popularRecipePostCard-${v.id}`}
                                    data={v}
                                    onDetail={onDetail}
                                    onLike={onLike}
                                    isLikeLoading={isLikeLoading}
                                />
                            );
                        })}
                </CardList>
            )}
        </Container>
    );
};

export default RecipeListView;

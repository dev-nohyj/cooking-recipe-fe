import { nanoid } from 'nanoid';
import { CategoryList, LinkTo } from '../RecipeMain.style';

interface Props {
    recipePostCategory: {
        href: string;
        label: string;
        isActive: boolean;
    }[];
}

const RecipeCategoryView = ({ recipePostCategory }: Props) => {
    return (
        <nav>
            <CategoryList>
                {recipePostCategory.map((item) => {
                    return (
                        <li key={`cagtegory-${nanoid(6)}`}>
                            <LinkTo isActive={item.isActive} href={item.href}>
                                {item.label}
                            </LinkTo>
                        </li>
                    );
                })}
            </CategoryList>
        </nav>
    );
};

export default RecipeCategoryView;

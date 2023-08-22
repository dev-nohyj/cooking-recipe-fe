import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import * as Yup from 'yup';

export const RecipePostSchema = Yup.object().shape({
    title: Yup.string().required().trim().max(50),
    content: Yup.string()
        .required()
        .trim()
        .test(function (value) {
            if (value.replaceAll('<p><br></p>', '') === '') {
                return false;
            }
            return true;
        }),
    thumbnailUrl: Yup.string().required().trim().max(300),
    category: Yup.mixed<ValueOf<typeof RecipePostCategoryLabel>>()
        .oneOf(Object.values(RecipePostCategoryLabel))
        .required(),
    tags: Yup.array().of(Yup.string().required()).max(5).required(),
});

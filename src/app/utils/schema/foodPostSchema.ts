import * as Yup from 'yup';

export const FoodPostSchema = Yup.object().shape({
    description: Yup.string().trim().max(300),
    tags: Yup.array().of(Yup.string().required()).max(20).required(),
    foodImages: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().optional(),
                url: Yup.string().required(),
            }),
        )
        .max(6)
        .required()
        .test(function (value) {
            if (value.length === 0) {
                return false;
            }
            return true;
        }),
});

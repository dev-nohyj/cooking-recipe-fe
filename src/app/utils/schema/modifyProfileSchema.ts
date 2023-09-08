import * as Yup from 'yup';

export const ModifyProfileSchema = Yup.object().shape({
    nickname: Yup.string().required().max(50),
    introduction: Yup.string()
        .max(100)
        .test(function (value) {
            if (value === undefined) {
                return false;
            }
            return true;
        }),
});

import * as Yup from 'yup';

export const ModifyProfileSchema = Yup.object().shape({
    nickname: Yup.string().required().max(50),
    profileImageUrl: Yup.string().required().max(300),
    introduction: Yup.string().required().max(100),
});

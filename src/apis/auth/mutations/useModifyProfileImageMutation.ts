import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TModifyProfileImageVariables = {
    profileImageUrl: string | null;
};

export type TModifyProfileImageData = {
    profileImageUrl: string | null;
};

export const useModifyProfileImageMutation = (
    options?: UseMutationOptions<TModifyProfileImageData, AxiosError<TAxiosError>, TModifyProfileImageVariables>,
) => {
    return useMutation<TModifyProfileImageData, AxiosError<TAxiosError>, TModifyProfileImageVariables>(
        async (data) => {
            const res = await defaultAxios.patch('/auth/modifyProfileImage', data);
            return res.data;
        },
        { ...options },
    );
};

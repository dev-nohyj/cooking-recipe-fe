import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TModifyProfileVariables = {
    nickname: string;
    profileImageUrl: string | null;
    introduction: string | null;
};

export type TModifyProfileData = {
    nickname: string;
    profileImageUrl: string | null;
    introduction: string | null;
};

export const useModifyProfileMutation = (
    options?: UseMutationOptions<TModifyProfileData, AxiosError<TAxiosError>, TModifyProfileVariables>,
) => {
    return useMutation<TModifyProfileData, AxiosError<TAxiosError>, TModifyProfileVariables>(
        async (data) => {
            const res = await defaultAxios.put('/auth/modifyProfile', data);
            return res.data;
        },
        { ...options },
    );
};

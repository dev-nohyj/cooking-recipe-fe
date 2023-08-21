import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TLogoutData = boolean;

export const useLogoutMutation = (options?: UseMutationOptions<TLogoutData, AxiosError<TAxiosError>>) => {
    return useMutation<TLogoutData, AxiosError<TAxiosError>>(
        async () => {
            const { data } = await defaultAxios.post<TLogoutData>('/auth/logout');
            return data;
        },
        { ...options },
    );
};

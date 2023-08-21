import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TDeleteUserData = boolean;

export const useDeleteUserMutation = (options?: UseMutationOptions<TDeleteUserData, AxiosError<TAxiosError>>) => {
    return useMutation<TDeleteUserData, AxiosError<TAxiosError>>(
        async () => {
            const { data } = await defaultAxios.delete<TDeleteUserData>('/auth/deleteUser');
            return data;
        },
        { ...options },
    );
};

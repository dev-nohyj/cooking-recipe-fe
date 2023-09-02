import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TDeleteFoodPostVariables = {
    foodPostId: number;
};

export type TDeleteFoodPostData = {
    foodPostId: number;
};

export const useDeleteFoodPostMutation = (
    options?: UseMutationOptions<TDeleteFoodPostData, AxiosError<TAxiosError>, TDeleteFoodPostVariables>,
) => {
    return useMutation<TDeleteFoodPostData, AxiosError<TAxiosError>, TDeleteFoodPostVariables>(
        async (data) => {
            const res = await defaultAxios.delete(`/food/delete?foodPostId=${data.foodPostId}`);
            return res.data;
        },
        { ...options },
    );
};

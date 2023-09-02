import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TCreateFoodPostVariables = {
    foodImages: { url: string }[];
    tags: string[] | null;
    description: string | null;
};

export type TCreateFoodPostData = {
    id: number;
    description: string | null;
    author: { nickname: string; profileImageUrl: string | null };
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
};

export const useCreateFoodPostMutation = (
    options?: UseMutationOptions<TCreateFoodPostData, AxiosError<TAxiosError>, TCreateFoodPostVariables>,
) => {
    return useMutation<TCreateFoodPostData, AxiosError<TAxiosError>, TCreateFoodPostVariables>(
        async (data) => {
            const res = await defaultAxios.post('/food/create', data);
            return res.data;
        },
        { ...options },
    );
};

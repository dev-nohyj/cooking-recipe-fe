import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';

export type TModifyFoodPostVariables = {
    foodPostId: number;
    description: string | null;
    tags: string[] | null;
    foodImages: { id?: number; url: string }[];
};

export type TModifyFoodPostData = {
    id: number;
    description: string | null;
    author: {
        id: string;
        nickname: string;
        profileImageUrl: string | null;
        introduction: string | null;
    };
    foodImages: { id: number; url: string }[];
    isLike: boolean;
    likeCount: number;
    tags: { id: number; title: string }[];
    createdAt: Date;
    updatedAt: Date;
};

export const useModifyFoodPostMutation = (
    options?: UseMutationOptions<TModifyFoodPostData, AxiosError<TAxiosError>, TModifyFoodPostVariables>,
) => {
    return useMutation<TModifyFoodPostData, AxiosError<TAxiosError>, TModifyFoodPostVariables>(
        async (data) => {
            const res = await defaultAxios.put('/food/modify', data);
            return res.data;
        },
        { ...options },
    );
};

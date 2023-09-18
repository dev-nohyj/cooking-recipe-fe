import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { defaultAxios } from '../../config/axiosInstance/defaultAxios';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';

export type TCreateS3UrlVariables = {
    urlType: PresignedUrlTypeLabel;
    file: File;
    idx?: number;
};

export type TCreateS3UrlData = {
    s3Url: string;
};

export const useCreateS3UrlMutation = (
    options?: UseMutationOptions<TCreateS3UrlData, AxiosError<TAxiosError>, TCreateS3UrlVariables>,
) => {
    return useMutation<TCreateS3UrlData, AxiosError<TAxiosError>, TCreateS3UrlVariables>(
        async (data) => {
            const res = await defaultAxios.post<TCreateS3UrlData>('/awsS3/createS3Url', {
                urlType: data.urlType,
                contentType: data.file.type,
            });
            await axios.put(res.data.s3Url, data.file, {
                headers: {
                    'Content-Type': data.file.type,
                },
            });
            const convertImageUrl = res.data.s3Url.split('?Content-Type=image')[0];

            return { s3Url: convertImageUrl };
        },
        { ...options },
    );
};

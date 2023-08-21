import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ProviderLabel } from '@/asset/labels/providerLabel';
export type TUserProfile = {
    id: string;
    email: string;
    nickname: string;
    provider: ValueOf<typeof ProviderLabel>;
    profileImageUrl: string | null;
    introduction: string | null;
    createdAt: Date;
    updatedAt: Date;
};
export type TGetProfileData = {
    profile: TUserProfile | null;
};

export const GetProfileQueryKey = () => ['profile'];

export const GetProfileQueryFn = async (cookie?: string) => {
    const { data } = await defaultAxios.get<TGetProfileData>(
        '/auth/profile',
        cookie
            ? {
                  headers: { cookie: cookie },
              }
            : undefined,
    );

    return data;
};

export const useGetProfileQuery = (options?: UseQueryOptions<TGetProfileData, AxiosError<TAxiosError>>) => {
    return useQuery<TGetProfileData, AxiosError<TAxiosError>>(GetProfileQueryKey(), () => GetProfileQueryFn(), {
        ...options,
    });
};

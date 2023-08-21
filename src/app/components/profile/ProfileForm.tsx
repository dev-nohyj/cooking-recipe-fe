'use client';
import { useDeleteUserMutation } from '@/apis/auth/mutations/useDeleteUserMutation';
import { useModifyProfileMutation } from '@/apis/auth/mutations/useModifyProfileMutation';
import { GetProfileQueryKey, TGetProfileData, TUserProfile } from '@/apis/auth/queries/useGetProfileQuery';
import { ModifyProfileSchema } from '@/app/utils/schema/modifyProfileSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
    profile: TUserProfile;
}

const ProfileForm = ({ profile }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();

    const { mutate, isLoading } = useDeleteUserMutation({
        onError: () => {
            alert('시스템 에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.');
        },
        onSuccess: () => {
            cache.setQueryData<TGetProfileData>(GetProfileQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.profile = null;
                    });
                    return newData;
                }
                return prev;
            });
            router.replace('/');
        },
    });
    const onDelete = useCallback(() => {
        const isConfirm = confirm('정말로 탈퇴하시겠습니까?');
        if (isConfirm) {
            mutate();
        }
    }, []);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            nickname: profile?.nickname,
            introduction: profile?.introduction ?? '',
            profileImageUrl: profile?.profileImageUrl ?? '',
        },
        resolver: yupResolver(ModifyProfileSchema),
    });
    const { mutate: onModify, isLoading: isModifyProfileLoading } = useModifyProfileMutation({
        onError: () => {
            alert('프로필 수정에 실패했습니다.');
        },
    });

    const onSubmit = handleSubmit(
        (data) => {
            const { nickname, introduction, profileImageUrl } = data;
            const variable = {
                nickname,
                introduction: introduction.length === 0 ? null : introduction,
                profileImageUrl: profileImageUrl.length === 0 ? null : profileImageUrl,
            };
            // onModify(variable);
        },
        (err) => {},
    );

    return (
        <div>
            <input type="file" />
            <Controller
                control={control}
                name="nickname"
                render={({ field: { onChange, value } }) => {
                    return <input type="text" onChange={onChange} value={value} maxLength={50} placeholder="닉네임" />;
                }}
            />

            <Controller
                control={control}
                name="introduction"
                render={({ field: { onChange, value } }) => {
                    return <input type="text" onChange={onChange} value={value} maxLength={100} placeholder="소개" />;
                }}
            />
            <button onClick={onSubmit} disabled={isModifyProfileLoading}>
                정보 수정
            </button>
            <button disabled={isLoading} onClick={onDelete}>
                회원 탈퇴
            </button>
        </div>
    );
};

export default ProfileForm;

import { useModifyProfileImageMutation } from '@/apis/auth/mutations/useModifyProfileImageMutation';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useCreateS3UrlMutation } from '@/apis/aws/useCreateS3UrlMutation';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import ProfileimageView from './ProfileimageView';

interface Props {
    profileImageUrl: string | null;
}

const ProfileImage = ({ profileImageUrl }: Props) => {
    const cache = useQueryClient();

    const profileImageRef = useRef<HTMLInputElement>(null);
    const { mutate: modifyProfileImage, isLoading: modifyProfileLoading } = useModifyProfileImageMutation({
        onError: () => {
            alert('프로필 이미지 수정에 실패했습니다.');
        },
        onSuccess: (data) => {
            cache.setQueryData<TGetProfileData>(GetProfileQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        if (draft.profile) {
                            draft.profile.profileImageUrl = data.profileImageUrl;
                        }
                    });
                    return newData;
                }
            });
        },
    });

    const { mutate: uploadS3, isLoading: isS3Loading } = useCreateS3UrlMutation({
        onError: () => {
            alert('이미지 업로드에 실패했습니다.');
            if (profileImageRef.current) {
                profileImageRef.current.value = '';
            }
        },
        onSuccess: (data) => {
            modifyProfileImage({ profileImageUrl: data.s3Url });
        },
    });

    const onModifyImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const imageFile = e.target.files[0];
            uploadS3({
                urlType: PresignedUrlTypeLabel.userProfile,
                file: imageFile,
            });
        }
    }, []);

    const onDeleteImage = useCallback(() => {
        if (!profileImageUrl || modifyProfileLoading) return;
        modifyProfileImage({ profileImageUrl: null });
    }, [profileImageUrl, modifyProfileLoading]);

    const isImageLoading = useMemo(() => {
        return isS3Loading || modifyProfileLoading;
    }, [isS3Loading, modifyProfileLoading]);

    const props = {
        profileImageRef,
        onModifyImage,
        onDeleteImage,
        isImageLoading,
        profileImageUrl,
    };
    return <ProfileimageView {...props} />;
};

export default ProfileImage;

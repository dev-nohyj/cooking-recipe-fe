import { ChangeEvent, RefObject } from 'react';
import { ImageLabel, Img, ProfileImageContainer } from '../Profile.style';
import { commonImages } from '../../../../../public/images';
import { colors } from '@/asset/colors';
import { RectangleButton } from '../../shared/button/RectangleButton';

interface Props {
    profileImageRef: RefObject<HTMLInputElement>;
    onModifyImage: (e: ChangeEvent<HTMLInputElement>) => void;
    onDeleteImage: () => void;
    isImageLoading: boolean;
    profileImageUrl: string | null | undefined;
}

const ProfileimageView = ({
    profileImageRef,
    onModifyImage,
    onDeleteImage,
    isImageLoading,
    profileImageUrl,
}: Props) => {
    return (
        <ProfileImageContainer>
            <Img
                width={96}
                height={96}
                src={profileImageUrl ? profileImageUrl : commonImages.defaultProfile.uri}
                alt="profileImage"
            />
            <input
                ref={profileImageRef}
                className="file_input"
                id="profileImage"
                type="file"
                onChange={onModifyImage}
                disabled={isImageLoading}
            />
            <ImageLabel htmlFor="profileImage">이미지 업로드</ImageLabel>
            <RectangleButton color={colors.sandyBrown} backgroundColor={colors.white} onClick={onDeleteImage}>
                이미지 제거
            </RectangleButton>
        </ProfileImageContainer>
    );
};

export default ProfileimageView;

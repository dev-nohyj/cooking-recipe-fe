import { Control, Controller, FieldErrors } from 'react-hook-form';
import { BtnWrapper, Desc, ErrorMsg, ModifyProfileInput, ProfileContainer, Title } from '../Profile.style';
import { colors } from '@/asset/colors';
import { TModifyProfileInfo } from '.';
import { TextButton } from '../../shared/button/TextButton';

interface Props {
    isModify: boolean;
    onChangeModify: () => void;
    control: Control<
        {
            nickname: string;
            introduction: string;
        },
        any
    >;
    onSubmit: () => void;
    isModifyProfileLoading: boolean;
    nickname: string;
    introduction: string | null;
    errors: FieldErrors<TModifyProfileInfo>;
}

const ProfileInfoView = ({
    isModify,
    onChangeModify,
    control,
    onSubmit,
    isModifyProfileLoading,
    nickname,
    introduction,
    errors,
}: Props) => {
    return (
        <ProfileContainer>
            {isModify ? (
                <>
                    <Controller
                        control={control}
                        name="nickname"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <ModifyProfileInput
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    maxLength={50}
                                    placeholder="닉네임"
                                />
                            );
                        }}
                    />
                    {errors.nickname && <ErrorMsg>닉네임 형식에 맞게 변경해주세요. 필수 조건입니다.</ErrorMsg>}
                    <Controller
                        control={control}
                        name="introduction"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <ModifyProfileInput
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    maxLength={100}
                                    placeholder="간단한 소개를 작성해주세요."
                                />
                            );
                        }}
                    />
                    {errors.introduction && <ErrorMsg>소개 형식에 맞게 변경해주세요.</ErrorMsg>}
                    <BtnWrapper>
                        <TextButton onClick={onChangeModify} fontSize="1.6rem" color={colors.grey2}>
                            취소
                        </TextButton>
                        <TextButton
                            onClick={onSubmit}
                            disabled={isModifyProfileLoading}
                            fontSize="1.6rem"
                            color={colors.sandyBrown}
                        >
                            저장
                        </TextButton>
                    </BtnWrapper>
                </>
            ) : (
                <>
                    <Title>{nickname}</Title>
                    {introduction && <Desc>{introduction}</Desc>}

                    <BtnWrapper>
                        <TextButton onClick={onChangeModify} isUnderLine fontSize="1.6rem" color={colors.sandyBrown}>
                            수정
                        </TextButton>
                    </BtnWrapper>
                </>
            )}
        </ProfileContainer>
    );
};

export default ProfileInfoView;

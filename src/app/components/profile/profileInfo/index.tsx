import { useModifyProfileMutation } from '@/apis/auth/mutations/useModifyProfileMutation';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useSwitchState } from '@/app/hooks/useSwitchState';
import { ModifyProfileSchema } from '@/app/utils/schema/modifyProfileSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useForm } from 'react-hook-form';
import ProfileInfoView from './ProfileInfoView';

interface Props {
    nickname: string;
    introduction: string | null;
}

const ProfileInfo = ({ nickname, introduction }: Props) => {
    const cache = useQueryClient();
    const [isModify, onChangeModify] = useSwitchState();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nickname: nickname,
            introduction: introduction ?? '',
        },
        resolver: yupResolver(ModifyProfileSchema),
    });

    const { mutate: onModify, isLoading: isModifyProfileLoading } = useModifyProfileMutation({
        onError: () => {
            onChangeModify(false);
            alert('정보 수정에 실패했습니다.');
        },
        onSuccess: (data) => {
            onChangeModify(false);
            cache.removeQueries({ type: 'inactive' });
            cache.setQueryData<TGetProfileData>(GetProfileQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        if (draft.profile) {
                            draft.profile.nickname = data.nickname;
                            draft.profile.introduction = data.introduction;
                        }
                    });
                    return newData;
                }
                return prev;
            });
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (data.introduction === undefined) return;
        const variable = {
            nickname: data.nickname,
            introduction: data.introduction.length === 0 ? null : data.introduction,
        };
        if (variable.nickname === nickname && variable.introduction === introduction) {
            onChangeModify(false);
            return;
        }
        onModify(variable);
    });

    const props = {
        isModify,
        onChangeModify,
        control,
        onSubmit,
        isModifyProfileLoading,
        nickname,
        introduction,
        errors,
    };

    return <ProfileInfoView {...props} />;
};

export default ProfileInfo;

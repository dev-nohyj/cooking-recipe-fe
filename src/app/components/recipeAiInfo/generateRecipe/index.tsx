'use client';
import { useGenerateRecipe } from '@/app/hooks/useGenerateRecipe';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import GenerateRecipeView from './GenerateRecipeView';

interface Props {}

const GenerateRecipe = ({}: Props) => {
    const { handleSubmit, control, setValue } = useForm<{ content: string }>({
        defaultValues: {
            content: '',
        },
        resolver: yupResolver(
            Yup.object().shape({
                content: Yup.string().required().trim(),
            }),
        ),
    });
    const { mutate, result, isStreamLoading } = useGenerateRecipe();

    const onSubmit = handleSubmit(
        (data) => {
            mutate(data);
            setValue('content', '');
        },
        () => {
            alert('내용을 확인 해 주세요.');
        },
    );
    const onCopy = useCallback(() => {
        return toast('레시피 내용이 복사되었습니다.', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: true,
            pauseOnHover: true,
        });
    }, []);
    const onEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }, []);
    const props = {
        control,
        onEnter,
        isStreamLoading,
        onSubmit,
        result,
        onCopy,
    };
    return <GenerateRecipeView {...props} />;
};

export default GenerateRecipe;

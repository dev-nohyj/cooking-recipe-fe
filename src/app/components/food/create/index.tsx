'use client';
import { useCreateS3UrlMutation } from '@/apis/aws/useCreateS3UrlMutation';
import { useCreateFoodPostMutation } from '@/apis/foodPost/mutations/useCreateFoodPostMutation';
import { GetFoodPostQueryKey, TGetFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { useInputHashTag } from '@/app/hooks/useInputHashTag';
import { FoodPostSchema } from '@/app/utils/schema/foodPostSchema';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import ImageSection from '../forms/ImageSection';
import SubmitSection from '../../recipe/forms/SubmitSection';
import DescSection from '../forms/DescSection';
import TagSection from '../forms/TagSection';
import { Container } from '../forms/FoodForm.style';

interface Props {}

const Main = ({}: Props) => {
    const cache = useQueryClient();
    const router = useRouter();

    const { mutate: createPost, isLoading: isCreateLoading } = useCreateFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (data) => {
            cache.setQueryData<InfiniteData<TGetFoodPostData>>(GetFoodPostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages[0].foodPostList = [data, ...draft.pages[0].foodPostList];
                    });
                    return newData;
                }
            });
            router.replace(`/food/detail/${data.id}`);
        },
    });
    const { handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            description: '',
            tags: [],
            foodImages: [],
        },
        resolver: yupResolver(FoodPostSchema),
    });
    const setTags = useCallback((tags: string[]) => {
        setValue('tags', tags);
    }, []);

    const { inputHashTag, addHashTag, onDeleteTag, onKeyDownHandler, onChangeHashTagInput } = useInputHashTag(
        watch('tags'),
        setTags,
        20,
    );
    const onSubmit = handleSubmit(
        (data) => {
            const { description, tags, foodImages } = data;

            const variables = {
                description: !description || description.trim().length === 0 ? null : data.description!,
                tags: tags.length === 0 ? null : tags,
                foodImages,
            };
            createPost(variables);
        },
        (err) => {
            if (err.foodImages) {
                return alert('이미지를 추가해주세요.');
            }
        },
    );

    const onCancel = useCallback(() => {
        router.back();
    }, []);

    const { mutate, isLoading } = useCreateS3UrlMutation({
        onError: () => {
            alert('이미지 업로드에 실패했습니다.');
        },
        onSuccess: (data, variables) => {
            if (typeof variables.idx === 'number') {
                const foodImages = produce(watch('foodImages'), (draft) => {
                    draft[variables.idx!].url = data.s3Url;
                });
                setValue('foodImages', foodImages);
            } else {
                setValue('foodImages', [...watch('foodImages'), { url: data.s3Url }]);
            }
        },
    });

    const onUploadImg = useCallback(
        (e: ChangeEvent<HTMLInputElement>, idx?: number) => {
            if (e.target.files?.length) {
                const imageFile = e.target.files[0];
                mutate({
                    urlType: PresignedUrlTypeLabel.foodPostImage,
                    file: imageFile,
                    idx,
                });
                e.target.value = '';
            }
        },
        [watch('foodImages')],
    );
    const removeImg = useCallback(
        (idx: number) => {
            const foodImages = watch('foodImages').filter((_, index) => index !== idx);
            setValue('foodImages', foodImages);
        },
        [watch('foodImages')],
    );
    const imageProps = {
        onUploadImg,
        isLoading,
        foodImages: watch('foodImages'),
        removeImg,
    };
    const tagProps = {
        tags: watch('tags'),
        inputHashTag,
        addHashTag,
        onDeleteTag,
        onKeyDownHandler,
        onChangeHashTagInput,
    };
    const submitProps = {
        onSubmit,
        onCancel,
        isLoading: isCreateLoading,
    };

    return (
        <Container>
            <DescSection control={control} />
            <ImageSection {...imageProps} />
            <TagSection {...tagProps} />
            <SubmitSection {...submitProps} />
        </Container>
    );
};

export default Main;

import { useCreateS3UrlMutation } from '@/apis/aws/useCreateS3UrlMutation';
import { useModifyFoodPostMutation } from '@/apis/foodPost/mutations/useModifyFoodPostMutation';
import { GetFoodPostDetailQueryKey, TGetFoodPostDetailData } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
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
import { Container } from '../forms/FoodForm.style';
import DescSection from '../forms/DescSection';
import ImageSection from '../forms/ImageSection';
import TagSection from '../forms/TagSection';
import SubmitSection from '../../recipe/forms/SubmitSection';
import {
    GetPopularFoodPostQueryKey,
    TGetPopularFoodPostData,
} from '@/apis/foodPost/queries/useGetPopularFoodPostQuery';

interface Props {
    foodPostData: TGetFoodPostDetailData;
}

const ModifyForm = ({ foodPostData }: Props) => {
    const cache = useQueryClient();
    const router = useRouter();

    const { mutate: modifyPost, isLoading: isModifyLoading } = useModifyFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (data) => {
            cache.setQueryData<InfiniteData<TGetFoodPostData>>(GetFoodPostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.foodPostList.forEach((foodPost) => {
                                if (foodPost.id === data.id) {
                                    foodPost.description = data.description;
                                    foodPost.imageUrl = data.foodImages[0].url;
                                    foodPost.updatedAt = data.updatedAt;
                                }
                            });
                        });
                    });
                    return newData;
                }
            });
            cache.setQueryData<TGetFoodPostDetailData>(GetFoodPostDetailQueryKey({ foodPostId: data.id }), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.description = data.description;
                        draft.foodImages = data.foodImages;
                        draft.tags = data.tags;
                        draft.updatedAt = data.updatedAt;
                    });
                    return newData;
                }
            });
            cache.setQueryData<TGetPopularFoodPostData>(GetPopularFoodPostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.foodPostList.forEach((item) => {
                            if (item.id === data.id) {
                                item.description = data.description;
                                item.imageUrl = data.foodImages[0].url;
                                item.updatedAt = data.updatedAt;
                            }
                        });
                    });
                    return newData;
                }
            });
            router.replace(`/food/detail/${data.id}`);
        },
    });

    const { handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            description: foodPostData.description ?? '',
            tags: foodPostData.tags.map((v) => v.title),
            foodImages: foodPostData.foodImages,
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
                foodPostId: foodPostData.id,
                description: !description || description.trim().length === 0 ? null : data.description!,
                tags: tags.length === 0 ? null : tags,
                foodImages,
            };
            modifyPost(variables);
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
        isLoading: isModifyLoading,
        isModify: true,
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

export default ModifyForm;

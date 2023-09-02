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
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

interface Props {}

const Main = ({}: Props) => {
    const cache = useQueryClient();
    const router = useRouter();
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const { mutate: createPost, isLoading: isCreateLoading } = useCreateFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (data) => {
            alert('업로드를 완료했습니다.');
            cache.setQueryData<InfiniteData<TGetFoodPostData>>(GetFoodPostQueryKey(), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages[0].foodPostList = [
                            { ...data, isLike: false, likeCount: 0 },
                            ...draft.pages[0].foodPostList,
                        ];
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

    const { mutate, isLoading } = useCreateS3UrlMutation({
        onError: () => {
            alert('이미지 업로드에 실패했습니다.');
            if (uploadInputRef.current) {
                uploadInputRef.current.value = '';
            }
        },
        onSuccess: (data) => {
            setValue('foodImages', [...watch('foodImages'), { url: data.s3Url }]);
            if (uploadInputRef.current) {
                uploadInputRef.current.value = '';
            }
        },
    });

    const onUploadImg = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                if (watch('foodImages').length > 5) {
                    alert('최대 이미지 갯수를 초과했습니다.');
                    if (uploadInputRef.current) {
                        uploadInputRef.current.value = '';
                    }
                    return;
                }

                const imageFile = e.target.files[0];
                mutate({
                    urlType: PresignedUrlTypeLabel.foodPostImage,
                    file: imageFile,
                });
            }
        },
        [watch('foodImages'), uploadInputRef.current],
    );

    return (
        <Container>
            <div>
                <input
                    ref={uploadInputRef}
                    id="foodImage"
                    onChange={onUploadImg}
                    disabled={isLoading || watch('foodImages').length > 5}
                    type="file"
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                />
                {/* <label htmlFor="foodImage">+</label> */}
                <div>
                    {watch('foodImages').length > 0 &&
                        watch('foodImages').map((v) => {
                            return <p key={nanoid(6)}>{v.url}</p>;
                        })}
                </div>
            </div>
            <div>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => {
                        return (
                            <textarea
                                placeholder="내용을 입력해주세요."
                                maxLength={300}
                                onChange={onChange}
                                value={value}
                            />
                        );
                    }}
                />
            </div>
            <div>
                <p>HashTag (최대 20개)</p>
                {watch('tags').length > 0 &&
                    watch('tags').map((tag, idx) => {
                        return (
                            <span
                                onClick={() => {
                                    onDeleteTag(idx);
                                }}
                                key={`tag-${nanoid(6)}`}
                            >
                                {tag}
                            </span>
                        );
                    })}
                <input
                    type="text"
                    value={inputHashTag}
                    onKeyUp={addHashTag}
                    onKeyDown={onKeyDownHandler}
                    onChange={onChangeHashTagInput}
                    maxLength={30}
                />
            </div>
            <button disabled={isCreateLoading} onClick={onSubmit}>
                추가하기
            </button>
            <div>
                <button
                    onClick={() => {
                        router.back();
                    }}
                >
                    나가기
                </button>
            </div>
        </Container>
    );
};

const Container = styled.section``;

export default Main;

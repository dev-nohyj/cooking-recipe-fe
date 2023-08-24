import { useCreateS3UrlMutation } from '@/apis/aws/useCreateS3UrlMutation';
import { useModifyRecipePostMutation } from '@/apis/recipePost/mutations/useModifyRecipePostMutation';
import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { RecipePostSchema } from '@/app/utils/schema/recipePostSchema';
import { colors } from '@/asset/colors';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import EditorComponent from '../contents/EditorComponent';
import { nanoid } from 'nanoid';
import BottomSction from '../create/BottomSction';
import { useInputHashTag } from '@/app/hooks/useInputHashTag';
import { produce } from 'immer';

interface Props {
    recipePostData: TRecipePostDetailData;
}

const ModifyForm = ({ recipePostData }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();

    const uploadInputRef = useRef<HTMLInputElement>(null);

    const { handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            title: recipePostData.title,
            content: recipePostData.content,
            thumbnailUrl: recipePostData.thumbnailUrl,
            category: recipePostData.category,
            tags: recipePostData.tags.map((v) => v.title),
        },
        resolver: yupResolver(RecipePostSchema),
    });
    const setTags = useCallback((tags: string[]) => {
        setValue('tags', tags);
    }, []);

    const { inputHashTag, addHashTag, onDeleteTag, onKeyDownHandler, onChangeHashTagInput } = useInputHashTag(
        watch('tags'),
        setTags,
    );

    const { mutate: onModify, isLoading: isModifyLoading } = useModifyRecipePostMutation({
        onSuccess: (data) => {
            alert('게시물을 수정했습니다.');
            cache.removeQueries(['recipeList']);
            cache.setQueryData<TRecipePostDetailData>(RecipePostDetailQueryKey({ recipePostId: data.id }), (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.title = data.title;
                        draft.thumbnailUrl = data.thumbnailUrl;
                        draft.content = data.content;
                        draft.category = data.category;
                        draft.updatedAt = data.updatedAt;
                        draft.tags = data.tags;
                    });
                    return newData;
                }
            });

            router.replace(`/recipe/detail/${data.id}`);
        },
        onError: () => {
            alert('게시물 수정에 실패했습니다.');
        },
    });
    const onSubmit = handleSubmit(
        (data) => {
            const { tags } = data;
            const variables = {
                recipePostId: recipePostData.id,
                ...data,
                tags: tags.length === 0 ? null : tags,
            };
            onModify(variables);
        },
        (err) => {
            if (err.title) {
                return alert('제목을 입력하세요');
            }
            if (err.thumbnailUrl) {
                return alert('썸네일을 추가하세요');
            }
            if (err.content) {
                return alert('내용을 입력하세요');
            }
        },
    );

    const { mutate, isLoading } = useCreateS3UrlMutation({
        onSuccess: (data) => {
            setValue('thumbnailUrl', data.s3Url);
            if (uploadInputRef.current) {
                uploadInputRef.current.value = '';
            }
        },
        onError: () => {
            alert('썸네일 업로드에 실패했습니다.');
        },
    });

    const onUploadImg = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const imageFile = e.target.files[0];
            mutate({
                urlType: PresignedUrlTypeLabel.recipePostThumbnail,
                file: imageFile,
            });
        }
    }, []);

    return (
        <>
            <Container>
                <div>
                    <FileInput
                        ref={uploadInputRef}
                        type="file"
                        id="modifyImgeUpload"
                        onChange={onUploadImg}
                        disabled={isLoading}
                        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    />
                    <Label htmlFor="modifyImgeUpload">
                        {watch('thumbnailUrl') === '' ? '썸네일 업로드' : watch('thumbnailUrl')}
                    </Label>
                </div>
                <div>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <input
                                    type="text"
                                    placeholder="제목"
                                    value={value}
                                    onChange={onChange}
                                    maxLength={50}
                                />
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="category"
                        render={({ field: { value, onChange } }) => {
                            return (
                                <select
                                    name="카테고리"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(Number(e.target.value));
                                    }}
                                >
                                    <option value={RecipePostCategoryLabel.korean}>한식</option>
                                    <option value={RecipePostCategoryLabel.chinese}>중식</option>
                                    <option value={RecipePostCategoryLabel.japanese}>일식</option>
                                    <option value={RecipePostCategoryLabel.western}>양식</option>
                                    <option value={RecipePostCategoryLabel.etc}>기타</option>
                                </select>
                            );
                        }}
                    />
                </div>
                <EditorComponent control={control} />
                <div>
                    <p>HashTag (최대 5개)</p>
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
            </Container>
            <BottomSction onSubmit={onSubmit} isLoading={isModifyLoading} isModify />
        </>
    );
};

const Container = styled.section`
    max-width: 840px;
    margin: 0 auto;
    margin-top: 50px;
`;

const FileInput = styled.input`
    display: none;
`;

const Label = styled.label`
    border: 1px solid ${colors.black};
    padding: 2px;
    cursor: pointer;
`;

export default ModifyForm;

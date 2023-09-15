import { useCreateS3UrlMutation } from '@/apis/aws/useCreateS3UrlMutation';
import { useModifyRecipePostMutation } from '@/apis/recipePost/mutations/useModifyRecipePostMutation';
import { RecipePostDetailQueryKey, TRecipePostDetailData } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { RecipePostSchema } from '@/app/utils/schema/recipePostSchema';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { RecipePostCategoryLabel, categoryValue } from '@/asset/labels/recipePostLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useInputHashTag } from '@/app/hooks/useInputHashTag';
import { produce } from 'immer';
import SubmitSection from '../forms/SubmitSection';
import { Container } from '../forms/RecipeForm.style';
import CategoryDropdown from '../forms/CategoryDropdown';
import InputSection from '../forms/InputSection';
import { useOutsideClick } from '@/app/hooks/useOutsizeClick';
import EditorComponent from '../forms/editorComponent';

interface Props {
    recipePostData: TRecipePostDetailData;
}

const ModifyForm = ({ recipePostData }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();

    const categoryRef = useRef(null);
    const [isActive, onTargetClick] = useOutsideClick(categoryRef);

    const goBack = useCallback(() => {
        router.back();
    }, []);
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
    const categoryList = [
        {
            title: '한식',
            onClick: () => {
                onTargetClick();
                setValue('category', RecipePostCategoryLabel.korean);
            },
            isActive: watch('category') === RecipePostCategoryLabel.korean,
        },
        {
            title: '중식',
            onClick: () => {
                onTargetClick();
                setValue('category', RecipePostCategoryLabel.chinese);
            },
            isActive: watch('category') === RecipePostCategoryLabel.chinese,
        },
        {
            title: '일식',
            onClick: () => {
                onTargetClick();
                setValue('category', RecipePostCategoryLabel.japanese);
            },
            isActive: watch('category') === RecipePostCategoryLabel.japanese,
        },
        {
            title: '양식',
            onClick: () => {
                onTargetClick();
                setValue('category', RecipePostCategoryLabel.western);
            },
            isActive: watch('category') === RecipePostCategoryLabel.western,
        },
        {
            title: '기타',
            onClick: () => {
                onTargetClick();
                setValue('category', RecipePostCategoryLabel.etc);
            },
            isActive: watch('category') === RecipePostCategoryLabel.etc,
        },
    ];
    const categoryText = useMemo(() => {
        return categoryValue[watch('category')];
    }, [watch('category')]);

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
    const categoryProps = {
        categoryRef,
        isActive,
        onTargetClick,
        categoryList,
        categoryText,
    };
    const inputProps = {
        uploadInputRef,
        onUploadImg,
        isLoading,
        watch,
        control,
        inputHashTag,
        addHashTag,
        onDeleteTag,
        onKeyDownHandler,
        onChangeHashTagInput,
    };
    const submitProps = {
        onSubmit,
        isLoading: isModifyLoading,
        onCancel: goBack,
        isModify: true,
    };
    return (
        <Container>
            <CategoryDropdown {...categoryProps} />
            <InputSection {...inputProps} />
            <EditorComponent control={control} />
            <SubmitSection {...submitProps} />
        </Container>
    );
};

export default ModifyForm;

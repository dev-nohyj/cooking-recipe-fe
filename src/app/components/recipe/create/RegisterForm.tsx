import { useCreateS3UrlMutation } from '@/apis/aws/useCreateS3UrlMutation';
import { useCreateRecipePostMutation } from '@/apis/recipePost/mutations/useCreateRecipePostMutation';
import { RecipePostSchema } from '@/app/utils/schema/recipePostSchema';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { RecipePostCategoryLabel, categoryValue } from '@/asset/labels/recipePostLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import SubmitSection from '../forms/SubmitSection';
import { useRouter } from 'next/navigation';
import { useInputHashTag } from '@/app/hooks/useInputHashTag';
import { TGetRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { produce } from 'immer';
import CategoryDropdown from '../forms/CategoryDropdown';
import { useOutsideClick } from '@/app/hooks/useOutsizeClick';
import { Container } from '../forms/RecipeForm.style';
import InputSection from '../forms/InputSection';
import EditorComponent from '../forms/editorComponent';

interface Props {}

const RegisterForm = ({}: Props) => {
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
            title: '',
            content: '',
            thumbnailUrl: '',
            category: RecipePostCategoryLabel.korean,
            tags: [],
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

    const { mutate: onCreate, isLoading: isCreateLoading } = useCreateRecipePostMutation({
        onSuccess: (data, variables) => {
            alert('업로드를 완료했습니다.');
            cache.setQueryData<InfiniteData<TGetRecipePostData>>(['recipeList', null], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages[0].recipePostList = [
                            { ...data, isLike: false, likeCount: 0 },
                            ...draft.pages[0].recipePostList,
                        ];
                    });
                    return newData;
                }
            });
            cache.setQueryData<InfiniteData<TGetRecipePostData>>(['recipeList', variables.category], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages[0].recipePostList = [
                            { ...data, isLike: false, likeCount: 0 },
                            ...draft.pages[0].recipePostList,
                        ];
                    });
                    return newData;
                }
            });

            router.replace(`/recipe/detail/${data.id}`);
        },
        onError: () => {
            alert('포스팅에 실패했습니다. 잠시 후 다시 시도해 주세요');
        },
    });

    const onSubmit = handleSubmit(
        (data) => {
            const { tags } = data;
            const variables = {
                ...data,
                tags: tags.length === 0 ? null : tags,
            };
            onCreate(variables);
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
        isLoading: isCreateLoading,
        onCancel: goBack,
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

export default RegisterForm;

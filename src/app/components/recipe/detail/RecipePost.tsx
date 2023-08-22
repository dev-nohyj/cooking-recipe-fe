'use client';
import { RecipePostDetailQueryKey, useRecipePostDetailQuery } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { useCallback, useEffect } from 'react';
import RecipeContainer from '../contents/RecipeContainer';
import TopSection from '../contents/TopSection';
import sanitizeHtml from 'sanitize-html';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { GetProfileQueryKey, TGetProfileData } from '@/apis/auth/queries/useGetProfileQuery';
import { useRouter } from 'next/navigation';
import { useDeleteRecipePostMutation } from '@/apis/recipePost/mutations/useDeleteRecipePostMutation';
import { TGetRecipePostData } from '@/apis/recipePost/queries/useGetRecipePostQuery';
import { produce } from 'immer';

interface Props {
    recipePostId: number;
}

const RecipePost = ({ recipePostId }: Props) => {
    const cache = useQueryClient();
    const router = useRouter();
    const user = cache.getQueryData<TGetProfileData>(GetProfileQueryKey());
    const { data, error } = useRecipePostDetailQuery({ recipePostId });
    const { mutate, isLoading } = useDeleteRecipePostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (_, variables) => {
            router.replace('/recipe');
            cache.setQueriesData<InfiniteData<TGetRecipePostData>>(['recipeList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.recipePostList = list.recipePostList.filter((item) => {
                                return item.id !== variables.recipePostId;
                            });
                        });
                    });
                    return newData;
                }
            });
            cache.setQueryData(RecipePostDetailQueryKey(variables), undefined);
            cache.removeQueries(RecipePostDetailQueryKey(variables));
        },
    });

    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);
    const onModify = useCallback(() => {
        router.push(`/recipe/write?recipePostId=${recipePostId}`);
    }, [recipePostId]);
    const onDelete = useCallback(() => {
        const checkDelete = confirm('정말로 삭제하시겠습니까?');
        if (!checkDelete) return;
        mutate({
            recipePostId,
        });
    }, [recipePostId]);

    if (!data) return <></>;
    return (
        <section>
            <RecipeContainer>
                {user?.profile?.id === data.authorId}
                <div>
                    <button onClick={onModify}>수정</button>
                    <button disabled={isLoading} onClick={onDelete}>
                        삭제
                    </button>
                </div>
                <TopSection date={data.createdAt} title={data.title} />
                <div
                    className="recipePost"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(data.content, {
                            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'ins', 'del']),
                            allowedAttributes: {
                                '*': ['class', 'style'],
                                img: ['src', 'alt', 'draggable'],
                                a: ['href', 'rel', 'target'],
                            },
                        }),
                    }}
                />
            </RecipeContainer>
        </section>
    );
};

export default RecipePost;

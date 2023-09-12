import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
export type TRecipePostCommentData = {
    id: number;
    comment: string;
    writer: { id: string; profileImageUrl: string | null; nickname: string } | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};
export type TGetCommentData = {
    hasMore: boolean;
    commentList: TRecipePostCommentData[];
};

export type TGetCommentVariables = {
    recipePostId: number;
    parentId?: number;
};

export const GetCommentQueryKey = (variable: TGetCommentVariables) => [
    'recipeCommentList',
    variable.recipePostId,
    variable.parentId,
];

export const GetCommentQueryFn = async (variable: TGetCommentVariables, cursor: number | undefined) => {
    let url = `/recipe/comment?size=20&recipePostId=${variable.recipePostId}`;
    if (variable.parentId) {
        url = url + `&parentId=${variable.parentId}`;
    }
    if (cursor) {
        url = url + `&cursor=${cursor}`;
    }
    const { data } = await defaultAxios.get(url);
    return data;
};

export const useGetCommentQuery = (
    variable: TGetCommentVariables,
    options?: UseInfiniteQueryOptions<TGetCommentData, AxiosError<TAxiosError>>,
) => {
    return useInfiniteQuery<TGetCommentData, AxiosError<TAxiosError>>(
        GetCommentQueryKey(variable),
        ({ pageParam }) => GetCommentQueryFn(variable, pageParam),
        {
            ...options,
            getNextPageParam: (lastPage) => {
                if (!lastPage.hasMore) return undefined;
                const cursor = lastPage.commentList[lastPage.commentList.length - 1].id;
                return cursor;
            },
        },
    );
};

'use client';
import { useRecipePostDetailQuery } from '@/apis/recipePost/queries/useRecipePostDetailQuery';
import { useEffect, useMemo } from 'react';
import { useGetProfileQuery } from '@/apis/auth/queries/useGetProfileQuery';
import { useRouter } from 'next/navigation';
import Content from './content';
import Comment from './comment';

interface Props {
    recipePostId: number;
}

const RecipePost = ({ recipePostId }: Props) => {
    const router = useRouter();
    const { data: user } = useGetProfileQuery();
    const { data, error } = useRecipePostDetailQuery({ recipePostId });

    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
            if (error.response?.data.customErrorCode === 204) {
                router.replace('/recipe');
            }
        }
    }, [error]);

    const isAuthor = useMemo(() => {
        return user?.profile?.id === data?.author.id;
    }, [user?.profile?.id, data?.author.id]);

    if (!data) return <></>;
    const contentProps = {
        data,
        recipePostId,
        isAuthor,
        isLogin: !!user?.profile,
    };
    const commentProps = {
        commentCount: data.commentCount,
        recipePostId,
        user,
    };

    return (
        <>
            <Content {...contentProps} />
            <Comment {...commentProps} />
        </>
    );
};

export default RecipePost;

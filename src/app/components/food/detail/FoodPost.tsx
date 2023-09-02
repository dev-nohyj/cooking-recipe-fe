'use client';
import { useDeleteFoodPostMutation } from '@/apis/foodPost/mutations/useDeleteFoodPostMutation';
import { useGetFoodPostDetailQuery } from '@/apis/foodPost/queries/useGetFoodPostDetailQuery';
import { TGetFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface Props {
    foodPostId: number;
}

const FoodPost = ({ foodPostId }: Props) => {
    const router = useRouter();
    const cache = useQueryClient();
    const { data, error } = useGetFoodPostDetailQuery({ foodPostId });
    useEffect(() => {
        if (error) {
            alert(error.response?.data.message ?? '에러가 발생했습니다.');
        }
    }, [error]);

    const { mutate, isLoading } = useDeleteFoodPostMutation({
        onError: (err) => {
            alert(err.response?.data.message ?? '에러가 발생했습니다.');
        },
        onSuccess: (data) => {
            router.replace('/food');
            cache.setQueriesData<InfiniteData<TGetFoodPostData>>(['foodPostList'], (prev) => {
                if (prev) {
                    const newData = produce(prev, (draft) => {
                        draft.pages.forEach((list) => {
                            list.foodPostList = list.foodPostList.filter((item) => {
                                return item.id !== data.foodPostId;
                            });
                        });
                    });
                    return newData;
                }
            });
        },
    });
    const onModify = useCallback(() => {
        router.push(`/food/write?foodPostId=${foodPostId}`);
    }, [foodPostId]);
    const onDelete = useCallback(() => {
        const checkDelete = confirm('정말로 삭제하시겠습니까?');
        if (!checkDelete) return;
        mutate({ foodPostId });
    }, [foodPostId]);

    if (!data) return;
    return (
        <div>
            <div>
                <button onClick={onModify}>수정</button>
                <button onClick={onDelete} disabled={isLoading}>
                    삭제
                </button>
            </div>
            {data.description && <p>{data.description}</p>}
            {data.tags.map((v) => {
                return <p key={`tag-${nanoid(6)}`}>{v.title}</p>;
            })}
            <p>{data.author.nickname}</p>
            <button>{data.isLike ? 'like' : 'unLike'}</button>
            <p>좋아요: {data.likeCount}개</p>
            {data.foodImages.map((v) => {
                return <Image key={`foodImage-${v.id}`} src={v.url} alt={`foodImg-${v.id}`} width={200} height={100} />;
            })}
        </div>
    );
};

export default FoodPost;

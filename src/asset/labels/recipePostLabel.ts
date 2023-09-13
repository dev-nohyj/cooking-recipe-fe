export const CategoryAllType = ['korean', 'chinese', 'japanese', 'western', 'etc', undefined];
export const RecipePostCategoryLabel = {
    korean: 1,
    chinese: 2,
    japanese: 3,
    western: 4,
    etc: 5,
} as const;
export const categoryValue = {
    1: '한식',
    2: '중식',
    3: '일식',
    4: '양식',
    5: '기타',
};
export enum LikeTypeLabel {
    like = 1,
    unLike = 0,
}

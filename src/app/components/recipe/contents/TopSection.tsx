import { useMemo } from 'react';
import moment from 'moment-timezone';
import { styled } from 'styled-components';
import { colors } from '../../../../asset/colors';
import { MobileSize } from '../../../../asset/const/deviceSize';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';

interface Props {
    date: Date;
    title: string;
    category: ValueOf<typeof RecipePostCategoryLabel>;
}

const TopSection: React.FC<Props> = ({ date, title, category }) => {
    const convertDate = useMemo(() => {
        return moment(date).format('YYYY년 MM월 DD일');
    }, [date]);
    const categoryLabel = useMemo(() => {
        switch (category) {
            case RecipePostCategoryLabel.korean:
                return '한식';
            case RecipePostCategoryLabel.chinese:
                return '중식';
            case RecipePostCategoryLabel.japanese:
                return '일식';
            case RecipePostCategoryLabel.western:
                return '양식';
            case RecipePostCategoryLabel.etc:
                return '기타';
            default:
                return '';
        }
    }, [category]);
    return (
        <>
            <Wrapper>
                <Text>{convertDate}</Text>
                <Text>{categoryLabel}</Text>
            </Wrapper>
            <MarginView size={'25px'} />
            <Title>{title}</Title>
            <MarginView size={'52px'} />
        </>
    );
};
const Title = styled.h1`
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    letter-spacing: -0.03em;
    color: ${colors.black};
    white-space: pre-line;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 24px;
        line-height: 29px;
    }
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Text = styled.span`
    font-weight: 300;
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -0.03em;
    color: ${colors.grey0};
    white-space: pre-line;

    @media only screen and (max-width: ${MobileSize}) {
        font-size: 16px;
        line-height: 19px;
    }
`;

const MarginView = styled.div<{ size: string }>`
    width: 100%;
    height: ${(props) => props.size};
`;

export default TopSection;

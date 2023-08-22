import { useMemo } from 'react';
import moment from 'moment-timezone';
import { styled } from 'styled-components';
import { colors } from '../../../../asset/colors';
import { MobileSize } from '../../../../asset/const/deviceSize';

interface Props {
    date: Date;
    title: string;
}

const TopSection: React.FC<Props> = ({ date, title }) => {
    const convertDate = useMemo(() => {
        return moment(date).format('YYYY년 MM월 DD일');
    }, [date]);
    return (
        <>
            <Date>{convertDate}</Date>
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

const Date = styled.span`
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

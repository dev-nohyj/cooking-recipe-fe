import Main from '@/app/components/food/main/Main';
import Link from 'next/link';

interface Props {}

const FoodMainPage = ({}: Props) => {
    return (
        <>
            <Link href={'/food/write'}>생성</Link>
            <Main />
        </>
    );
};

export default FoodMainPage;

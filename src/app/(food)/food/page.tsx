import Main from '@/app/components/food/main/Main';
import Link from 'next/link';

interface Props {}

const FoodMainPage = ({}: Props) => {
    return (
        <main>
            <Link href={'/food/write'}>생성</Link>
            <Main />
        </main>
    );
};

export default FoodMainPage;

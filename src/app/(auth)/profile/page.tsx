import Main from '@/app/components/profile/Main';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {}

const ProfilePage = ({}: Props) => {
    const cookie = cookies().get(process.env.COOKIE as string);
    if (!cookie) {
        redirect('/');
    }
    return (
        <main>
            <Main />
        </main>
    );
};

export default ProfilePage;

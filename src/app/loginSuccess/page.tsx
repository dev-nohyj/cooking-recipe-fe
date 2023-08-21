import { loginRedirectLabel } from '@/asset/labels/loginLabel';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        isNewUser: string;
    };
}

const LoginSuccessPage = ({ searchParams: { isNewUser } }: Props) => {
    switch (parseInt(isNewUser)) {
        case loginRedirectLabel.newUser:
            redirect('/profile');
        case loginRedirectLabel.existingUser:
            redirect('/');
        default:
            redirect('/');
    }
};

export default LoginSuccessPage;

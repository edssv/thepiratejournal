import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/useNextAuth';

const AuthOutlet: React.FC<any> = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return redirect('/');

    return children ?? null;
};

export default AuthOutlet;

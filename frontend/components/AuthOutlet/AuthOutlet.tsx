import { redirect } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export const AuthOutlet: React.FC<any> = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return redirect('/');

    return children ?? null;
};

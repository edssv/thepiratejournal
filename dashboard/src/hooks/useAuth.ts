import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectIsLoading } from '../redux/slices/auth';

export const useAuth = () => {
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectIsLoading);

    return useMemo(() => ({ user, isLoading }), [user, isLoading]);
};

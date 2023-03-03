import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsLoading } from '../redux/slices/auth';

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectIsLoading);

    return useMemo(() => ({ user, isLoading }), [user, isLoading]);
};

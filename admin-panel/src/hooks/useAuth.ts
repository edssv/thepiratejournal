import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectIsLoading } from '../redux/slices/authSlice';

export const useAuth = () => {
    const isAuth = Boolean(useSelector(selectUser));
    const isLoading = useSelector(selectIsLoading);

    return useMemo(() => ({ isAuth, isLoading }), [isAuth, isLoading]);
};

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { api, authApi } from '../redux';
import { selectCurrentUser } from '../redux/slices/authSlice';

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);

    const { isLoading } = authApi.useGetCurrentUserQuery(undefined, {
        selectFromResult: ({ isLoading }) => ({ isLoading }),
    });

    return useMemo(() => ({ user, isLoading }), [user, isLoading]);
};

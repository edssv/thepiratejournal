import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/authSlice';

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);

    return useMemo(() => ({ user }), [user]);
};

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectCurrentUser } from '../redux/slices/authSlice';

export const useAuth = () => {
    const user = useSelector(selectCurrentUser);
    const accessToken = useSelector(selectAccessToken);

    return useMemo(() => ({ user, accessToken }), [user, accessToken]);
};

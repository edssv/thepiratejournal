import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

export const useUser = () => {
    const user = useSelector(selectUser);

    return useMemo(() => ({ user }), [user]);
};

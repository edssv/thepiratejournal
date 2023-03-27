import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user/user.slice';

export const useUser = () => {
    const user = useSelector(selectUser);

    return useMemo(() => ({ user }), [user]);
};

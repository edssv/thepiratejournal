'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/user';

export const useUser = () => {
    const user = useSelector(selectUser);

    return useMemo(() => ({ user }), [user]);
};

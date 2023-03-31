import { useQuery } from '@tanstack/react-query';

import { AuthService } from '@/services';

export const useProfile = () => {
    const { data } = useQuery(['get profile'], () => AuthService.getProfile(), {
        select: ({ data }) => data,
    });

    return { profile: data };
};

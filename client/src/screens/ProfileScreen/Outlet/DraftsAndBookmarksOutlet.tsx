import { useRouter } from 'next/router';

import { useGetUser } from '@/services';

export const DraftsAndBookmarksOutlet = () => {
    const { query, pathname } = useRouter();
    const activeSection = pathname.split('/')[2];
    const { data, isLoading } = useGetUser(query.id as string, activeSection);

    if (isLoading) return null;

    return null;
};

import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Overlay } from '.';
import { useGetUserQuery } from '../redux';

export const DraftsAndBookmarksOutlet = () => {
    const { username } = useParams();
    const { data, isLoading } = useGetUserQuery(username);

    if (isLoading) return <Overlay />;

    return data?.isOwner ? <Outlet /> : <Navigate to={`/users/${data?.user.username}`} />;
};

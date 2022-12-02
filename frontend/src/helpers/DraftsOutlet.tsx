import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Overlay } from '../components';
import { useGetUserQuery } from '../redux';

export const DraftsOutlet = () => {
    const { username } = useParams();
    const { data, isLoading } = useGetUserQuery(username);

    if (isLoading) return <Overlay />;

    return data?.isOwner ? <Outlet /> : <Navigate to={`/users/${data?.user.username}`} />;
};

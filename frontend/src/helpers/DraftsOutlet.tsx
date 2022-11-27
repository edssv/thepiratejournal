import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Overlay } from '../components';
import { useGetUserQuery } from '../redux';

export const DraftsOutlet = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetUserQuery(id);

    if (isLoading) return <Overlay />;

    return data?.isOwner ? <Outlet /> : <Navigate to={`/users/${data?.user.username}`} />;
};

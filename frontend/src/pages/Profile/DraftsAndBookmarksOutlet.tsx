import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { Overlay } from '../../components';
import { useGetUserQuery } from '../../redux';

export const DraftsAndBookmarksOutlet = () => {
    const { username } = useParams();
    const location = useLocation();
    const activeSection = location.pathname.split('/')[2];
    const { data, isLoading } = useGetUserQuery({ username, category: activeSection });

    if (isLoading) return null;

    return data?.isOwner ? <Outlet /> : <Navigate to={`/@${data?.user.username}`} />;
};

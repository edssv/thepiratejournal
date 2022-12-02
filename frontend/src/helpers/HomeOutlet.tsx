import Articles from '../pages/Articles';
import Home from '../pages/Home';
import { Overlay } from '../components';
import { useAuth } from '../hooks';

export const HomeOutlet = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <Overlay />;

    return user ? <Home /> : <Articles />;
};

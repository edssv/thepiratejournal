import { ProgressCircle } from '@adobe/react-spectrum';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Canvas } from '../components';
import { useAuth } from '../hooks/useAuth';

export const AuthOutlet = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = <Navigate to="/" state={{ from: location }} />;

    if (isLoading)
        return (
            <ProgressCircle
                position="absolute"
                isIndeterminate
                size="L"
                left="50%"
                top="50%"
                aria-label="Загрузка..."
            />
        );

    return user ? (
        navigate
    ) : (
        <Canvas>
            <Outlet />
        </Canvas>
    );
};

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface RefreshTokenHandlerProps {
    setInterval: React.Dispatch<React.SetStateAction<number>>;
}

const RefreshTokenHandler: React.FC<RefreshTokenHandlerProps> = ({ setInterval }) => {
    // const { data: session } = useSession();

    // useEffect(() => {
    //     if (!!session) {
    //         const timeRemaining = Math.round((session.accessTokenExpiry - Date.now()) / 1000);
    //         console.log(timeRemaining);
    //         setInterval(timeRemaining > 0 ? timeRemaining : 0);
    //     }
    // }, [session]);

    return null;
};

export default RefreshTokenHandler;

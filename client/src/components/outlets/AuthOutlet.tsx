import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const AuthOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  if (isLoading) return null;

  if (user) {
    router.replace(getPublicUrl.home());
    return null;
  }

  return <>{children}</>;
};

export default AuthOutlet;

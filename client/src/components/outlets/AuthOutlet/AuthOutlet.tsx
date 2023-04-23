import { useRouter } from 'next/router';

import { useAuth } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const AuthOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { replace } = useRouter();

  if (isLoading) return null;

  if (user) {
    replace(getPublicUrl.home());
    return null;
  }

  return <>{children}</>;
};

export default AuthOutlet;

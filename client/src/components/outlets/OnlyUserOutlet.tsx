import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const OnlyUserOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const { isLoading, user } = useAuth();

  if (isLoading) return null;

  if (!user) {
    router.replace(getPublicUrl.home());
    return null;
  }

  return <>{children}</>;
};

export default OnlyUserOutlet;

import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

interface EditArticleOutletProps {
  authorId: number;
}

const EditArticleOutlet: React.FC<React.PropsWithChildren<EditArticleOutletProps>> = ({ authorId, children }) => {
  const router = useRouter();

  const { isLoading, user } = useAuth();

  if (isLoading) return null;

  if (!user || user.id !== authorId) {
    router.replace(getPublicUrl.home());
    return null;
  }

  return <>{children}</>;
};

export default EditArticleOutlet;

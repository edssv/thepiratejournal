import { useAuth } from '@/hooks';

import { SignOut } from './SignOut/SignOut';

const Bookmarks = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) return <h3>Раздел в разработке.</h3>;

  return <SignOut />;
};

export default Bookmarks;

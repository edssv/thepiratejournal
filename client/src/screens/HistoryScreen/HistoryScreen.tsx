import { useAuth } from '@/hooks';

import { SignOut } from './SignOut/SignOut';

const History = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) return <h3>Раздел в разработке.</h3>;

  return <SignOut />;
};

export default History;

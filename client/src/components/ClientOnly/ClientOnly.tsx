import { useEffect, useState } from 'react';

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return null;
};

export default ClientOnly;

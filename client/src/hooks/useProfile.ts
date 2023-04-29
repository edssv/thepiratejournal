import { useGetProfileQuery } from '@/services/auth/auth.service';

export const useProfile = () => {
  const { data } = useGetProfileQuery();

  return { profile: data };
};

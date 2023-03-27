import { useTypedSelector } from './useAppDispatch';

export const useAuth = () => useTypedSelector((state) => state.user);

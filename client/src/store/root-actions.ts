import { uiSlice } from './ui/ui';
import { userSlice } from './user/user.slice';

export const rootActions = {
  ...userSlice.actions,
  ...uiSlice.actions
};

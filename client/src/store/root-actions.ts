import { editorPageSlice } from './editor-page/editor-page.slice';
import { filterSlice } from './slices/filter';
import { uiSlice } from './slices/ui';
import { userSlice } from './user/user.slice';

export const rootActions = {
  ...userSlice.actions,
  ...filterSlice.actions,
  ...editorPageSlice.actions,
  ...uiSlice.actions
};

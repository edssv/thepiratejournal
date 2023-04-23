import { editorPageSlice } from './editor-page/editor-page.slice';
import { uiSlice } from './slices/ui';
import { filterSlice } from './slices/filter';
import { userSlice } from './user/user.slice';

export const rootActions = {
  ...userSlice.actions,
  ...filterSlice.actions,
  ...editorPageSlice.actions,
  ...uiSlice.actions,
};

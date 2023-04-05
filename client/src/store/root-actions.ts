import * as userActions from './user/user.actions';
import * as editorPageActions from './editor-page/editor-page.actions';
import { editorPageSlice } from './editor-page/editor-page.slice';
import { uiSlice } from './slices/ui';
import { filterSlice } from './slices/filter';

export const rootActions = {
  ...userActions,
  ...editorPageActions,
  ...filterSlice.actions,
  ...editorPageSlice.actions,
  ...uiSlice.actions,
};

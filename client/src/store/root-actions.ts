import * as userActions from './user/user.actions';
import { editorPageSlice } from './slices/editor-page';
import { uiSlice } from './slices/ui';
import { filterSlice } from './slices/filter';

export const rootActions = {
    ...userActions,
    ...filterSlice.actions,
    ...editorPageSlice.actions,
    ...uiSlice.actions,
};

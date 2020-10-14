import { SHOW_SIDEBAR, HIDE_SIDEBAR } from './types';

// Open Sidebar
export const openSidebar = () => async dispatch => {
  dispatch({
    type: SHOW_SIDEBAR,
    payload: true
  });
};

export const closeSidebar = () => async dispatch => {
  dispatch({
    type: HIDE_SIDEBAR,
    payload: false
  });
};

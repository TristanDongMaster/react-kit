import merge from 'lodash/merge';
import * as AppConst from '../constants/AppConst';
import { insertChildren, insertNode } from 'MODULES/pub/tree';

const initialState = {
  userInfo: {},
  menuList: AppConst.MENU_LIST,
  currentMenu: {
    id: '12',
    subId: '0'
  },
  breadcrumbList: [],
};

export default function appReducers(state = initialState, action) {
  let keyList;
  let data;
  let nData;
  switch (action.type) {
    case AppConst.COMMON_GET_USER_INFO:
      return merge({}, state, {
        userInfo: action.data
      });
    case AppConst.GET_MENU_LIST:
      return merge({}, state, {
        userInfo: {
          pin: action.data.pin
        },
        menuList: action.data.menuList
      });
    case AppConst.SET_CURRENT_MENU:
      return merge({}, state, {
        currentMenu: {
          id: action.data
        }
      });
    case AppConst.SET_BREADCRUMB_LIST:
      return Object.assign({}, state, {
        breadcrumbList: action.data
      });
    default:
      return state;
  }
}

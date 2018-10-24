import {
  fetchGet,
  fetchPost,
  fetchDelete,
  fetchFormData
} from 'MODULES/fetch.js';
import * as AppConst from 'CONSTANTS/AppConst';

// 获取登录信息
export function getUserInfo(option = {}) {
  return fetchGet(AppConst.PROXY_URL.getUserInfo, option).then(json => {
    if (json && json.code == 200) {
      this.props.appActions.COMMON_GET_USER_INFO(json.data);
    }
    return json;
  });
}
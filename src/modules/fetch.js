import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import {
  combineUrl,
  toQueryString,
  paramObj2paramStr,
  getQueryStringByName,
  paramObj2paramStrEncode,
  getPublicParameter
} from './utils';
import qs from 'qs';
import * as AppConst from 'CONSTANTS/AppConst';
import merge from 'lodash/merge';
import redirect from './pub/redirect';

require('es6-promise').polyfill();

const ERROR_MESSAGE = {
  code: 500,
  isSuccess: false,
  message: '系统繁忙，请稍后尝试'
};

export function fetchGet(
  url,
  data = {},
  isShowError = true,
  isShowLoading = false,
  needReplace = true
) {
  const publicParameter = getPublicParameter();
  data = merge({}, data, publicParameter);
  let URL = url + qs.stringify(data, { addQueryPrefix: true });
  return fetchCommon(URL, {}, isShowError, isShowLoading, needReplace);
}

export function fetchPost(
  url,
  data = {},
  isShowError = true,
  isShowLoading = false,
  needReplace = true
) {
  const publicParameter = getPublicParameter();
  data = merge({}, data, publicParameter);
  let options = {
    method: 'POST',
    body: JSON.stringify(data) // qs.stringify(data)
  };
  return fetchCommon(url, options, isShowError, isShowLoading, needReplace);
}

export function fetchDelete(
  url,
  data = {},
  isShowError = true,
  isShowLoading = false,
  needReplace = true
) {
  const publicParameter = getPublicParameter();
  data = merge({}, data, publicParameter);
  let options = {
    method: 'DELETE',
    body: JSON.stringify(data) // qs.stringify(data)
  };
  return fetchCommon(url, options, isShowError, isShowLoading, needReplace);
}

function fetchCommon(URL, options, isShowError, isShowLoading, needReplace) {
  options.credentials = 'include';
  options.mode = 'cors';
  options.cache = 'no-cache';
  options.headers = {
    Accept: 'application/json', // 'application/vnd.cmos.v1+json',
    'Content-Type': 'application/json' // 'application/x-www-form-urlencoded'
  };
  isShowLoading && message.loading('loading...');
  return fetch(combineUrl(URL, needReplace), options)
    .then(response => {
      isShowLoading && message.destroy();
      if (response && response.status == 200) {
        return response.json();
      } 
        throw ERROR_MESSAGE;
      
    })
    .then(json => {
      if (json === undefined) {
        throw ERROR_MESSAGE;
      } else if (json && json.isSuccess == true) {
        json.sub_code = json.code;
        json.code = 200;
        return json;
      } else if (json && (json.code == 401 || json.status == 401)) {
        // 未登录
        redirect();
        return {
          code: 401,
          message: '登录失效，页面正在跳转登录..'
        };
      } else {
        throw {
          code: 500,
          isSuccess: false,
          message: json.message || ERROR_MESSAGE.message
        };
      }
    })
    .catch(e => {
      isShowLoading && message.destroy();
      isShowError && message.error(e.message || ERROR_MESSAGE.message, 2);
      return e || ERROR_MESSAGE;
    })
    .then(json => json || ERROR_MESSAGE);
}

export function fetchFormData(URL, data, isShowError, isShowLoading) {
  let options = {};
  options.body = data;
  options.method = 'POST';
  options.credentials = 'include';
  options.mode = 'cors';
  (options.cache = 'no-cache'),
    (options.headers = {
      Accept: 'application/json', // 'application/vnd.cmos.v1+json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    });
  isShowLoading && message.loading('loading...');
  return fetch(combineUrl(URL), options)
    .then(response => {
      isShowLoading && message.destroy();
      if (response && response.status == 200) {
        return response.json();
      } 
        throw ERROR_MESSAGE;
      
    })
    .then(json => {
      if (json === undefined) {
        throw ERROR_MESSAGE;
      } else if (json && json.isSuccess == true) {
        json.sub_code = json.code;
        json.code = 200;
        return json;
      } else {
        throw {
          code: 500,
          isSuccess: false,
          message: json.message || ERROR_MESSAGE.message
        };
      }
    })
    .catch(e => {
      isShowLoading && message.destroy();
      isShowError && message.error(e.message || ERROR_MESSAGE.message, 2);
      return e || ERROR_MESSAGE;
    })
    .then(json => json || ERROR_MESSAGE);
}

export async function fetchAsyncGet(url) {
  let r = await fetch(url);
  let s = r.json();
  return s;
}

// 2s 之后返回双倍的值
function doubleAfter2seconds(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2 * num);
    }, 1000);
  });
}

export async function testResult() {
  let result = await doubleAfter2seconds(30);
  console.log(result);
}

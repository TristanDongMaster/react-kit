import { browserHistory } from 'react-router';
import merge from 'lodash/merge';

const PUBLIC_PARAMETER = [
  'path_type',
  'activityId',
  'areaId',
  'columnId',
  'channelId'
];

export function goBack() {
  browserHistory.goBack();
}
export function locationHref(url, opt = {}, paramArray = []) {
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    location = paramObj2paramStrEncode(url, opt);
  } else {
    let query = paramStr2paramObj(location.href);
    let paramArrayNew = merge([], PUBLIC_PARAMETER, paramArray);
    paramArrayNew.map(item => {
      if (query[item]) {
        opt[item] = query[item];
      }
    });
    browserHistory.push({
      pathname: url,
      query: opt
    });
  }
}
export function locationReplace(url, opt = {}, paramArray = []) {
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    location.replace(paramObj2paramStr(url, opt));
  } else {
    let query = paramStr2paramObj(location.href);
    let paramArrayNew = merge([], PUBLIC_PARAMETER, paramArray);
    paramArrayNew.map(item => {
      if (query[item]) {
        opt[item] = query[item];
      }
    });
    browserHistory.replace({
      pathname: url,
      query: opt
    });
  }
}
export function getPublicParameter() {
  let query = paramStr2paramObj(location.href);
  let opt = {};
  PUBLIC_PARAMETER.map(item => {
    if (query[item]) {
      opt[item] = parseInt(query[item]);
    }
  });
  return opt;
}

export function toQueryString(obj) {
  return obj
    ? Object.keys(obj)
        .sort()
        .map((key) => {
          let val = obj[key];
          if (typeof val === 'object') {
            return (
              `${encodeURIComponent(key) 
              }=${ 
              encodeURIComponent(JSON.stringify(val))}`
            );
          }
          // if (Array.isArray(val)) {
          //     return val.sort().map(function (val2) {
          //         return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
          //     }).join('&');
          // }
          return `${encodeURIComponent(key) }=${ encodeURIComponent(val)}`;
        })
        .join('&')
    : '';
}

export function checkNetwork(success, failed) {
  let img = new Image();
  if (success) {
    img.onload = success;
  }
  if (failed) {
    img.onerror = failed;
  }
  img.src = `${AppConst.IMGSRC.logo }?timestamp=${ +new Date()}`;
}

export function getQueryStringByName(name) {
  let result = decodeURIComponent(location.search).match(
    new RegExp(`[?&]${ name }=([^&]+)`, 'i')
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}

// {name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStr(url, obj = {}) {
  let newUrl = '';
  let paramStr = '';
  for (let i in obj) {
    paramStr += `&${ i }=${ obj[i]}`;
  }
  if (url.indexOf('&') > -1) {
    newUrl = url + paramStr;
  } else if (url.indexOf('?') > -1) {
    if (url.indexOf('=') > -1) {
      newUrl = url + paramStr;
    } else {
      newUrl = url + paramStr.substring(1);
    }
  } else {
    newUrl = `${url }?${ paramStr.substring(1)}`;
  }
  return newUrl;
}

// {name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStrEncode(url, obj = {}) {
  let newUrl = '';
  let paramStr = '';
  for (let i in obj) {
    paramStr += `&${ i }=${ encodeURIComponent(obj[i])}`;
  }
  if (url.indexOf('&') > -1) {
    newUrl = url + paramStr;
  } else if (url.indexOf('?') > -1) {
    if (url.indexOf('=') > -1) {
      newUrl = url + paramStr;
    } else {
      newUrl = url + paramStr.substring(1);
    }
  } else {
    newUrl = `${url }?${ paramStr.substring(1)}`;
  }
  return newUrl;
}

// name=jack&age=18 => {name:'jack',age:18}
export function paramStr2paramObj(url) {
  let search = decodeURIComponent(url)
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .match(/([^?#]*)(#.*)?$/); // 提取location.search中'?'后面的部分
  if (!search) {
    return {};
  }
  let searchStr = search[1];
  let searchHash = searchStr.split('&');

  let ret = {};
  for (let i = 0, len = searchHash.length; i < len; i++) {
    // 这里可以调用each方法
    let pair = searchHash[i];
    if ((pair = pair.split('='))[0]) {
      let key = pair.shift();
      let value = pair.length > 1 ? pair.join('=') : pair[0];
      if (value != undefined) {
        value = value;
      }
      if (key in ret) {
        if (ret[key].constructor != Array) {
          ret[key] = [ret[key]];
        }
        ret[key].push(value);
      } else {
        ret[key] = value;
      }
    }
  }
  return ret;
}

export function getMergeUrl(url, obj = {}) {
  // var locationUrl = location.href
  // var current = paramStr2paramObj(locationUrl)
  // var newObject = merge({}, current, obj)
  let newUrl = paramObj2paramStr(url, obj);
  return newUrl;
}

export function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

export function processResponse(res) {
  if (res.isSuccess) {
    return res.data;
  }
  return Promise.reject(res.message);
}

export function combineUrl(url, needReplace=true) {
  let newUrl = url;
  if (
    location.search.indexOf('path_type=21') > -1
    && url.indexOf('/combine-api') > -1
    && needReplace
  ) {
    newUrl = url.replace('/combine-api', '/enjoy');
  } else {
    newUrl = url.replace('/combine-api', '');
  }
  return newUrl;
}

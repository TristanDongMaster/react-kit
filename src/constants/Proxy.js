import NODE_ENV from './ENV';

// MOCK:本地mock服务, PROXY:代理到项目服务器
const PROXY = 'PROXY';
const PROXYMAC = 'PROXYMAC';
const DEBUG = NODE_ENV === 'development';
const PROXY_ENV = DEBUG ? PROXY : 'PROD';
const PROXY_MAC_ENV = DEBUG ? PROXYMAC : 'PROD';
const SERVER_DOMAIN = {
  SECKILL: DEBUG ? '' : 'http://newseckill.',
  WORKFLOW: DEBUG ? '' : 'http://plat-gw./',
  MAC: DEBUG ? '' : 'http://mac.'
};

const PROXY_API = {
  MOCK: '/mock-api',
  PROXY: '/proxy-api',
  PROXYMAC: '/proxy-api/mac',
  PROD: ''
};

const apiWorkflowHost = SERVER_DOMAIN.WORKFLOW + PROXY_API[PROXY_ENV];

// 通用流程api。地址不变
const apiHostCommon = SERVER_DOMAIN.SECKILL + PROXY_API[PROXY_ENV];

export const PROXY_URL = {
  // common
  loginout: `${apiWorkflowHost}/workflow/logout`, // 退出登录
  getUserInfo: `${apiHostCommon}/common/current/info`,
};

export default PROXY_URL;

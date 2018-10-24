import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from '../views/App'
import * as AppConst from 'CONSTANTS/AppConst'

// 404错误页面
const com404 = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../views/common/Com404').default)
  }, 'com404')
}

// 开发说明主页
const home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../views/common/Home').default)
  }, 'home')
}
// 页面路由访问路径
const base = AppConst.ROUTE_PATH

export default (
  <Route path="/" component={App} >
    <IndexRoute getComponent={home} />
    <Route path={base} getComponent={home} />
    <Route path={`${base }/home`} getComponent={home} />
    <Route path={`${base }/404`} getComponent={com404} />
    <Redirect from="*" to={`${base }/404`} />
  </Route>
)

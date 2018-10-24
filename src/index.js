import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import { browserHistory,Router} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import { Provider } from 'react-redux'
import './stylesheets/style.less'

require('babel-core/register');

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
window.globalCacheData = {}

render(
   <Provider store={store}>
     <Router history={history} routes={routes} />
   </Provider>
 ,
  document.getElementById('root')
)

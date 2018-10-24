/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/06/20 
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from 'ACTIONS/AppActions'
import Layout from 'COMPONENTS/Layout'
import * as CommonService from 'SERVICES/common'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { message ,LocaleProvider} from 'antd'
import checkLogin from 'MODULES/pub/checkLogin'

checkLogin()
message.config({
  top: '30%',
})

class App extends Component {
  componentDidMount() {
    CommonService.getUserInfo.bind(this)()
  }

  render() {
    const { children, stores } = this.props
    let data = {
      userName: stores.appReducers.userInfo.erpName,
      menuList: stores.appReducers.menuList,
    }
    return (
      <LocaleProvider locale={zh_CN}>
        <Layout data={data}>
          {children}
        </Layout>
      </LocaleProvider>
      
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}


function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


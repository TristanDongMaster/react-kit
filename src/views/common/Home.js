/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster *  * Last Modified:18/03/20 *  * 404页面 */
 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from 'ACTIONS/AppActions'
import * as AppConst from '../../constants/AppConst'
import { Link } from 'react-router'
import Content from 'COMPONENTS/Layout/Content'
import { Button} from 'antd'

class Home extends Component {
  render() {
    return (
        <Content title="开发统计页面">
          <Button>开发统计页面</Button>
        </Content>
    )
  }
}


Home.contextTypes = {
    router: PropTypes.object
}

function mapStateToProps(state) {
    return {
        stores: state
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch),
    appActions: bindActionCreators(AppActions, dispatch),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
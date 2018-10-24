/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/03/20 
 *
 * 404页面
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button ,Input} from 'antd';
import { Link } from 'react-router'
import Layout from 'COMPONENTS/Layout'
import * as AppActions from 'ACTIONS/AppActions'
import Content from 'COMPONENTS/Layout/Content'

class Com404 extends Component {
  constructor(props, context) {
    super(props, context)
    const { actions } = this.props
    this.actions = actions
  }
  
  render() {
    let breadcrumb = [
      {name:'页面不存在'}
    ]
    return (
      <Content breadcrumb={breadcrumb} title="页面不存在" >
        <h1 style={{textAlign:'center'}}>404 , not found</h1>
      </Content>
    )
  }
}


Com404.contextTypes = {
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Com404)


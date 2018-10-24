import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.less'
import Footer from './Footer'
import Header from './Header'
import {BackTop } from 'antd';

export default class Index extends Component {
  constructor(props) {
    super(props)
    const {children,data} = this.props
  }

  render() {
    const {children,data} = this.props
    return (
      <div className="layout-block">
        <Header data={data}/>
        {children}
        <BackTop visibilityHeight="200" style={{right:'8px'}}/>
      </div>
    )
  }
}

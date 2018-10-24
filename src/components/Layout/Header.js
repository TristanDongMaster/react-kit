import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { browserHistory, Link } from 'react-router';
import { locationHref } from 'MODULES/utils'
import redirect from 'MODULES/pub/redirect'
import {
  fetchGet
}
  from 'MODULES/fetch.js'
import * as AppConst from 'CONSTANTS/AppConst'
import fetch from 'isomorphic-fetch'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.getElementById('layout-block-fake')&&document.getElementById('layout-block-fake').remove()
  }

  getMenuId(menuList) {
    let url = location.pathname
    let id = ''
    menuList.map((item) => {
      if (id !== '') {
        return
      }
      let currentId = item.id
      if (item.url.indexOf(url) > -1) {
        id = currentId
      } else {
        let currentList = item.subMenuList || []
        currentList.map((subitem) => {
          if (subitem.url.indexOf(url) > -1) {
            id = currentId
          }
        })
      }
    })
    if (id === '') {
      id = menuList[0].id
    }
    return id
  }

  loginout = () => {
    try{
      fetchGet(AppConst.PROXY_URL.loginout, {}, false)
      .then(() => {
        redirect()
      })
    } catch (error){
      redirect()
    }
  }

  goIndex = (item) => {
    browserHistory.push({
      pathname: item.url,
      query: {}
    });
  }

  render() {
    const { data } = this.props
    let currentUrlId = '12'
    if (data && data.menuList && data.menuList && data.menuList.length) {
      // currentUrlId = this.getMenuId(data.menuList)
    }
    return (
      <div className="layout-header">
      <a href="http://mc.jd.com/dist/pages/">
        <div className="header-logo">
          <img src={AppConst.IMGSRC.LOGO} />
        </div>
      </a>
        <div className="header-content">
          {
            data && data.menuList && data.menuList.map((item, index) => {
              if (!item.url || !item.name) {
                return
              }
              let classNames = item.id == currentUrlId ? 'active' : ''
              if (item.url.indexOf('/brandActivity/index') > -1) {
                return (
                  <a href="javascript:void(0)"
                    className={classNames}
                    key={index}
                    onClick={this.goIndex.bind(this, item)}
                  >{item.name}</a>
                )
              } 
                return (
                  <a href={item.url}
                    className={classNames}
                    key={index}
                  >{item.name}</a>
                )
              
            })
          }
        </div>
        <div className="header-right">
          <span className="header-name">{data.userName} <Icon type="user" style={{ fontSize: 20 }} /></span>
          <a className="header-out" onClick={this.loginout} href="javascript:void(0)">退出</a>
        </div>
      </div>
    )
  }
}


Header.propTypes = {
}

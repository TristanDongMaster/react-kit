import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';
import classNames from 'classnames'
import {locationHref} from 'MODULES/utils'

const SubMenu = Menu.SubMenu;

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cls:'ant-menu-item-selected',
      openKeys: ['sub0'],
    }
  }

  // submenu keys of first level
  rootSubmenuKeys = ['sub0', 'sub1', 'sub2'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  getSubMenu=(data) => {
      let menuList = data || []
      let url = location.pathname
      let subMenuList = []
      let defaultMenuId = ''
      if(menuList&&menuList.length){
        menuList.map((item) => {
          if(defaultMenuId !== ''){
            return
          }
          let currentList = item.subMenuList || []
          currentList.map((subitem) => {
            if(subitem.url.indexOf(url)>-1){
              subMenuList = currentList
              defaultMenuId = subitem.id
            }
          })
        })
      }
      return {subMenuList,defaultMenuId}
  }

  clickMenu=( item, key, keyPath) => {
    locationHref(item.url)
  }

  render() {
    // ant-menu-item-selected
    const {data} = this.props
    let {subMenuList,defaultMenuId } = this.getSubMenu(data)
    return (
    <div className="layout-navigation">
      <Menu
      forceSubMenuRender
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        // onClick={this.clickMenu}
        style={{ width: 250, borderRadius: '5px' }}
      >
      {
        subMenuList.map((item,index) => {
          let nextSub = item.subMenuList
          if(nextSub.length){
            return (
              <SubMenu key={`sub${ index}`} title={<span>{item.name}</span>}>
                {
                  nextSub.map((item,index) => (
                        <Menu.Item key={item.id} onClick={this.clickMenu.bind(this,item)}>{item.name}</Menu.Item>
                      ))
                }
              </SubMenu>
            )
          }
            return (
                    <Menu.Item key={index} onClick={this.clickMenu.bind(this,item)} className={defaultMenuId==item.id?this.state.cls:''}>{item.name}</Menu.Item>
                  )
          
        })
      }
      </Menu>
    </div>
    );
  }
}


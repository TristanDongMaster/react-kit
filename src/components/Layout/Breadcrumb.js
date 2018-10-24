import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {locationHref,paramStr2paramObj} from 'MODULES/utils'
import * as AppConst from 'CONSTANTS/AppConst'
import cloneDeep from 'lodash/cloneDeep'
import { browserHistory, Link } from 'react-router';

export default class Breadcrumb extends Component {
  constructor(props) {
    super(props)
  }

  link(item){
    if(item.url.indexOf('brandActivity/index')>-1){
      browserHistory.push({
        pathname: item.url,
        query: {}
      });
    }else{
      locationHref(item.url,item.query||{})
    }
  }

  getPath(){
    const {data} = this.props
    if(data.length==0){
      return []
    }
    let path_type = paramStr2paramObj(location.href).path_type || 11
    let list = AppConst.PATH_TYPE[path_type] || AppConst.PATH_TYPE[11] 
    let newList = cloneDeep(list)
    data.map((item) => {
      newList.push(item)
    })
    return newList
  }

  render() {
    let data = this.getPath()
  	// var data = [
  	// {name:'首页',url:'/brandActivity/demo'},
  	// {name:'管理',url:'/brandActivity/home'},
  	// {name:'详情'}
  	// ]
    return (
      <div className="layout-breadcrumb">
       {
	       	data.map((item,index) => {
	       		if(data.length!=(index+1)){
	       			return (
	       				<span key={index}>
	       				<a href="javascript:void(0)" onClick={this.link.bind(this,item)} >{item.name}</a>
	       				{
	       					index==0
	       					?<span className="breadcrumb-separator">/</span>
	       					:<span className="breadcrumb-separator">></span>
	       				}
	       				</span>
	       				)
	       		}
	       			return (
	       				<span key={index}>{item.name}</span>
	       				)
	       		
	       })
       }
      </div>
    )
  }
}

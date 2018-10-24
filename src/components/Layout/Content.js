import React, { Component } from 'react';
import Navigation from './Navigation';
import Breadcrumb from './Breadcrumb';
import { message } from 'antd';
import ReactComponent from 'COMPONENTS/ReactComponent';

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById('globalLoading')
      && document.getElementById('globalLoading').remove();
  }

  render() {
    const { children, menuList, breadcrumb, title } = this.props;
    return (
      <React.Fragment>
        <Breadcrumb data={breadcrumb || []} />
        <div className="layout-content  animated fadeIn">
          {menuList && <Navigation data={menuList} />}
          <div className="layout-children">
            {title && <div className="block-title">{title || ''}</div>}
            <ReactComponent>{children}</ReactComponent>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

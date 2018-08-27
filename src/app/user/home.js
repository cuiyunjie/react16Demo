import React from 'react';
import Reflux from 'reflux';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import SiderMenu from 'components/sider-menu';
import { getMenuData } from '../common/menu';

import "antd/dist/antd.less";
import "style/common.scss";

const { Content } = Layout;

export default class extends Reflux.Component {
  constructor() {
    super();
    this.stores = [];
    this.state = {};
  }

  componentWillMount(){
    super.componentWillMount();
  }

  render() {
    let { location } = this.props;
    return (
      <LocaleProvider locale={zhCN}>
        <Layout>
          <SiderMenu
            //logo={LOGO}
            menuData={getMenuData()}
            //collapsed={collapsed}
            location={location}
            //isMobile={isMobile}
            //onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Content>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

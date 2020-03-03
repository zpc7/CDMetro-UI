import React from 'react';
import { Layout, Menu, Icon } from "antd";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Business from '../Pages/business/Business';
import DataMangeListComponent from '../Pages/dataManage/DataMangeList';

import './Routes.less';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default class Routes extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Layout id='app-wrapper'>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="overView">
                <Link to='/'>
                  <Icon type="bar-chart" />
                  <span>overView</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="management"
                title={
                  <span>
                    <Icon type="solution" />
                    <span>Management</span>
                  </span>
                }
              >
                <Menu.Item key="dataManage">
                  <Link to='/manage'>
                    <Icon type="user" />
                    <span>客运量数据管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="config">
                  <Link to='/config'>
                    <Icon type="tool" />
                    <span>基础配置</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header id='header'>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content id='content'>
              <Switch>
                <Route exact path="/" component={Business} />
                <Route exact path="/manage" component={DataMangeListComponent} />
                <Route key='overView' path='/overView' render={() => <div>overView</div>} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

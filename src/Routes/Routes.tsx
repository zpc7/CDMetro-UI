import React from 'react'
import { Layout, Menu } from 'antd'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { BarChartOutlined, SolutionOutlined, UserOutlined, ToolOutlined } from '@ant-design/icons'

import PageTest from '@/Pages/demoTest/DemoTest'
import PageOverView from '@/Pages/overView/OverView'
import PagePassengerAmountManage from '@/Pages/manage/PassengerAmountManage'

import './Routes.less'
import logoImg from '@/Static/images/logo.png'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout

export default class Routes extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Layout id='app-wrapper'>
          <Sider collapsible>
            <div className="logo">
              <img src={logoImg} />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['overView']}>
              <Menu.Item key="overView">
                <Link to='/'>
                  <BarChartOutlined />
                  <span>OverView</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="management"
                title={
                  <span>
                    <SolutionOutlined />
                    <span>Manage</span>
                  </span>
                }
              >
                <Menu.Item key="dataManage">
                  <Link to='/manage'>
                    <UserOutlined />
                    <span>客运数据管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="config">
                  <Link to='/config'>
                    <ToolOutlined />
                    <span>线路配置</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="test">
                <Link to='/test'>
                  <BarChartOutlined />
                  <span>Test</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header id='header'>
            </Header>
            <Content id='content'>
              <Switch>
                <Route exact path="/" component={PageOverView} />
                <Route exact path="/test" component={PageTest} />
                <Route exact path="/manage" component={PagePassengerAmountManage} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

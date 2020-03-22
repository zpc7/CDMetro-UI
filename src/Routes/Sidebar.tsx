import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { BarChartOutlined, UserOutlined, ToolOutlined } from '@ant-design/icons'
import { RouteComponentProps } from 'react-router'

const { Sider } = Layout
import logoImg from '@/Static/images/logo.png'

interface State {
  collapsed: boolean
  selectedKey: string
}

class Sidebar extends Component<RouteComponentProps, State> {
  private historySubscription
  state = {
    collapsed: false,
    selectedKey: '',
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed })
  }

  updateSidebarMenu = location => {
    const pathname = location.pathname.split('/')[1]
    const selectedKey = pathname === '' ? 'overView' : pathname

    this.setState({ selectedKey })
  }

  componentDidMount() {
    const { history, location } = this.props
    this.updateSidebarMenu(location)
    this.historySubscription = history.listen(location => this.updateSidebarMenu(location))
  }

  componentWillUnmount() {
    this.historySubscription()
  }

  render() {
    const { collapsed, selectedKey } = this.state
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo">
          <img src={logoImg} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="overView">
            <Link to='/'>
              <BarChartOutlined />
              <span>OverView</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="dataManage">
            <Link to='/dataManage'>
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
          {/* <Menu.Item key="test">
            <Link to='/test'>
              <BarChartOutlined />
              <span>Test</span>
            </Link>
          </Menu.Item> */}
        </Menu>
      </Sider >
    )
  }
}

export default withRouter(Sidebar)
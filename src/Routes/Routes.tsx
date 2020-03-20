import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Sidebar from './SideBar'
import PageTest from '@/Pages/demoTest/DemoTest'
import PageOverView from '@/Pages/overView/OverView'
import PagePassengerAmountManage from '@/Pages/manage/PassengerAmountManage'

import './Routes.less'

const { Header, Content } = Layout

export default class Routes extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Layout id='app-wrapper'>
          <Sidebar />
          <Layout>
            <Header id='header'>
            </Header>
            <Content id='content'>
              <Switch>
                <Route exact path="/" component={PageOverView} />
                <Route exact path="/dataManage" component={PagePassengerAmountManage} />
                <Route exact path="/test" component={PageTest} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

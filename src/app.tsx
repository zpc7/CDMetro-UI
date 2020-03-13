import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'

import './app.less'
import 'moment/locale/zh-cn'
import Routes from '@/Routes/Routes'
import zhCN from 'antd/es/locale/zh_CN'

class App extends React.Component<{}, any> {
  state = {

  };


  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Routes />
      </ConfigProvider>)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

import { Card, Row, Col } from 'antd'
import React, { Component } from 'react'
import moment from 'moment'
import http from '@/Utils/http'
import { getLineConfig, getLastestPassengerTraffic, LineConfigItem, PassengerTrafficItem } from '@/Services'
import LineAmountBarChart from '@/Components/overViewChart/LineAmountBarChart'
import LineAmountPieChart from '@/Components/overViewChart/LineAmountPieChart'
import DateGroupPicker from '@/Components/dateGroupPicker/DateGroupPicker'
import DayAmountChart from '@/Components/overViewChart/DayAmount'
import './OverView.less'

interface State {
  dayAmountList: PassengerTrafficItem[]
  lineConfigList: LineConfigItem[]
  lastestData: PassengerTrafficItem
}

export default class OverView extends Component<{}, State> {
  state = {
    dayAmountList: [],
    lineConfigList: [],
    lastestData: {
      id: 0,
      date: '',
      dateType: '',
      lineData: [],
      sum: ''
    }
  }

  async componentDidMount() {
    const lineConfigResponse = await getLineConfig()
    this.setState({ lineConfigList: lineConfigResponse.list })
    await this.getDataByDateRange()
    await this.getLastestData()
  }
  getDataByDateRange = async (dates = [moment().subtract(30, 'days'), moment()]) => {
    const dateStrings = dates.map(i => i.format('YYYY-MM-DD'))
    const res = await http.get(`/analysis?startDate=${dateStrings[0]}&endDate=${dateStrings[1]}`)
    this.setState({ dayAmountList: res.list })
  }
  // 最新的数据
  getLastestData = async () => {
    const lastestData = await getLastestPassengerTraffic()
    this.setState({ lastestData })
  }
  render() {
    const { dayAmountList, lineConfigList, lastestData } = this.state
    return (
      <div className='PAGE-over-view'>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Card title={`${lastestData.date} 总客运量`} >
              <LineAmountBarChart data={lastestData} lineConfigList={lineConfigList} />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card title={`${lastestData.date} 总客运量占比`} >
              <LineAmountPieChart data={lastestData} lineConfigList={lineConfigList} />
            </Card>
          </Col>
        </Row>
        <Card
          title="DayAmount"
          className='day-amount-wrapper'
          extra={<DateGroupPicker getDataByDateRange={this.getDataByDateRange} />}
        >
          <DayAmountChart lineConfigList={lineConfigList} dayAmountList={dayAmountList} />
        </Card>
      </div>
    )
  }
}

import { Card, Row, Col } from 'antd'
import React, { Component } from 'react'
import moment from 'moment'
import {
  getLineConfig,
  getLastestPassengerTraffic,
  getPassengerTrafficWithDateRange,
  getAverageDataWithDateTypeByMonth,
  getAverageDataByMonth,
  getHighestRecord,
} from '@/Services'
import {
  LineConfigItem,
  PassengerTrafficItem,
  HighestRecordResponse,
  AverageMonthlyDataResponse,
  AverageMonthlyDataWithDateTypeResponse
} from '@/Services/interface'
import LastestDayChart from '@/Components/overViewChart/LastestDayChart'
import DateGroupPicker from '@/Components/dateGroupPicker/DateGroupPicker'
import DayAmountChart from '@/Components/overViewChart/DayAmount'
import MonthlyChart from '@/Components/monthlyChart'
import HighestRecord from '@/Components/highestRecord/HighestRecord'
import './OverView.less'

interface State {
  dayAmountList: PassengerTrafficItem[]
  lineConfigList: LineConfigItem[]
  lastestData: PassengerTrafficItem
  averageMonthlyData: AverageMonthlyDataResponse
  averageMonthlyDataWithDateType: AverageMonthlyDataWithDateTypeResponse
  highestRecord: HighestRecordResponse
}
const initialAverageMonthlyData = {
  max: { date: '', value: '' },
  min: { date: '', value: '' },
  currentMonth: { average: '', lineAverage: [] },
  lastMonth: { average: '', lineAverage: [] },
  sameMonthLastYear: { average: '', lineAverage: [] }
}
const initialAverageMonthlyDataWithDateType = {
  NWD: { average: '', lineAverage: [] },
  TDBH: { average: '', lineAverage: [] },
  SH: { average: '', lineAverage: [] }
}
const initialHighestRecord = {
  max: '',
  maxDate: '',
  lineMax: []
}
export default class OverView extends Component<{}, State> {
  state = {
    dayAmountList: [],
    lineConfigList: [],
    averageMonthlyData: initialAverageMonthlyData,
    averageMonthlyDataWithDateType: initialAverageMonthlyDataWithDateType,
    highestRecord: initialHighestRecord,
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
    await this.getHighestRecordData()
    await this.getAverageData(moment().format('YYYY-MM-DD'))
  }
  getDataByDateRange = async (dates = [moment().subtract(30, 'days'), moment()]) => {
    const dateStrings = dates.map(i => i.format('YYYY-MM-DD'))
    const res = await getPassengerTrafficWithDateRange(dateStrings[0], dateStrings[1])
    this.setState({ dayAmountList: res.list })
  }
  // 最新的数据
  getLastestData = async () => {
    const lastestData = await getLastestPassengerTraffic()
    this.setState({ lastestData })
  }
  // 月度数据
  getAverageData = async month => {
    const averageMonthlyData = await getAverageDataByMonth(month)
    const averageMonthlyDataWithDateType = await getAverageDataWithDateTypeByMonth(month)
    this.setState({ averageMonthlyData, averageMonthlyDataWithDateType })
  }
  // 最高纪录
  getHighestRecordData = async () => {
    const highestRecord = await getHighestRecord()
    this.setState({ highestRecord })
  }
  render() {
    const {
      dayAmountList,
      lineConfigList,
      lastestData,
      highestRecord,
      averageMonthlyData,
      averageMonthlyDataWithDateType } = this.state
    return (
      <div className='PAGE-over-view'>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <LastestDayChart lastestData={lastestData} lineConfigList={lineConfigList} />
          </Col>
          <Col className="gutter-row" span={12}>
            <Card title='运量最高纪录' >
              <HighestRecord data={highestRecord} lineConfigList={lineConfigList} />
            </Card>
          </Col>
        </Row>
        <Card
          title="完整客运数据"
          className='day-amount-wrapper'
          extra={<DateGroupPicker getDataByDateRange={this.getDataByDateRange} />}
        >
          <DayAmountChart lineConfigList={lineConfigList} dayAmountList={dayAmountList} />
        </Card>
        <MonthlyChart
          data={{ averageMonthlyData, averageMonthlyDataWithDateType }}
          lineConfigList={lineConfigList}
          onMonthChange={this.getAverageData} />
      </div>
    )
  }
}

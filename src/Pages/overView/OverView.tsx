import { Card, Row, Col } from 'antd';
import React, { Component } from 'react'
import moment from 'moment'
import http from "@/Utils/http";
import LineAmountBarChart from '@/Components/overViewChart/LineAmountBarChart'
import LineAmountPieChart from '@/Components/overViewChart/LineAmountPieChart'
import DateGroupPicker from '@/Components/dateGroupPicker/DateGroupPicker'
import DayAmountChart from '@/Components/overViewChart/DayAmount'
import './OverView.less'

interface Props {

}
interface State {

}

export default class OverView extends Component<Props, State> {
  state = {
    dayAmountList: [],
    lineConfigList: []
  }
  async componentDidMount() {
    const lineConfigResponse = await http.get('/lineConfig')
    await this.getDataByDateRange()
    this.setState({ lineConfigList: lineConfigResponse.list });
  }
  getDataByDateRange = async (dates = [moment().subtract(30, 'days'), moment()]) => {
    const dateStrings = dates.map(i => i.format('YYYY-MM-DD'))
    const res = await http.get(`/analysis?startDate=${dateStrings[0]}&endDate=${dateStrings[1]}`);
    this.setState({ dayAmountList: res.list })
  }
  render() {
    const { dayAmountList, lineConfigList } = this.state;
    return (
      <div className='PAGE-over-view'>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Card title="3月6日 成都地铁总客运量" >
              <LineAmountBarChart />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card title="3月6日 成都地铁总客运量线路占比" >
              <LineAmountPieChart />
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

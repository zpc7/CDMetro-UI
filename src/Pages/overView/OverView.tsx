import { Card, Row, Col } from 'antd';
import React, { Component } from 'react'
import http from "@/Utils/http";
import LineAmountBarChart from '@/Components/overViewChart/LineAmountBarChart'
import LineAmountPieChart from '@/Components/overViewChart/LineAmountPieChart'
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
    const res = await http.get(`/analysis`);
    this.setState({ dayAmountList: res.list })
    this.setState({ lineConfigList: lineConfigResponse.list });
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
        <Card title="DayAmount" className='day-amount-wrapper' >
          <DayAmountChart lineConfigList={lineConfigList} dayAmountList={dayAmountList} />
        </Card>
      </div>
    )
  }
}

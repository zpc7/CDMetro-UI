import { Card, Row, Col } from 'antd';
import React, { Component } from 'react'
import LineAmountBarChart from '@/Components/overViewChart/LineAmountBarChart'
import LineAmountPieChart from '@/Components/overViewChart/LineAmountPieChart'

interface Props {

}
interface State {

}

export default class OverView extends Component<Props, State> {
  state = {}
  render() {
    const style = { padding: '8px 0' };
    return (
      <div className='PAGE-over-view'>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <Card title="3月6日 成都地铁总客运量" >
                <LineAmountBarChart />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>
              <Card title="3月6日 成都地铁总客运量线路占比" >
                <LineAmountPieChart />
              </Card></div>
          </Col>
        </Row>

      </div>
    )
  }
}

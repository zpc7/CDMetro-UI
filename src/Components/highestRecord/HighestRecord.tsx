import React from 'react'
import { Row, Col, Tag } from 'antd'
import { StarTwoTone } from '@ant-design/icons'
import CountUp from 'react-countup'
import _ from 'lodash'
import './HighestRecord.less'

const HighestRecord = ({ data, lineConfigList: lineConfig }: any) => {
  return (
    <div className="COMPONENT-highest-record">
      <Row gutter={16}>
        <Col span={8}>
          <div className="item">
            <div className="title">
              <div>单日最高</div>
              <Tag color="#108ee9">Highest</Tag>
              <StarTwoTone twoToneColor="#108ee9" style={{ fontSize: '18px' }} />
            </div>
            <div className="desc">
              <div>{data.maxDate}</div>
              <div>
                <CountUp end={Number(data.max)} decimals={2} />
              </div>
            </div>
          </div>
        </Col>
        {lineConfig.map(v => {
          const info = _.find(data.lineMax, ['lineId', v.id])
          return info && (
            <Col span={8} key={v.id}>
              <div className="item">
                <div className="title">
                  <div>{`${v.lineNumber}号线`}</div>
                  <div>
                    <Tag color={v.lineColor}>{`No. ${v.lineNumber}`}</Tag>
                  </div>
                </div>
                <div className="desc">
                  <div>{info.date}</div>
                  <div>
                    <CountUp end={Number(info.value)} decimals={2} />
                  </div>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default HighestRecord

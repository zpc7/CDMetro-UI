import React, { useState } from 'react'
import { Card, DatePicker } from 'antd'
import LineAverageChart from './LineAverageChart'
import moment from 'moment'
import './index.less'

const tabList = [{
  key: 'lineBar',
  tab: '各线日均客运量对比',
}, {
  key: 'dateTypeBar',
  tab: '各线分类别日均客运量',
}, {
  key: 'dateTypePie',
  tab: '分类别总体客运量',
}]

const disabledDate = current => {
  return current &&
    current > moment().endOf('day') ||
    current < moment('2016-08-24').subtract(1, 'month').startOf('day')
}

const index = ({ data, lineConfigList, onMonthChange }: any) => {
  const [tabKey, setTabKey] = useState('lineBar')
  const [month, setMonth] = useState(moment().format('YYYY-MM'))
  const handleMonthChange = (date, dateString) => {
    setMonth(dateString)
    dateString && onMonthChange(dateString)
  }
  const contentList = {
    lineBar: <LineAverageChart lineConfig={lineConfigList} data={data} />,
    dateTypeBar: '',
    dateTypePie: ''
  }
  return (
    <Card
      style={{ width: '100%' }}
      title={`${month ? moment(month).format('YYYY年MM月') : ''} 月度客流分析`}
      extra={<DatePicker onChange={handleMonthChange} defaultValue={moment()} disabledDate={disabledDate} picker="month" />}
      tabList={tabList}
      activeTabKey={tabKey}
      className='COMPONENT-momthly-chart'
      onTabChange={setTabKey}
    >
      {contentList[tabKey]}
    </Card>
  )
}

export default index

import React, { useState } from 'react'
import { Card, DatePicker } from 'antd'
import LineAverageChart from './LineAverageChart'
import DateTypeAverageChart from './DateTypeAverageChart'
import moment from 'moment'

const tabList = [{
  key: 'lineAverage',
  tab: '各线日均客运量',
}, {
  key: 'dateTypeAverage',
  tab: '分类别日均客运量',
}]

const disabledDate = current => {
  // 2016-08-24 为最早的历史数据
  return current &&
    current > moment().endOf('day') ||
    current < moment('2016-08-24').subtract(1, 'month').startOf('day')
}

const index = ({ data, lineConfigList, onMonthChange }: any) => {
  const [tabKey, setTabKey] = useState('lineAverage')
  const [month, setMonth] = useState(moment().format('YYYY-MM'))
  const handleMonthChange = (date, dateString) => {
    dateString && setMonth(dateString)
    dateString && onMonthChange(dateString)
  }
  const contentList = {
    lineAverage: <LineAverageChart lineConfig={lineConfigList} data={data.averageMonthlyData} />,
    dateTypeAverage: <DateTypeAverageChart lineConfig={lineConfigList} data={data.averageMonthlyDataWithDateType} />
  }
  return (
    <Card
      style={{ width: '100%', marginTop: '12px' }}
      title={`${moment(month).format('YYYY年MM月')} 月度客流分析`}
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

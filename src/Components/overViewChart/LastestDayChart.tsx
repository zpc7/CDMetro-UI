import { Card } from 'antd'
import React, { useState } from 'react'
import LineAmountBarChart from '@/Components/overViewChart/LineAmountBarChart'
import LineAmountPieChart from '@/Components/overViewChart/LineAmountPieChart'

const tabList = [{
  key: 'bar',
  tab: '分线运量',
}, {
  key: 'pie',
  tab: '线路占比',
}]

const LastestDayChart = ({ lastestData, lineConfigList }: any) => {
  const [tabKey, setTabKey] = useState('bar')
  const contentList = {
    bar: <LineAmountBarChart data={lastestData} lineConfigList={lineConfigList} />,
    pie: <LineAmountPieChart data={lastestData} lineConfigList={lineConfigList} />
  }
  return (
    <Card
      title={`${lastestData.date} 客运量`}
      tabList={tabList}
      activeTabKey={tabKey}
      className='COMPONENT-momthly-chart'
      onTabChange={setTabKey}
    >
      {contentList[tabKey]}
    </Card>
  )
}

export default LastestDayChart

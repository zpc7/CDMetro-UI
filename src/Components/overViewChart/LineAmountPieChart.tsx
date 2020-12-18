import _ from 'lodash'
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { LineConfigItem, PassengerTrafficItem } from '@/Services/interface'

const makeOption = (data, lineConfig) => {
  const color = lineConfig.map(i => i.lineColor)
  const legendData = lineConfig.map(i => `${i.lineNumber}号线`)
  const seriesData = lineConfig.map(line => {
    const info = _.find(data.lineData, v => v.lineId === line.id)
    return info ? {
      name: `${line.lineNumber}号线`,
      value: info.lineAmount
    } : 0
  })
  return {
    color,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: legendData
    },
    series: [
      {
        name: '客运量',
        type: 'pie',
        left: 80,
        top: 20,
        radius: ['45%', '80%'],
        label: {
          formatter: '  {styleB|{b}：}{per|{d}%}  ',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            styleB: {
              fontSize: 14,
              lineHeight: 25
            },
            per: {
              color: '#eee',
              backgroundColor: '#334466',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        },
        data: seriesData
      }
    ]
  }
}

interface Props {
  data: PassengerTrafficItem
  lineConfigList: LineConfigItem[]
}
// 饼图
const LineAmountChart = ({ data, lineConfigList }: Props) => {
  const option = makeOption(data, lineConfigList)
  const showLoading = _.isEmpty(data) ? true : false
  return <div className="COMPONENT-line-amount-bar-chart">
    <ReactEcharts option={option} showLoading={showLoading} style={{ height: '380px' }} />
  </div>

}
export default LineAmountChart

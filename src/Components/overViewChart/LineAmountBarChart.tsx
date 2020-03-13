import React from 'react'
import _ from 'lodash'
import './LineAmountBarChart.less'

import ReactEcharts from 'echarts-for-react'

const makeOption = (data, lineConfig) => {
  const color = lineConfig.map(i => i.lineColor)
  const xAxisData = lineConfig.map(i => `${i.lineNumber}号线`)
  const seriesData = lineConfig.map(line => {
    const info = _.find(data.lineData, v => v.lineId === line.id)
    return info ? {
      itemStyle: { color: line.lineColor },
      value: info.lineAmount
    } : 0
  })
  return {
    color,
    title: {
      text: `总客运量 ${data.sum}万乘次`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '万乘次',
      }
    ],
    series: [
      {
        name: '客运量',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        barWidth: 50,
        data: seriesData
      }
    ]
  }
}
// 柱状图
const LineAmountBarChart = ({ data, lineConfigList }) => {
  const option = makeOption(data, lineConfigList)
  const showLoading = _.isEmpty(data) ? true : false
  return <div className="COMPONENT-line-amount-bar-chart">
    <ReactEcharts option={option} showLoading={showLoading} />
  </div>

}
export default LineAmountBarChart

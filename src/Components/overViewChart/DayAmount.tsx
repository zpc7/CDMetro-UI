import React from 'react'
import './DayAmount.less'
import _ from 'lodash'

import ReactEcharts from 'echarts-for-react'

const makeOption = (lineConfig, dayAmount) => {
  const lineColor = lineConfig.map(item => item.lineColor)
  const lineLegend = lineConfig.map(line => `${line.lineNumber}号线`)
  const dateList = dayAmount.map(item => item.date)
  const lineSeries = lineConfig.map(line => ({
    name: `${line.lineNumber}号线`,
    type: 'line',
    smooth: true,
    data: dayAmount.map(item => {
      const lineInfo = _.find(item.lineData, v => v.lineId === line.id)
      return lineInfo ? Number(lineInfo.lineAmount) : '-'
    })
  }))
  const sumSeries = {
    name: '总运量',
    type: 'bar',
    yAxisIndex: 1,
    data: dayAmount.map(item => Number(item.sum)),
    markPoint: {
      symbolSize: 70,
      itemStyle: {
        color: '#C23531'
      },
      data: [
        { type: 'max', name: '最大值' },
        { type: 'min', name: '最小值' }
      ]
    },
    markLine: {
      itemStyle: {
        color: '#2F4554'
      },
      data: [
        {
          type: 'average', name: '平均值', label: {
            color: 'red',
            fontSize: 20
          }
        }
      ]
    }
  }
  return {
    color: ['#BFBFBF', ...lineColor],
    grid: {
      left: '5%',
      right: '5%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#D93983'
        }
      }
    },
    legend: {
      data: [...lineLegend, '总运量']
    },
    dataZoom: [
      { show: true },
      { type: 'inside' }
    ],
    xAxis: [
      {
        type: 'category',
        data: dateList,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '单线运量(万乘次)'
      },
      {
        type: 'value',
        name: '总运量(万乘次)',
      }
    ],
    series: [...lineSeries, sumSeries]
  }
}
const DayAmountChart = ({ lineConfigList, dayAmountList }) => {
  const option = makeOption(lineConfigList, dayAmountList)
  return <div className="COMPONENT-day-amount-chart">
    <ReactEcharts option={option} style={{ height: '450px' }} />
  </div>

}
export default DayAmountChart

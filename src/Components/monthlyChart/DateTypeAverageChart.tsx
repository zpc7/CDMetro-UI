import React from 'react'
import { Row, Col } from 'antd'
import _ from 'lodash'
import ReactEcharts from 'echarts-for-react'
import { dateTypeCompareBoard } from '@/Components/passengerAmountTable/PassengerAmountTable'

const color = ['#1eb2a6', '#ffa34d', '#f67575']
const makeBarOption = (lineConfig, data) => {
  const getAverageData = key => lineConfig.map(v => {
    const averageInfo = _.find(data[key].lineAverage, ['lineId', v.id])
    return averageInfo ? Number(averageInfo.average) : '-'
  })
  const xAxisData = lineConfig.map(item => `${item.lineNumber}号线`)
  const NWDSeriesData = getAverageData('NWD')
  const TDBHSeriesData = getAverageData('TDBH')
  const SHSeriesData = getAverageData('SH')

  return {
    color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['普通工作日', '假期前一天', '周末及节假日']
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '万乘次'
      }
    ],
    series: [
      {
        name: '普通工作日',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: NWDSeriesData
      },
      {
        name: '假期前一天',
        type: 'bar',
        barGap: 0,
        label: {
          show: true,
          position: 'top'
        },
        data: TDBHSeriesData
      },
      {
        name: '周末及节假日',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: SHSeriesData
      }
    ]
  }
}
const makePieOption = data => ({
  color,
  title: {
    text: '当月各日期类型占比',
    left: 'center',
    textStyle: {
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    top: 30,
    data: ['普通工作日', '假期前一天', '周末及节假日']
  },
  series: [
    {
      name: '当月占比',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: ['NWD', 'TDBH', 'SH'].map(key => ({
        value: data[key].average,
        name: dateTypeCompareBoard[key]
      })),
      label: {
        normal: {
          formatter: '{b}\n\n{c}, {d}%',
          position: 'outside',
          fontSize: 16
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
const DateTypeAverageChart = ({ lineConfig, data }: any) => {
  console.log('render dateType')
  return (
    <div className="COMPONENT-date-type-average-chart">
      <Row gutter={8}>
        <Col span={16}>
          <ReactEcharts option={makeBarOption(lineConfig, data)} style={{ height: '450px' }} />
        </Col>
        <Col span={8}>
          <ReactEcharts option={makePieOption(data)} style={{ height: '450px' }} />
        </Col>
      </Row>
    </div>
  )
}

export default DateTypeAverageChart

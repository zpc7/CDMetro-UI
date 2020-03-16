import React from 'react'
import { Row, Col } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'

const makeBarOption = (lineConfig, data) => {
  const formatDate = date => moment(date).format('M月D日')
  const getAverageData = key => lineConfig.map(v => {
    const averageInfo = _.find(data[key].lineAverage, ['lineId', v.id])
    return averageInfo ? Number(averageInfo.average) : '-'
  })
  const xAxisData = lineConfig.map(item => `${item.lineNumber}号线`)
  const currentMonthSeriesData = getAverageData('currentMonth')
  const lastMonthSeriesData = getAverageData('lastMonth')
  const sameMonthLastYearSeriesData = getAverageData('sameMonthLastYear')

  return {
    color: ['#4cabce', '#006699', '#e5323e'],
    title: {
      text: '线网总计',
      textAlign: 'left',
      textStyle: {
        fontSize: 16
      },
      subtext: `{a|本月最高: }\n{a|${formatDate(data.max.date)}: }{b|${data.max.value}}\n{a|本月最低: }\n{a|${formatDate(data.min.date)}: }{b|${data.min.value}}\n\n{a|当月: }{b|${data.currentMonth.average}}\n{a|上月: }{b|${data.lastMonth.average}}\n{a|去年同月: }{b|${data.sameMonthLastYear.average}}`,
      subtextStyle: {
        lineHeight: 24,
        rich: {
          a: {
            color: '#595959',
            fontSize: 16,
          },
          b: {
            color: 'red',
            fontSize: 16,
            fontWeight: 'bold'
          }
        }
      },
      left: 'right',
      padding: [10, 20, 10, 10]
    },
    grid: {
      left: '5%',
      right: '15%'
    },
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
      data: ['去年同月', '上月', '当月']
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
        name: '去年同月',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: sameMonthLastYearSeriesData
      },
      {
        name: '上月',
        type: 'bar',
        barGap: 0,
        label: {
          show: true,
          position: 'top'
        },
        data: lastMonthSeriesData
      },
      {
        name: '当月',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: currentMonthSeriesData
      }
    ]
  }
}
const makePieOption = (lineConfig, data) => {
  const color = lineConfig.map(i => i.lineColor)
  const legendData = lineConfig.map(i => `${i.lineNumber}号线`)
  const seriesData = lineConfig.map(v => {
    const averageInfo = _.find(data['currentMonth'].lineAverage, ['lineId', v.id])
    return averageInfo ? {
      value: Number(averageInfo.average),
      name: `${v.lineNumber}号线`
    } : '-'
  })
  return ({
    color,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    title: {
      text: '当月各线占比',
      left: 'center',
      textStyle: {
        fontSize: 16
      }
    },
    legend: {
      type: 'scroll',
      top: 30,
      data: legendData
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: seriesData,
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
}
const LineAverageChart = ({ lineConfig, data }: any) => {
  return (
    <div className="COMPONENT-line-average-chart">
      <Row gutter={8}>
        <Col span={17}>
          <ReactEcharts option={makeBarOption(lineConfig, data)} style={{ height: '450px' }} />
        </Col>
        <Col span={7}>
          <ReactEcharts option={makePieOption(lineConfig, data)} style={{ height: '450px' }} />
        </Col>
      </Row>
    </div>
  )
}

export default LineAverageChart

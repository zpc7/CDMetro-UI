import React from 'react'
import { Row, Col } from 'antd'
import ReactEcharts from 'echarts-for-react'

const makeOption = () => {
  return {
    color: ['#4cabce', '#006699', '#e5323e'],
    title: {
      text: '线网总计',
      textAlign: 'left',
      textStyle: {
        fontSize: 16
      },
      subtext: '{a|本月最高: }\n{a|6月9日: }{b|325.77}\n{a|本月最低: }\n{a|6月30日: }{b|100.77}\n\n{a|当月: }{b|325.77}\n{a|上月: }{b|325.77}\n{a|去年同月: }{b|325.77}',
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
        data: ['1号线', '2号线', '3号线', '4号线', '5号线', '7号线', '10号线'],
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
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
      },
      {
        name: '上月',
        type: 'bar',
        barGap: 0,
        label: {
          show: true,
          position: 'top'
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
      },
      {
        name: '当月',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
      }
    ]
  }
}
const option = {
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
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
const LineAverageChart = () => {
  return (
    <div className="COMPONENT-line-average-chart">
      <Row gutter={8}>
        <Col span={17}>
          <ReactEcharts option={makeOption()} style={{ height: '450px' }} />
        </Col>
        <Col span={7}>
          <ReactEcharts option={option} style={{ height: '450px' }} />
        </Col>
      </Row>
    </div>
  )
}

export default LineAverageChart

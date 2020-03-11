import React, { Component } from "react";
import "./LineAmountPieChart.less";

import ReactEcharts from 'echarts-for-react';

interface Props { }
interface State { }

const colors = ["#171695", "#E8644D", "#D93983", "#4C9B48", "#B927B6", "#66CFE5", "#0350B7"];
const options = {
  color: colors,
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['1号线', '2号线', '3号线', '4号线', '5号线', '7号线', '10号线']
  },
  series: [
    {
      name: '客运量',
      type: 'pie',
      // minAngle: 23,
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
      data: [
        { value: 32.2, name: '1号线' },
        { value: 26.9, name: '2号线' },
        { value: 25.89, name: '3号线' },
        { value: 21.83, name: '4号线' },
        { value: 12.62, name: '5号线' },
        { value: 27.36, name: '7号线' },
        { value: 4.22, name: '10号线' },
      ]
    }
  ]
}
export default class LineAmountChart extends Component<Props, State> {
  state = {};
  // componentDidMount() {

  //   const myChart = echarts.init(document.getElementById("LineAmountPieChart"));
  //   myChart.setOption();
  // }

  render() {
    return <div id="LineAmountPieChart">
      <ReactEcharts option={options} />
    </div>;
  }
}

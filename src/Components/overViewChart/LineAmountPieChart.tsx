import React, { Component } from "react";
import "./LineAmountPieChart.less";

const echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

interface Props { }
interface State { }

export default class LineAmountChart extends Component<Props, State> {
  state = {};
  componentDidMount() {

    const myChart = echarts.init(document.getElementById("LineAmountPieChart"));

    const colors = ["#171695", "#E8644D", "#D93983", "#4C9B48", "#B927B6", "#66CFE5", "#0350B7"];
    myChart.setOption({
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
          minAngle: 23,
          radius: ['50%', '85%'],
          label: {
            formatter: '  {styleB|{b}：}{per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              styleB: {
                fontSize: 14,
                lineHeight: 20
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }
            }
          },
          data: [
            { value: 335, name: '1号线' },
            { value: 310, name: '2号线' },
            { value: 234, name: '3号线' },
            { value: 135, name: '4号线' },
            { value: 1048, name: '5号线' },
            { value: 251, name: '7号线' },
            { value: 147, name: '10号线' },
          ]
        }
      ]
    });
  }

  render() {
    return <div id="LineAmountPieChart"></div>;
  }
}

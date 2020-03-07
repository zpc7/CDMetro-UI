import React, { Component } from "react";
import "./LineAmountBarChart.less";

var echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

interface Props { }
interface State { }

// 柱状图
export default class LineAmountBarChart extends Component<Props, State> {
  state = {};
  componentDidMount() {

    const myChart = echarts.init(document.getElementById("LineAmountBarChart"));
    const colors = ["#171695", "#E8644D", "#D93983", "#4C9B48", "#B927B6", "#66CFE5", "#0350B7"];
    myChart.setOption({
      // color: colors,
      title: {
        text: "3月6日 总客运量 304.79万乘次",
        left: "center"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        }
      },

      legend: {
        show: false,
        data: ["客运量"]
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          data: ["1号线", "2号线", "3号线", "4号线", "5号线", "7号线", "10号线"]
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "万乘次",
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          },
          // minInterval: 10,
          splitNumber: 3,
          axisLabel: {
            formatter: "{value}"
          }
        }
      ],
      series: [
        {
          name: "客运量",
          type: "bar",
          label: {
            show: true,
            position: "top"
          },
          barWidth: 50,
          data: [
            { itemStyle: { color: "#171695" }, value: 32.2 },
            { itemStyle: { color: "#E8644D" }, value: 26.9 },
            { itemStyle: { color: "#D93983" }, value: 25.89 },
            { itemStyle: { color: "#4C9B48" }, value: 21.83 },
            { itemStyle: { color: "#B927B6" }, value: 12.62 },
            { itemStyle: { color: "#66CFE5" }, value: 27.36 },
            { itemStyle: { color: "#0350B7" }, value: 4.22 }
          ]
        }
      ]
    });
  }

  render() {
    return <div id="LineAmountBarChart"></div>;
  }
}

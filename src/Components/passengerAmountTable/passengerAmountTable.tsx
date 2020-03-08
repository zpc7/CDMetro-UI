import React, { Component } from 'react'
import { Table, Divider } from 'antd';
import _ from 'lodash'

interface Props {
  dataSource: any[]
  lineConfig: any
}
interface State {

}

const makeColumns = (lineConfig) => {
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '日期类型',
      dataIndex: 'dateType',
      key: 'dateType',
    },
    {
      title: '总运量',
      dataIndex: 'sum',
      key: 'sum',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <span>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </span>
      ),
    },
  ];
  lineConfig.forEach((element, index) => {
    columns.splice(2 + index, 0, {
      title: `${element.lineNumber}号线`,
      dataIndex: `line${element.lineNumber}`,
      key: `line${element.lineNumber}`
    })
  });
  return columns
}
const formateData = (data, lineConfig) => data.map(item => {
  let result = {
    id: item.id,
    date: item.date,
    dateType: item.dateType,
    sum: item.sum
  }
  item.lineData.forEach(ele => {
    const lineNumber = _.find(lineConfig, o => o.id === ele.lineId).lineNumber
    result[`line${lineNumber}`] = ele.lineAmount
  })
  return result
})
export default class passengerAmountTable extends Component<Props, State> {
  state = {}
  render() {
    const { dataSource, lineConfig } = this.props;
    const columns = makeColumns(lineConfig)
    const data = formateData(dataSource, lineConfig)
    debugger
    return (
      <div>
        <Table rowKey={record => record.id} columns={columns} dataSource={data} />
      </div>
    )
  }
}

import React from 'react';
import { Table, Divider } from 'antd';
import http from '@/Utils/http'

import PassengerAmountSearch from '@/Components/passengerAmountSearch/PassengerAmountSearch'
import './PassengerAmountManage.less'

interface State {
  startTime: string
  endTime: string
  dataSource: Array<any>
}

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '日期类型',
    dataIndex: 'line1',
    key: 'line1',
  },
  {
    title: '线路1',
    dataIndex: 'line2',
    key: 'line2',
  },
  {
    title: '线路2',
    dataIndex: 'line3',
    key: 'line3',
  },
  {
    title: '线路3',
    dataIndex: 'line4',
    key: 'line4',
  },
  {
    title: '线路4',
    dataIndex: 'line5',
    key: 'line5',
  },
  {
    title: '线路5',
    dataIndex: 'line6',
    key: 'line6',
  },
  {
    title: '线路7',
    dataIndex: 'line7',
    key: 'line7',
  },
  {
    title: '线路10',
    dataIndex: 'line10',
    key: 'line10',
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


export default class PassengerAmountManage extends React.Component<any, State> {
  state = {
    startTime: '',
    endTime: '',
    dataSource: []
  };

  handleDateChange = (date: RangePickerValue, dateString: [string, string]) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }
  componentDidMount() {
    http.get('/passengerAmount')
      .then(res => {
        this.setState({ dataSource: res.data })
      })
  }

  render() {

    return (
      <section className='PAGE-passenger-amount-manage'>
        <PassengerAmountSearch />
        <div className='table-wrapper'>
          <Table rowKey={record => record.id} columns={columns} dataSource={this.state.dataSource} />
        </div>
      </section>
    );
  }
}

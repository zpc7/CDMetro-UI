import React from 'react';
import { Table, Divider, Tag, DatePicker } from 'antd';
import http from '@/Utils/http'

import { RangePickerValue } from 'antd/lib/date-picker/interface';
import './PassengerAmountManage.less'

const { RangePicker } = DatePicker;

interface State {
  startTime: string
  endTime: string
  dataSource: Array<any>
}

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: '线路1',
    dataIndex: 'line1',
    key: 'line1',
  },
  {
    title: '线路2',
    dataIndex: 'line2',
    key: 'line2',
  },
  {
    title: '线路10',
    dataIndex: 'line10',
    key: 'line10',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <span>
        <a>编辑</a>
        <Divider type="vertical" />
        <a>查看</a>
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
      <section className='DATA-MANAGE-LIST'>
        <RangePicker onChange={this.handleDateChange} />
        <div className='table-wrapper'>
          <Table rowKey={record => record.id} columns={columns} dataSource={this.state.dataSource} />
        </div>
      </section>
    );
  }
}

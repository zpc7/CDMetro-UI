import React from 'react';
import { Table, Divider, Tag, DatePicker } from 'antd';
import http from '@/Utils/http'

import { RangePickerValue } from 'antd/lib/date-picker/interface';
import './DataMangeList.less'

const { RangePicker } = DatePicker;

interface IDataMangeListState {
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
    title: '线路3',
    dataIndex: 'line3',
    key: 'line3',
  },
  {
    title: '线路4',
    dataIndex: 'line4',
    key: 'line4',
  },
  {
    title: '线路5',
    dataIndex: 'line5',
    key: 'line5',
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


export default class DataMangeList extends React.Component<any, IDataMangeListState> {
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
    http.get('/passengerAmount2')
      .then(res => {
        debugger
        this.setState({ dataSource: res.data })
      })
      .catch(err => {
        console.log(err)
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

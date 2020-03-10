import React, { Component } from 'react'
import { Table, Divider, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'

// 日期类型简写-全称对照表
const dateTypeCompareBoard = {
  NWD: '普通工作日',
  TDBH: '假期前一天',
  SH: '法定节假日',
};
const showDeleteConfirm = (date, id, onDelete) => {
  Modal.confirm({
    title: `确定删除日期 ${date} 的客运量数据?`,
    icon: <ExclamationCircleOutlined />,
    okType: 'danger',
    onOk() {
      console.log('OK');
      onDelete(id)
    }
  });
}
const makeColumns = ({ lineConfig, onEdit, onDelete }) => {
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
      render: (text: string) => <span>{dateTypeCompareBoard[text]}</span>
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
          <a onClick={() => onEdit(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => showDeleteConfirm(record.date, record.id, onDelete)}>删除</a>
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
  lineConfig.forEach(ele => {
    const lineInfo = _.find(item.lineData, o => o.lineId === ele.id)
    if (lineInfo) {
      result[`line${ele.lineNumber}`] = lineInfo.lineAmount
    } else {
      result[`line${ele.lineNumber}`] = '-'
    }
  });
  return result
})

const passengerAmountTable = props => {
  const { dataSource, lineConfig, onPaginationChange,total } = props;
  const columns = makeColumns(props)
  const data = formateData(dataSource, lineConfig)
  return (
    <div className="COMPONENT-passenger-amount-table">
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={data}
        pagination={{
          total,
          onChange: onPaginationChange
        }}
      />
    </div>
  )
}

export default passengerAmountTable

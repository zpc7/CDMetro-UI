import React, { Component } from 'react'
import { Table, Card, message, Button, Modal, Tag, Divider } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { getLineConfig, LineConfigItem, addLineConfig, updateLineConfigbyId, deleteLineConfigbyId } from '@/Services'
import LineSettingModal from '@/Components/lineSettingModal/LineSettingModal'

interface State {
  total: number
  dataSource: LineConfigItem[]
  visible: boolean
  editRecord: any
}
const showDeleteConfirm = (lineNumber, id, onDelete) => {
  Modal.confirm({
    title: `确定删除线路 ${lineNumber} 号线?`,
    content: '删除线路不会删除线路关联数据',
    icon: <ExclamationCircleOutlined />,
    okType: 'danger',
    onOk() {
      onDelete(id)
    }
  })
}
const makeColumns = (onEdit, onDelete) => ([
  {
    title: '线路 id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '线路编号',
    dataIndex: 'lineNumber',
    key: 'lineNumber',
  },
  {
    title: '线路主题色',
    dataIndex: 'lineColor',
    key: 'lineColor',
    render: (text: string, record: LineConfigItem) => (<Tag color={text}> {record.lineNumber}号线 </Tag>)
  },
  {
    title: '线路类型',
    dataIndex: 'lineType',
    key: 'lineType',
  },
  {
    title: '开通日期',
    dataIndex: 'openDate',
    key: 'openDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => showDeleteConfirm(record.lineNumber, record.id, onDelete)}>删除</a>
      </span>
    ),
  },
])

export default class LineSetting extends Component<{}, State> {
  state = {
    total: 0,
    dataSource: [],
    visible: false,
    editRecord: null
  }
  handleAdd = () => {
    this.setState({ visible: true })
  }
  componentDidMount() {
    this.getConfigList()
  }
  getConfigList = async () => {
    const res = await getLineConfig()
    this.setState({ total: res.total, dataSource: res.list })
  }
  handleEdit = record => {
    this.setState({ visible: true, editRecord: record })
  }
  handleDelete = async id => {
    await deleteLineConfigbyId(id)
    message.success('删除线路成功')
    this.getConfigList()
  }
  handleCancel = () => {
    this.setState({ visible: false, editRecord: null })
  }
  handleOK = async (fieldsValue, type, editRecord) => {
    if (type === 'add') {
      await addLineConfig(fieldsValue)
      message.success('新增线路成功')
    } else {
      await updateLineConfigbyId(editRecord.id, fieldsValue)
      message.success('编辑线路成功')
    }
    this.setState({ visible: false, editRecord: null })
    this.getConfigList()
  }
  render() {
    const { total, visible, editRecord, dataSource } = this.state
    const columns = makeColumns(this.handleEdit, this.handleDelete)
    return (
      <div>
        <Card
          title={`已开通运营 ${total} 条线路`}
          extra={<Button type="primary" onClick={this.handleAdd} icon={<PlusOutlined />}> 新增线路 </Button>}>
          <Table rowKey="id" columns={columns} dataSource={dataSource} />
        </Card>
        <LineSettingModal
          visible={visible}
          editRecord={editRecord}
          onCancel={this.handleCancel}
          onOk={this.handleOK} />
      </div>
    )
  }
}

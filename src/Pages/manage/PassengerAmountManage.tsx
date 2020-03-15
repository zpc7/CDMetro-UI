import React from 'react'
import _ from 'lodash'
import {
  getLineConfig,
  getPassengerTraffic,
  deletePassengerTrafficbyId,
  addPassengerTrafficbyId,
  updatePassengerTrafficbyId,
  LineConfigItem,
  PassengerTrafficItem
} from '@/Services'

import { Button, message } from 'antd'
import { PlusOutlined, FullscreenOutlined, ReloadOutlined } from '@ant-design/icons'
import PassengerAmountSearch from '@/Components/passengerAmountSearch/PassengerAmountSearch'
import PassengerAmountTable from '@/Components/passengerAmountTable/PassengerAmountTable'
import PassengerAmountModal from '@/Components/passengerAmountModal/PassengerAmountModal'
import './PassengerAmountManage.less'

interface Pagination {
  page: number
  pageSize: number
}
interface State {
  total: number
  visible: boolean
  pagination: Pagination
  dataSource: PassengerTrafficItem[]
  lineConfig: LineConfigItem[]
  editRecord: any
}

export default class PassengerAmountManage extends React.Component<{}, State> {
  state = {
    visible: false,
    pagination: {
      page: 1,
      pageSize: 10
    },
    total: 0,
    dataSource: [],
    lineConfig: [],
    editRecord: null,
  };

  async componentDidMount() {
    const lineConfigResponse = await getLineConfig()
    this.setState({ lineConfig: lineConfigResponse.list })
    this.getDataList()
  }
  handleAdd = () => {
    this.setState({ visible: true })
  }
  handleOk = async (values, type, editRecord) => {
    console.log('request:', values)
    if (type === 'add') {
      await addPassengerTrafficbyId(values)
      message.success('新增成功')
    } else {
      await updatePassengerTrafficbyId(editRecord.id, values)
      message.success('编辑成功')
    }
    this.setState({ visible: false, editRecord: null })
    this.getDataList()
  }
  handleCancel = () => {
    this.setState({ visible: false, editRecord: null })
  }
  handleEdit = (editRecord) => {
    this.setState({ editRecord, visible: true })
  }
  handlePaginationChange = (page, pageSize) => {
    this.setState({ pagination: { page, pageSize } }, this.getDataList)
  }
  handleDelete = async (id) => {
    await deletePassengerTrafficbyId(id)
    message.success('删除成功')
    this.getDataList()
  }
  getDataList = async () => {
    const { page, pageSize } = this.state.pagination
    const res = await getPassengerTraffic(`page=${page}&pageSize=${pageSize}`)
    this.setState({ dataSource: res.list, total: res.total })
    message.success('列表更新成功')
  }
  handleSearch = async ({ dateRange, dateType }) => {
    const dateRangeUrl = dateRange ? `&startDate=${dateRange[0]}&endDate=${dateRange[1]}` : ''
    const dateTypeUrl = dateType ? `&dateType=${dateType}` : ''
    const res = await getPassengerTraffic(`page=1&pageSize=10${dateRangeUrl}${dateTypeUrl}`)
    message.success('查询成功')
    this.setState({ dataSource: res.list, total: res.total })
  }

  render() {
    const { dataSource, lineConfig, visible, total, editRecord } = this.state
    return (
      <section className="PAGE-passenger-amount-manage">
        <PassengerAmountSearch onSearch={this.handleSearch} />
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div className="title">详细数据</div>
            <div className="option">
              <Button type="primary" onClick={this.handleAdd} icon={<PlusOutlined />}>
                新增
              </Button>
              <div className='extra-operation'>
                <FullscreenOutlined />
                <ReloadOutlined onClick={this.getDataList} />
              </div>
            </div>
          </div>
          <PassengerAmountTable
            total={total}
            dataSource={dataSource}
            lineConfig={lineConfig}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
            onPaginationChange={this.handlePaginationChange}
          />
        </div>
        <PassengerAmountModal
          visible={visible}
          editRecord={editRecord}
          lineConfig={lineConfig}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
      </section>
    )
  }
}

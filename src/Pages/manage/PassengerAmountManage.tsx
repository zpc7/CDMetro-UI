import React from 'react'
import {
  getLineConfig,
  getPassengerTraffic,
  deletePassengerTrafficbyId,
  addPassengerTraffic,
  updatePassengerTrafficbyId,
} from '@/Services'
import { LineConfigItem, PassengerTrafficItem } from '@/Services/interface'

import { Button, Tooltip, message } from 'antd'
import { PlusOutlined, FullscreenOutlined, ReloadOutlined, InfoCircleOutlined, SoundOutlined } from '@ant-design/icons'
import PassengerAmountSearch from '@/Components/passengerAmountSearch/PassengerAmountSearch'
import { PassengerAmountTable } from '@/Components/passengerAmountTable/PassengerAmountTable'
import PassengerAmountModal from '@/Components/passengerAmountModal/PassengerAmountModal'
import './PassengerAmountManage.less'

interface SearchCondition {
  page: number
  pageSize: number
  dateRange: [string, string] | string
  dateType: string
}
interface State {
  total: number
  visible: boolean
  loading: boolean
  searchCondition: SearchCondition
  dataSource: PassengerTrafficItem[]
  lineConfig: LineConfigItem[]
  editRecord: any
}

export default class PassengerAmountManage extends React.Component<{}, State> {
  state = {
    visible: false,
    searchCondition: {
      page: 1,
      pageSize: 10,
      dateRange: '',
      dateType: ''
    },
    total: 0,
    dataSource: [],
    lineConfig: [],
    editRecord: null,
    loading: false
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
    if (type === 'add') {
      await addPassengerTraffic(values)
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
  handleEdit = editRecord => {
    this.setState({ editRecord, visible: true })
  }
  handlePaginationChange = (page, pageSize) => {
    const { searchCondition } = this.state
    this.setState({ searchCondition: { ...searchCondition, page, pageSize } }, this.getDataList)
  }
  handleDelete = async id => {
    await deletePassengerTrafficbyId(id)
    message.success('删除成功')
    this.getDataList()
  }
  getDataList = async () => {
    const { page, pageSize, dateRange, dateType } = this.state.searchCondition
    const dateRangeUrl = dateRange ? `&startDate=${dateRange[0]}&endDate=${dateRange[1]}` : ''
    const dateTypeUrl = dateType ? `&dateType=${dateType}` : ''
    try {
      this.setState({ loading: true })
      const res = await getPassengerTraffic(`page=${page}&pageSize=${pageSize}${dateRangeUrl}${dateTypeUrl}`)
      this.setState({ dataSource: res.list, total: res.total })
      message.success('列表更新成功')
    } finally {
      this.setState({ loading: false })
    }
  }
  handleSearch = ({ dateRange, dateType }) => {
    const { searchCondition } = this.state
    this.setState({ searchCondition: { ...searchCondition, dateRange, dateType } }, this.getDataList)
  }
  // 全屏
  handleFullScreen = () => {
    document.getElementsByTagName('body')[0].requestFullscreen()
  }

  render() {
    const { dataSource, lineConfig, visible, total, editRecord, loading } = this.state
    return (
      <section className="PAGE-passenger-amount-manage">
        <PassengerAmountSearch onSearch={this.handleSearch} />
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div className="title">
              <span className='desc'>详细数据</span>
              <span className='budge'>{total}</span>
              <Tooltip className='tips' title='2016-08-24 前的客运数据不完整, 故未收录此前数据'>
                <InfoCircleOutlined />
              </Tooltip>
              <Tooltip className='tips' title='博主 @成都地铁运营 于 2020-10-10 开始更新"有轨电车"客运量, 并纳入总客运量统计, 此日期前客运数据未能收录'>
                <SoundOutlined />
              </Tooltip>
            </div>
            <div className="option">
              <Button type="primary" onClick={this.handleAdd} icon={<PlusOutlined />}>
                新增
              </Button>
              <div className='extra-operation'>
                <FullscreenOutlined onClick={this.handleFullScreen} />
                <ReloadOutlined onClick={this.getDataList} />
              </div>
            </div>
          </div>
          <PassengerAmountTable
            total={total}
            loading={loading}
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

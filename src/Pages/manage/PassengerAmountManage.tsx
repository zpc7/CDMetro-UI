import React from "react";
import _ from 'lodash'

import http from "@/Utils/http";
import { Button, message } from "antd";
import { PlusOutlined, FullscreenOutlined, ReloadOutlined } from "@ant-design/icons";
import PassengerAmountSearch from "@/Components/passengerAmountSearch/PassengerAmountSearch";
import PassengerAmountTable from "@/Components/passengerAmountTable/PassengerAmountTable";
import PassengerAmountModal from "@/Components/passengerAmountModal/PassengerAmountModal";
import "./PassengerAmountManage.less";

interface SearchCondition {
  page: number;
  pageSize: number;
}
interface State {
  total: number;
  visible: boolean;
  searchCondition: SearchCondition;
  dataSource: Array<any>;
  lineConfig: any
  editRecord: any,
  lastestDate: string
}

export default class PassengerAmountManage extends React.Component<{}, State> {
  state = {
    visible: false,
    searchCondition: {
      page: 1,
      pageSize: 10
    },
    total: 0,
    dataSource: [],
    lineConfig: [],
    editRecord: null,
    lastestDate: ''
  };

  async componentDidMount() {
    const lineConfigResponse = await http.get('/lineConfig')
    this.setState({ lineConfig: lineConfigResponse.list });
    this.getDataList()
  }
  handleAdd = () => {
    this.setState({ visible: true })
  }
  handleOk = async (values, type, editRecord) => {
    console.log('request:', values)
    if (type === 'add') {
      await http.post('/dayAmount', values)
      message.success('新增成功')
    } else {
      await http.put(`/dayAmount/${editRecord.id}`, values)
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
    this.getDataList(page, pageSize)
  }
  handleDelete = async (id) => {
    await http.delete(`/dayAmount/${id}`)
    message.success('删除成功')
    this.getDataList()
  }
  getDataList = async (page = 1, pageSize = 10) => {
    const res = await http.get(`/dayAmount?page=${page}&pageSize=${pageSize}`);
    this.setState({ dataSource: res.list, total: res.total, lastestDate: _.get(res, 'list[0].date', '') })
    message.success('列表更新成功')
  }
  handleSearch = async ({ dateRange, dateType }) => {
    const dateRangeUrl = dateRange ? `&startDate=${dateRange[0]}&endDate=${dateRange[1]}` : ''
    const dateTypeUrl = dateType ? `&dateType=${dateType}` : ''
    const res = await http.get(`/dayAmount?page=1&pageSize=10${dateRangeUrl}${dateTypeUrl}`);
    message.success('查询成功')
    this.setState({ dataSource: res.list, total: res.total })
  }

  render() {
    const { dataSource, lineConfig, visible, total, editRecord, lastestDate } = this.state;
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
                <ReloadOutlined onClick={() => this.getDataList(1, 10)} />
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
          loading={false}
          visible={visible}
          editRecord={editRecord}
          lineConfig={lineConfig}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          lastestDate={lastestDate}
        />
      </section>
    );
  }
}

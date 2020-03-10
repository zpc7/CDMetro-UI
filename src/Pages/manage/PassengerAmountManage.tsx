import React from "react";

import http from "@/Utils/http";
import { Button } from "antd";
import { PlusOutlined, FullscreenOutlined, ReloadOutlined } from "@ant-design/icons";
import PassengerAmountSearch from "@/Components/passengerAmountSearch/PassengerAmountSearch";
import PassengerAmountTable from "@/Components/passengerAmountTable/PassengerAmountTable";
import PassengerAmountModal from "@/Components/passengerAmountModal/PassengerAmountModal";
import "./PassengerAmountManage.less";

interface SearchCondition {
  dateRange: string;
  dateType: string;
  line: string;
  page: number;
  pageSize: number;
}
interface State {
  total: number;
  visible: boolean;
  searchCondition: SearchCondition;
  dataSource: Array<any>;
  lineConfig: any
}

export default class PassengerAmountManage extends React.Component<{}, State> {
  state = {
    visible: false,
    searchCondition: {
      dateRange: "",
      dateType: "",
      line: "",
      page: 1,
      pageSize: 10
    },
    total: 0,
    dataSource: [],
    lineConfig: []
  };

  async componentDidMount() {
    const res = await http.get("/dayAmount");
    const lineConfigResponse = await http.get('/lineConfig')
    this.setState({ dataSource: res.list, total: res.total, lineConfig: lineConfigResponse.list });
  }
  handleAdd = () => {
    this.setState({ visible: true })
  }
  handleOk = async (values) => {
    console.log('request:', values)
    await http.post('/dayAmount', values)
    this.setState({ visible: false })
    const res = await http.get("/dayAmount");
    this.setState({ dataSource: res.list, total: res.total })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  render() {
    const { dataSource, lineConfig, visible } = this.state;
    return (
      <section className="PAGE-passenger-amount-manage">
        <PassengerAmountSearch />
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div className="title">详细数据</div>
            <div className="option">
              <Button type="primary" onClick={this.handleAdd} icon={<PlusOutlined />}>
                新增
              </Button>
              <div className='extra-operation'>
                <FullscreenOutlined />
                <ReloadOutlined />
              </div>
            </div>
          </div>
          <PassengerAmountTable dataSource={dataSource} lineConfig={lineConfig} />
        </div>
        <PassengerAmountModal
          loading={false}
          visible={visible}
          lineConfig={lineConfig}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
      </section>
    );
  }
}

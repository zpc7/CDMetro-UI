import React from "react";

import http from "@/Utils/http";
import { Button } from "antd";
import { PlusOutlined, FullscreenOutlined, ReloadOutlined } from "@ant-design/icons";
import PassengerAmountSearch from "@/Components/passengerAmountSearch/PassengerAmountSearch";
import PassengerAmountTable from "@/Components/passengerAmountTable/PassengerAmountTable";
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
    dataSource: []
  };

  async componentDidMount() {
    const res = await http.get("/lineAmount");
    debugger;
    this.setState({ dataSource: res.list, total: res.total });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <section className="PAGE-passenger-amount-manage">
        <PassengerAmountSearch />
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div className="title">详细数据</div>
            <div className="option">
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
              <div className='extra-operation'>
                <FullscreenOutlined />
                <ReloadOutlined />
              </div>
            </div>
          </div>
          <PassengerAmountTable dataSource={dataSource} />
        </div>
      </section>
    );
  }
}

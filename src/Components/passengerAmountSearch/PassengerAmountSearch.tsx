import moment from "moment";
import { Row, Col, Form, Select, DatePicker, Button } from "antd";
import React, { Component } from "react";
import "./PassengerAmountSearch.less";

const { RangePicker } = DatePicker;

interface Props { }
interface State { }

export default class PassengerAmountSearch extends Component<Props, State> {
  state = {};
  handleChange = (dates, dateStrings) => {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  };
  render() {
    const tailLayout = {
      wrapperCol: { offset: 4, span: 8 }
    };
    const onFinish = values => {
      debugger;
    };
    return (
      <div className="COMPONENT-passenger-amount-search">
        <Form
          name="basic"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}>
          <Row>
            <Col span={7}>
              <Form.Item label="日期范围" name="dataRange">
                <RangePicker
                  ranges={{
                    今日: [moment(), moment()],
                    本周: [moment().startOf("week"), moment().endOf("week")],
                    本月: [moment().startOf("month"), moment().endOf("month")]
                  }}
                  style={{ width: '90%' }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="线路" name='line'>
                <Select allowClear>
                  <Select.Option value="1">1号线</Select.Option>
                  <Select.Option value="2">2号线</Select.Option>
                  <Select.Option value="3">3号线</Select.Option>
                  <Select.Option value="4">4号线</Select.Option>
                  <Select.Option value="5">5号线</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="日期类型" name='dateType'>
                <Select allowClear>
                  <Select.Option value="NWD">普通工作日</Select.Option>
                  <Select.Option value="TDBH">假期前一天 </Select.Option>
                  <Select.Option value="SH">法定节假日</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"> 查询 </Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </div>
    );
  }
}

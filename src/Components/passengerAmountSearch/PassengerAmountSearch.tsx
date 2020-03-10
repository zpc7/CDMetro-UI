import moment from "moment";
import { Row, Col, Form, Select, DatePicker, Button } from "antd";
import React, { Component } from "react";
import "./PassengerAmountSearch.less";

const { RangePicker } = DatePicker;

const PassengerAmountSearch = ({ onSearch }) => {
  const onFinish = ({ dateRange, dateType }) => {
    onSearch({
      dateType,
      dateRange: dateRange ? dateRange.map(i => i.format('YYYY-MM-DD')) : ''
    })
  };
  return (
    <div className="COMPONENT-passenger-amount-search">
      <Form onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Row>
          <Col span={7}>
            <Form.Item label="日期范围" name="dateRange">
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
            <Form.Item wrapperCol={{ offset: 4, span: 8 }}>
              <Button type="primary" htmlType="submit"> 查询 </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default PassengerAmountSearch

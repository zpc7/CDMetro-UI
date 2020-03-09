import React from "react";
import { Modal, Form, DatePicker, Select, Input, Row, Col, Divider } from "antd";
import "./passengerAmountModal.less";

interface Props {
  visible: boolean
  loading: boolean
  lineConfig: any[]
}
export default class PassengerAmountModal extends React.Component<Props> {
  handleOk = () => {
    debugger
    this.setState({ loading: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, lineConfig } = this.props;
    return (
      <div className="COMPONENT-passenger-amount-modal">
        <Modal
          visible={visible}
          title="新增客运数据"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            wrapperCol={{ span: 14 }}
            onFinish={this.handleOk}
          >
            <Form.Item
              name="date"
              label="客运日期"
              rules={[{ type: "object", required: true, message: "请选择日期!" }]}
            >
              <DatePicker style={{ width: '80%' }} />
            </Form.Item>
            <Form.Item label="日期类型" name="dateType" rules={[{ required: true, message: "请选择日期类型!" }]}>
              <Select allowClear>
                <Select.Option value="NWD">普通工作日</Select.Option>
                <Select.Option value="TDBH">假期前一天 </Select.Option>
                <Select.Option value="SH">法定节假日</Select.Option>
              </Select>
            </Form.Item>
            <Row>
              {lineConfig.map(item => (
                <Col span={12} key={item.id}>
                  <Form.Item
                    label={`线路${item.lineNumber}`}
                    name={`line${item.lineNumber}`}
                    rules={[{ required: true, message: `请填写线路${item.lineNumber}!` }]}>
                    <Input />
                  </Form.Item>
                </Col>))}
            </Row>
            <Divider style={{ margin: '12px 0' }} />
            <Form.Item
              label="总运量"
              name="sum"
              labelCol={{ offset: 4, span: 4 }}
              wrapperCol={{ span: 6 }}
              style={{ margin: '12px 0 0' }}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

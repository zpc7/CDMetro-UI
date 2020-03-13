import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Modal, Form, DatePicker, Select, Input, Row, Col, Divider, Button } from 'antd'
import './passengerAmountModal.less'

interface Props {
  visible: boolean
  loading: boolean
  lineConfig: any[]
  onOk: Function
  onCancel: Function
  editRecord: any
  lastestDate: string
}

const PassengerAmountModal = ({ visible, editRecord, lineConfig, onCancel, onOk, loading, lastestDate }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setconfirmLoading] = useState(false)
  const modalType = _.isEmpty(editRecord) ? 'add' : 'edit'
  const modalTitle = modalType === 'edit' ? '编辑' : '新增'

  useEffect(() => {
    console.log('editRecord:', editRecord)
    if (!_.isEmpty(editRecord)) {
      form.setFields([{
        name: 'sum',
        value: editRecord.sum
      }, {
        name: 'date',
        value: moment(editRecord.date)
      }, {
        name: 'dateType',
        value: editRecord.dateType
      }])
      lineConfig.forEach(ele => {
        const key = `line${ele.lineNumber}`
        form.setFieldsValue({ [key]: editRecord[key] })
      })
    }
  }, [editRecord])

  useEffect(() => {
    lastestDate !== '' && form.setFieldsValue({ date: moment(lastestDate).subtract(1, 'days') })
  }, [lastestDate])

  const handleFinish = fieldsValue => {
    console.log('fieldsValue:', fieldsValue)
    const { date, dateType, sum } = fieldsValue
    const formatedFieldsValue = {
      sum,
      dateType,
      date: date.format('YYYY-MM-DD'),
      lineData: lineConfig.map(item => ({
        lineId: item.id,
        lineAmount: fieldsValue[`line${item.lineNumber}`]
      }))
    }

    setconfirmLoading(true)
    onOk(formatedFieldsValue, modalType, editRecord).then(() => {
      form.resetFields()
    }).finally(() => {
      setconfirmLoading(false)
    })
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }
  // 线路数值变化,自动累加总和sum
  const handleLineChange = () => {
    const keys = lineConfig.map(item => `line${item.lineNumber}`)
    const lineValues = form.getFieldsValue(keys)
    form.setFieldsValue({
      sum: _.sum(Object.values(lineValues).map(v => {
        const newVal = Number(v)
        return (_.isNaN(newVal) || newVal < 0) ? 0 : newVal
      })).toFixed(2),
    })
  }

  return (
    <Modal
      visible={visible}
      title={`${modalTitle}客运数据`}
      width={600}
      footer={null}
      forceRender
      destroyOnClose={false}
      onCancel={handleCancel}
      wrapClassName='COMPONENT-passenger-amount-modal'
    >
      <Form form={form} onFinish={handleFinish} initialValues={{ date: moment(lastestDate).subtract(1, 'days'), dateType: 'NWD' }}>
        <Form.Item
          name="date"
          label="客运日期"
          wrapperCol={{ span: 6 }}
          rules={[{ type: 'object', required: true, message: '请选择日期!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="日期类型"
          name="dateType"
          wrapperCol={{ span: 7 }}
          rules={[{ required: true, message: '请选择日期类型!' }]}>
          <Select allowClear>
            <Select.Option value="NWD">普通工作日</Select.Option>
            <Select.Option value="TDBH">假期前一天 </Select.Option>
            <Select.Option value="SH">法定节假日</Select.Option>
          </Select>
        </Form.Item>
        <Divider style={{ margin: '0 0 24px' }} />
        <Row gutter={8}>
          {lineConfig.map(item => (
            <Col span={12} key={item.id}>
              <Form.Item
                label={`${item.lineNumber}号线`}
                name={`line${item.lineNumber}`}
                rules={[{
                  required: true,
                  message: `请填写${item.lineNumber}号线!`
                }, {
                  pattern: /^(([1-9]\d*)|0)(\.\d{1,2})?$/,
                  message: '请填写不超过2位小数的正数'
                }]}>
                <Input onChange={handleLineChange} />
              </Form.Item>
            </Col>))}
        </Row>
        <Divider style={{ margin: '0' }} />
        <Form.Item
          label="总运量"
          name="sum"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 7 }}
          style={{ margin: '24px 0 0' }}>
          <Input />
        </Form.Item>
        <div className='operation'>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>确认</Button>
          <Button onClick={handleCancel}>取消</Button>
        </div>
      </Form>
    </Modal>
  )
}
export default PassengerAmountModal

import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Modal, Form, DatePicker, Select, Input, Button } from 'antd'
import './LineSettingModal.less'

interface Props {
  visible: boolean
  editRecord: any
  onCancel: Function
  onOk: Function
}

const LineSettingModal = ({ visible, editRecord, onCancel, onOk }: Props) => {
  const [form] = Form.useForm()
  const [confirmLoading, setconfirmLoading] = useState(false)
  const modalType = _.isEmpty(editRecord) ? 'add' : 'edit'
  const modalTitle = modalType === 'edit' ? '编辑' : '新增'

  useEffect(() => {
    console.log('editRecord:', editRecord)
    if (!_.isEmpty(editRecord)) {
      form.setFields([{
        name: 'lineNumber',
        value: editRecord.lineNumber
      }, {
        name: 'lineColor',
        value: editRecord.lineColor
      }, {
        name: 'lineType',
        value: editRecord.lineType
      }, {
        name: 'openDate',
        value: moment(editRecord.openDate)
      }])
    }
  }, [editRecord])

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }
  const handleFinish = fieldsValue => {
    console.log('fieldsValue:', fieldsValue)
    const formatedFieldsValue = {
      ...fieldsValue,
      openDate: fieldsValue.openDate.format('YYYY-MM-DD'),
    }
    setconfirmLoading(true)
    onOk(formatedFieldsValue, modalType, editRecord).then(() => {
      form.resetFields()
    }).finally(() => {
      setconfirmLoading(false)
    })
  }
  return (
    <Modal
      visible={visible}
      title={`${modalTitle}线路`}
      width={600}
      footer={null}
      forceRender
      destroyOnClose={false}
      onCancel={handleCancel}
      wrapClassName='COMPONENT-line-setting-modal'
    >
      <Form form={form} onFinish={handleFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="线路编号" name="lineNumber" rules={[{ required: true, message: '请填写线路编号!' }]}>
          <Input placeholder='例如：13号线，输入13即可' />
        </Form.Item>
        <Form.Item label="线路主题色" name="lineColor" rules={[{ required: true, message: '请填写线路主题色!' }]}>
          <Input placeholder='例如：#E5007F' />
        </Form.Item>
        <Form.Item
          label="线路类型"
          name="lineType"
          rules={[{ required: true, message: '请选择线路类型!' }]}>
          <Select allowClear>
            <Select.Option value="8A">8A</Select.Option>
            <Select.Option value="6A">6A </Select.Option>
            <Select.Option value="6B">6B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="openDate"
          label="首次开通运营日期"
          rules={[{ type: 'object', required: true, message: '请选择日期!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <div className='operation'>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>确认</Button>
          <Button onClick={handleCancel}>取消</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default LineSettingModal

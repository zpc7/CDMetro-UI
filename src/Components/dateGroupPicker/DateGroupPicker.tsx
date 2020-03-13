import moment, { Moment } from 'moment'
import _ from 'lodash'
import React, { useState } from 'react'
import { Radio, DatePicker } from 'antd'
import './DateGroupPicker.less'
const { RangePicker } = DatePicker

import { RangeValue } from 'rc-picker/lib/interface'

const dateRangeCompareBoard = {
  recent: [moment().subtract(30, 'days'), moment()],
  week: [moment().startOf('week'), moment().endOf('week')],
  month: [moment().startOf('month'), moment().endOf('month')],
  year: [moment().startOf('year'), moment().endOf('year')]
}

const DateGroupPicker = ({ getDataByDateRange }) => {
  const [radioGroupValue, setRadioGroupValue] = useState('recent')
  const [rangePickerValue, setRangePickerValue] = useState(dateRangeCompareBoard['recent'])
  const handleRadioGroupChange = (e) => {
    const { value } = e.target
    setRadioGroupValue(value)
    setRangePickerValue(dateRangeCompareBoard[value])
    getDataByDateRange(dateRangeCompareBoard[value])
  }
  const handleRangePickerChange = (dates) => {
    setRangePickerValue(dates)
    if (dates) {
      getDataByDateRange(dates)
      const key = _.findKey(dateRangeCompareBoard, item => item[0].isSame(dates[0], 'day') && item[1].isSame(dates[1], 'day'))
      if (key) {
        setRadioGroupValue(key)
        return
      }
    }
    setRadioGroupValue('')
  }
  return (
    <div className='COMPONENT-date-group-picker'>
      <Radio.Group onChange={handleRadioGroupChange} value={radioGroupValue}>
        <Radio.Button value="recent">近30天</Radio.Button>
        <Radio.Button value="week">本周</Radio.Button>
        <Radio.Button value="month">本月</Radio.Button>
        <Radio.Button value="year">全年</Radio.Button>
      </Radio.Group>
      <RangePicker
        className='range-picker'
        onChange={handleRangePickerChange}
        value={rangePickerValue as RangeValue<Moment>}
      />
    </div>
  )
}

export default DateGroupPicker

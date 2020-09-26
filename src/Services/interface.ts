export interface LineConfigItem {
  id?: number // 兼容 新增和获取
  lineNumber: string
  lineColor: string
  lineType: string
  openDate: string
}

export interface LineConfigResponse {
  total: number
  list: LineConfigItem[]
}

interface LineDataItem {
  lineId: number
  lineAmount: string
}

export interface PassengerTrafficItem {
  id?: number // 兼容 新增和获取
  date: string
  dateType: string
  lineData: LineDataItem[]
  sum: string
}

export interface PassengerTrafficResponse {
  total: number
  list: PassengerTrafficItem[]
}

interface MonthlyAverageData {
  average: string
  lineAverage: Array<{ lineId: number; average: string }>
}

export interface AverageMonthlyDataResponse {
  max: {
    date: string
    value: string
  }
  min: {
    date: string
    value: string
  }
  currentMonth: MonthlyAverageData
  lastMonth: MonthlyAverageData
  sameMonthLastYear: MonthlyAverageData
}

export interface AverageMonthlyDataWithDateTypeResponse {
  NWD: MonthlyAverageData  // 普通工作日
  TDBH: MonthlyAverageData  // 假期前一天
  SH: MonthlyAverageData // 周末和法定节假日
}

export interface HighestRecordResponse {
  max: string
  maxDate: string
  lineMax: Array<{ lineId: number; value: string; date: string }>
}

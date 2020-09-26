import http from '@/Utils/http'
import { LineConfigResponse, PassengerTrafficResponse, PassengerTrafficItem, AverageMonthlyDataResponse, AverageMonthlyDataWithDateTypeResponse, HighestRecordResponse, LineConfigItem } from './interface'


// 获取线路配置列表
export const getLineConfig: () => Promise<LineConfigResponse> = () => http.get('/lineConfig')
// 获取完整客运量列表
export const getPassengerTraffic: (queryUrl: string) => Promise<PassengerTrafficResponse>
  = queryUrl => http.get(`/dayAmount?${queryUrl}`)
// 删除客运量ById
export const deletePassengerTrafficbyId: (id: number) => Promise<any> = id => http.delete(`/dayAmount/${id}`)
// 新增客运量
export const addPassengerTraffic: (value: PassengerTrafficItem) => Promise<any> = value => http.post('/dayAmount', value)
// 更新客运量ById
export const updatePassengerTrafficbyId: (id: number, value: PassengerTrafficItem) => Promise<any>
  = (id, value) => http.put(`/dayAmount/${id}`, value)
// 获取最新一天客运量
export const getLastestPassengerTraffic: () => Promise<PassengerTrafficItem> = () => http.get('/analysis/lastest')
// 获取日期时间段内的客运量
export const getPassengerTrafficWithDateRange: (startDate: string, endDate: string) => Promise<PassengerTrafficResponse>
  = (startDate, endDate) => http.get(`/analysis?startDate=${startDate}&endDate=${endDate}`)
// 获取月度分析数据
export const getAverageDataByMonth: (month: string) => Promise<AverageMonthlyDataResponse>
  = month => http.get(`/analysis/monthly/${month}`)
// 获取月度分日期类别分析数据
export const getAverageDataWithDateTypeByMonth: (month: string) => Promise<AverageMonthlyDataWithDateTypeResponse>
  = month => http.get(`/analysis/monthly/dateType/${month}`)
// 获取最高纪录
export const getHighestRecord: () => Promise<HighestRecordResponse> = () => http.get('analysis/highestRecord')
// 新增线路信息
export const addLineConfig: (value: LineConfigItem) => Promise<any> = value => http.post('/lineConfig', value)
// 更新线路信息ById
export const updateLineConfigbyId: (id: number, value: LineConfigItem) => Promise<any>
  = (id, value) => http.put(`/lineConfig/${id}`, value)
// 删除线路信息ById
export const deleteLineConfigbyId: (id: number) => Promise<any> = id => http.delete(`/lineConfig/${id}`)


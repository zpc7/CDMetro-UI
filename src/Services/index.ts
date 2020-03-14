import http from '@/Utils/http'

export interface LineConfigItem {
  id: number
  lineNumber: string
  lineColor: string
}
interface LineConfigResponse {
  total: number
  list: LineConfigItem[]
}

interface LineDataItem {
  lineId: number
  lineAmount: string
}
export interface PassengerTrafficItem {
  id: number
  date: string
  dateType: string
  lineData: LineDataItem[]
  sum: string
}
interface PassengerTrafficResponse {
  total: number
  list: PassengerTrafficItem[]
}
// 获取线路配置列表
export const getLineConfig: () => Promise<LineConfigResponse> = () => http.get('/lineConfig')
// 获取完整客运量列表
export const getPassengerTraffic: (queryUrl: string) => Promise<PassengerTrafficResponse>
  = queryUrl => http.get(`/dayAmount?${queryUrl}`)
// 获取最新一天的数据
export const getLastestPassengerTraffic: () => Promise<PassengerTrafficItem> = () => http.get('/analysis/lastest')
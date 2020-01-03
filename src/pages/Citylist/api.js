import request from '../../utils/http.js'

export const getAreaCity = () => {
  return request(`area/city?level=1`)
}
export const getHotCity = () => {
  return request(`area/hot`)
}

import request from '../../../../utils/http.js'

export const getHouseCondition = (cityID) => {
  return request(`/houses/condition?id=${cityID}`)
}
// export const getHotCity = () => {
//   return request(`area/hot`)
// }

import request from '../../utils/http.js'

export const getSwiper = () => {
  return request(`/home/swiper`)
}

export const getGroups = () => {
  return request(`/home/groups`)
}

export const getNews = () => {
  return request(`/home/news`)
}

export const getAreaInfo = cityName => {
  return request(`/area/info?name=${cityName}`)
}

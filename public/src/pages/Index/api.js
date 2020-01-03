import request from '../../utils/http.js'

export const getSwiper = () => {
    return request(`/home/swiper`);
}
export const getGroups = () => {
    return request(`/home/groups`);
}
export const getNews = () => {
    return request(`/home/news`);
}
// 根据城市名称查询该城市信息
export const getAreaInfo = cityName => {
    return request(`/area/info?name=${cityName}`);
}


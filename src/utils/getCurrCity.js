import { getAreaInfo } from '../pages/Index/api.js'

import { getCity, setCity } from './city.js'
// getCurrCityName
// 1. 获取本地存储的城市信息
// 2. 没有
// 2.1 发送请求获取信息
// 2.2. 写入本地存储
// 2.3 提供给外部
// 3. 有-> 直接提供给外部
 const getCurrCity = () => {
  const curr = getCity()
  if(!curr){
    return new Promise((resolve) => {
      var myCity = new window.BMap.LocalCity();
        myCity.get( async result => {
        const cityName = result.name
        const {data} = await getAreaInfo(cityName)
        if(data.status === 200){
          // 暴露给外部城市信息
          // 存储的目的
          // 不用每次都得获取这个城市信息
          setCity(data.body)
          // 通过resolve回调函数拿到结果,然后在外部通过.then()来拿到结果 , 如果能.then 就能通async await 来拿结果
          resolve(data.body)
          return data.body
        }
        // this.setState(() => {
        //   return { currCity: cityName}
        // })
      })
    })
}else{
  // 直接返回给外部
    // return new Promise(resolve => {
    //   resolve(curr)
    // })
    // 简写
   return  Promise.resolve(curr)
  }
}
export { getCurrCity, setCity, getCity}


// 异步问题
// 解释: 在异步外面使用异步里面的结果
// 解决方案
// 1. cb->在有结果的位置调用cb(结果)->回调地狱----> 回调函数的方法取结果
// 2. Promise->一个异步就是一个Promise->resolve(res)->.then((res)=>{})
// 3. ES7->async+await

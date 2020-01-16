import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { getHouses } from './api.js';
import {getCity} from '../../utils/city.js'
// import { getCity } from '../../../utils/city.js'
// 获取当前定位城市信息
// 防止ls的数据失效或者清除导致的 value没值() => 导致了cityId没值->导致请求失败
const { value = "AREA|88cff55c-aaa4-e2e0" } = getCity()

const { label } = JSON.parse(localStorage.getItem('hkzf_city'));

export default class HouseList extends React.Component {
  state = {
    state: 1,
    end: 20,
    total: 0,
    houseList: [],
    // filter: {}
  }
  // 默认加载的数据的条件(每条件)而非状态数据
   filter = {}

loadHousesByCondition = async filter => {
  const { start, end, } = this.state

  const {data} = await getHouses( {cityId:value ,filter:filter,start,end} ) 
  if( data.status === 200){
    this.setState(
      () => {
        return {
          houseList: data.body.list,
          total: data.body.count
        }
    }
    // () => {
    //   console.log(this.state.houseList,this.state.total)
    // }
    )
  }
  console.log(data)
}
componentDidMount() {
  const {filter} = this.state
  this.loadHousesByCondition(filter)
}
  render() {
    // console.log(getCity())
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter loadHousesByCondition={this.loadHousesByCondition}/>
        { /*Filter 的 变化导致下边的列表变化*/ }
        {/* 列表 */}
      </div>
    )
  }
}

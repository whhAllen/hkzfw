import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import {getHouseCondition} from './api.js'
import {getCity} from '../../../../utils/city.js'
import styles from './index.module.css'
// 'AREA|88cff55c-aaa4-e2e0'
const { value = 'AREA|88cff55c-aaa4-e2e0' } = getCity()
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

const selectedValues = {
  area: [ 'area' , 'null' ],
  mode: [ 'null' ],
  price: [ 'null' ],
  more: []
}

export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    selectedValues,
    openType: '',
    filterData: {}
  }
  loadHouseCondition = async () => {
    const {data}  = await getHouseCondition( value )
    // console.log(data)
    if(data.status === 200){
      this.setState(() => {
        return{
          filterData: data.body
        }
      })
    }
  }
 componentDidMount() {
    this.loadHouseCondition()
  }
  onTitleClick = type => {
    // console.log( type )
    // let a = {...this.state.titleSelectedStatus}
    // console.log(a)
    // a[type] = true
    // this.setState( (state,props) => {
    //   return { titleSelectedStatus : {...state.titleSelectedStatus},[type]:true}}
    // }
      // const { selectedValues } = this.state
      // 1. 点击标题,遍历标题高亮的数据
      const { selectedValues , titleSelectedStatus} = this.state
      let newTitleSelectedStatus = {...titleSelectedStatus}
      // console.log(newTitleSelectedStatus)
      // console.log(titleSelectedStatus)
      Object.keys(newTitleSelectedStatus).forEach(key =>{
       const selValue =  selectedValues[key]
       if(key === type ){
        newTitleSelectedStatus[key] = true;
       }else if (key === 'area' && 
       (selValue.length === 3 || selValue[0] !== 'area')
       ){        
       
       }else if (key === 'mode'&& selValue[0]!=='null' ){
        newTitleSelectedStatus[key] = true
       }else if (key === 'price' && selValue[0]!=='null'){
        newTitleSelectedStatus[key] = true;
       }else if (key === 'more'){
        newTitleSelectedStatus[key] = true;
       }else{
        newTitleSelectedStatus[key] = false;
       }
      })
      // 2. 如果是当前标题,设置为高亮
      // 3. 分别判断每个标题对应的筛选条件中有没有选中值
      // 4. 如果有,保持高亮
      // 5. 如果没有,去掉高亮
    this.setState((state) => {
      // 对象的key不能重复，所以type 是当前的type
      // 直接进行对象的覆盖
      return {  
        titleSelectedStatus: newTitleSelectedStatus,
        // titleSelectedStatus : {...this.state.titleSelectedStatus, [type] : true },
        openType: type,
      }
    })
  }
  // 1.关闭高亮
  // 2.取消高亮
  onCancel = (key) => {
    // 找key数据的来源
    const {titleSelectedStatus,} = this.state
    const  newTitleSelectedStatus = {...titleSelectedStatus}
    const selValue = selectedValues[key]
    if (key === 'area' && 
     (selValue.length === 3 || selValue[0] !== 'area')
     ){        
     }else if (key === 'mode'&& selValue[0]!=='null' ){
      newTitleSelectedStatus[key] = true
     }else if (key === 'price' && selValue[0]!=='null'){
      newTitleSelectedStatus[key] = true;
     }else if (key === 'more'){
      newTitleSelectedStatus[key] = true;
     }else{
      newTitleSelectedStatus[key] = false;
     }
      this.setState(() => {
          return {
            openType: '',
            titleSelectedStatus: newTitleSelectedStatus,

          } 
      }) 
  }
  onSave = ( key , value) => {
  // 点击调用其父组件的方法
    const {loadHousesByCondition} = this.props;
    // loadHousesByCondition(filter)
    // 1.关闭Picker
    const {titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = {...titleSelectedStatus}
    const selValue = value
    if(key === 'area' && 
     (selValue.length === 3 || selValue[0] !== 'area')
     ){        
     }else if (key === 'mode'&& selValue[0]!=='null' ){
      newTitleSelectedStatus[key] = true
     }else if (key === 'price' && selValue[0]!=='null'){
      newTitleSelectedStatus[key] = true;
     }else if (key === 'more'){
      newTitleSelectedStatus[key] = true;
     }else{
      newTitleSelectedStatus[key] = false;
     }
     console.log(selValue,'selValue')
     let newSelectedValues =  {...selectedValues,[key]:value};
     console.log(newSelectedValues)
     const area = newSelectedValues['area']
     console.log(area)
    // 2.如果选择了picker内容 - > 取消高亮
    // 3.如果选择了picker内容 - > 让其高亮
    // 点击确定按钮获取已经选择好的条件数据

     let filter =  {}
     let areaKey = area[0]
     let areaValue
    // 区域或者地铁
     if(area.length === 3){
       if(areaKey === 'area'){
        if(area[2] === 'null'){
          areaValue = area[1]
        }
        if(area[2] !== 'null'){
          areaValue = area[2]
        }
       }
       if(areaKey === 'subway'){
          if(area[2] !== 'null'){
            areaValue = area[2]
          }
       }

     }
    filter[areaKey] = areaValue
    // 区域或者地铁

    // 方式
    const mode = newSelectedValues.mode
    filter.rentType = mode[0]
    // 租金
    const price = newSelectedValues.price
    filter.price = price[0]
  // 更多 -> 数据就是FilterMore的数据 -> 重复代码 -> 暂不处理
    // 包装成对象 -> 将来发送请求时的部分参数。
    loadHousesByCondition(filter)


     this.setState((state) => {
        return {
          openType: '',
          titleSelectedStatus: newTitleSelectedStatus,
          //  // 直接进行对象selectedValues的覆盖
          selectedValues: newSelectedValues
        } 
    }) 
}
renderFilterPicker = () => {
  const {openType, filterData:{ area, subway, price, rentType},
  selectedValues
} = this.state
  if(
    openType === 'mode' || 
    openType === 'price' || 
    openType === 'area'
  ){
    let data = []
    let cols = 1
    const defaultSelectValues = selectedValues[openType]
    // console.log(defaultSelectValues,'defaultSelectValues')
    switch(openType) {
      case 'area':
        data = [area,subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        break;
      case 'price':
        data = price
        break;
        default:
        break;
    }
    // 如果可以做到`组件呢容变化==>改组件重新创建也可以解决state只更新一次的问题`(通过key的变化来重新渲染state数据)
    return (
    <FilterPicker 
    key = {openType} 
    defaultSelectValues = {defaultSelectValues}
    type = { openType }
    data={ data } cols = {cols} onCancel = {this.onCancel} onSave = {this.onSave}/>)
  }else {
    return null
  }

}
renderFilterMore = () => {
  const { openType,filterData:{ floor, oriented, roomType, characteristic } } = this.state
   
  let data = { floor, oriented, roomType, characteristic };
  if( openType === 'more' ){  

  return <FilterMore 
    data = { data } 
  type ={ openType } onCancel={this.onCancel} onSave = {this.onSave}></FilterMore>

  }else{

    return null
  }
}
  render() {
    const { titleSelectedStatus , openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        
        {/* <div className={styles.mask} /> */}
        { ( openType === 'mode' || openType === 'price' || openType === 'area') &&<div 
        onClick={() => { this.onCancel() }}
        className={styles.mask} />}
        <div className={styles.content}>
          {/* 标题栏 */}
          {/* 在这里控制 FilterTitle 内的高亮显示 * 标题栏-> title由使用者控制*/}
          {/* 所以使用父传子 */}
          <FilterTitle titleSelectedStatus = { titleSelectedStatus }
          onTitleClick = { this.onTitleClick }
          />
          {this.renderFilterPicker()}
          {/*{(openType === 'mode' || openType === 'price' || openType === 'area') && (*/}
          {/* <FilterPicker onCancel = {this.onCancel} onSave = {this.onSave}/>)} */}

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          { this.renderFilterMore()}
        </div>
      </div>
    )
  }
}

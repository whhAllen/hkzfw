import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    openType: ''
  }
  onTitleClick = type => {
    // console.log( type )
    // let a = {...this.state.titleSelectedStatus}
    // console.log(a)
    // a[type] = true
    // this.setState( (state,props) => {
    //   return { titleSelectedStatus : {...state.titleSelectedStatus},[type]:true}}
    // }
    this.setState((state) => {
      // 对象的key不能重复，所以type 是当前的type
      // 直接进行对象的覆盖
      return {  
        titleSelectedStatus : {...state.titleSelectedStatus, [type] : true },
        openType: type
      }
    })
  }
  onCancel = () => {
      this.setState(() => {
          return {
            openType: '',
          } 
      }) 
  }
  onSave = () => {
    this.setState(() => {
        return {
          openType: '',
        } 
    }) 
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
          {(openType === 'mode' || openType === 'price' || openType === 'area') && (
            <FilterPicker onCancel = {this.onCancel} onSave = {this.onSave}/>)}

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

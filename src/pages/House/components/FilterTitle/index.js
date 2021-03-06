import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle( props ) {
  const { titleSelectedStatus , onTitleClick } = props
  const renderTitle = () => {
   return  titleList.map(item => (
      <Flex.Item key={item.type}
      onClick= { () => {
        onTitleClick( item.type )
      }}
      >
      {/* ["aaa","bbb"].join( " " )  -> "aaa bbb" -> 可以同时增加很多的样式 */}
      <span className={[styles.dropdown, 
        titleSelectedStatus[item.type] ? styles.selected : ''].join(' ')}>
      <span >{item.title}</span>
        <i className="iconfont icon-arrow" />
      </span>
      </Flex.Item>
    ))
  } 
  return (
    <Flex align="center" className={styles.root}>
      {renderTitle()}
    </Flex>
  )
}

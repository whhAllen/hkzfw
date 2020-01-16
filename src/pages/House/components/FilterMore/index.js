import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 渲染标签
  renderFilters(data) {

    console.log(data,'data')
    // 高亮类名： styles.tagActive
    // if() {}  ----> 直接写条件 + 结果 前提: 结果只有一行代码
    return data.length !== 0 && data.map((item, index) => {
      return (
        <span key={index} className={[styles.tag, styles.tagActive].join(' ')}>
          {item.label}
        </span>
      )
    })
    // return (
    // <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    // )
  }

  render() {
    const { onCancel, type, onSave , data} = this.props
    // console.log( data ,'data')
    const { floor, oriented, roomType, characteristic  } = data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => {
          onCancel(type)
        }}/>

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}> 
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer}
        onSave = {() => {
          onSave( )
        }}
        onCancel = { () => {
          onCancel( type )
        }
      }
        />
      </div>
    )
  }
}

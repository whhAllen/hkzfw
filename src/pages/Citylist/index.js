import React from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile'
import { getAreaCity, getHotCity } from './api.js'
import { getCurrCity, setCity } from '../../utils/getCurrCity.js'
import { List, AutoSizer } from 'react-virtualized'
// import { setCity } from '../../utils/city.js'
import 'react-virtualized/styles.css';
import './index.scss'
// const list = Array.from(new Array(100)).map(
//   (item,index) => `第 ${index}行数据`
// )
// const hotCity = ['北京' , '上海' , '广州' , '深圳']
// const list = [ 
//   'nnnnnnnnnn'
// ]
class cityList extends React.Component {
  state = {
    cityList: {},
    cityIndex: [],
    W: 0
  }
  componentDidMount(){
    // this.setState(() => {
    //   return { W: window.document.documentElement.clientWidth}
    // })
    this.loadAreaCity();
  }
  loadAreaCity = async() => {
    const { data } = await getAreaCity()
    // console.log(data)
    if(data.status === 200){
      // body是渲染列表是需要的所有的数据 
      // 已经有的数据[{label:'北京',short:'bj'},{},{},{}]
      // 二次处理数据
      // 对象是无序的
     const { cityList , cityIndex} =   this.formatCityData(data.body)
    // 索引城市处理完毕
    // hot热门城市
    const {data: dataHot} = await getHotCity()
    // console.log(dataHot)
    if(dataHot.status === 200) {
      cityList['hot'] = dataHot.body
      // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
      cityIndex.unshift('hot')
    }
    // 当前城市
    const currCity = await getCurrCity()
    cityList['#'] = [currCity]
    // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
    cityIndex.unshift('#')
    // console.log(cityList,cityIndex)
     this.setState(() => {
       return {cityList , cityIndex}
     })
    }
  }
  formatCityData = list => {
    let cityList = {}
    let cityIndex = []
    // 二次处理形参数据
    list.forEach( item => {
      const letter = item.short.substr(0,1)
      // 对于in
      if(letter in cityList){
        cityList[letter].push(item)
      }else{
        cityList[letter] = [item]
      }

    })
    // cityIndex = [a,b,c]
    cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }
  // 渲染每行内容
  // rowRender({
  //   key,
  //   index,
  //   isScrolling,
  //   isVisible,
  //   style
  // }){
  //   return(
  //     <div key={key} style={style}>
  //       { list[index] }
  //     </div>
  //   )
  // }
  // rowRenderer = ({ key, index, style}) => {
  //   const { cityList, cityIndex }  = this.state
  //   console.log(cityList,'cityList')

  //   const letter = cityIndex[index]
  
  //   return (
  //     <div
  //       key={key} 
  //       style={style}
  //       className = "city"
  //     >
  //       <div className="title"> {letter}</div>
  //       {cityList[letter].map(item => (
  //         <div
  //          key={ item.label }
  //          className = "name"
  //          onClick = { () => {
  //            if(hotCity.includes(item.label)){
  //               setCity({ label: item.label, value: item.value})
  //               this.props.history.goBack()
  //            }else{
  //              Toast.info('该城市暂无房源信息!!console.log(style)!')
  //            }
  //          }}
  //         >
  //          {item.label}
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }
  rowRenderer =({
    key,
    index,
    style
  }) => {
    // console.log(this)
    const { cityList, cityIndex} = this.state
    // 该箭头函数修改this的指向
    const letter = cityIndex[index]
    const renderCityContent = () => {
      if(cityList[letter] && cityList[letter].length !== 0){
        return cityList[letter].map(item => (
          <div key={item.label} className="name"
          onClick={() => {
            // 在index的城市显示中，城市存储在了localStroage里边，所以点击列表中的数据时应当改变localStroage中的车城市
            // 1.修该存储
            // 2.返回主页
            if(['北京','上海','广州','深圳'].includes(item.label)){
              setCity({ label: item.label, value: item.value})
              //将来整租/合租的数据和当前城市有关系，这里只有hot城市有数据
              this.props.history.goBack()
            }else {
              // 提示
              Toast.info('该城市暂无房源信息！！',1)
            }

          }}
          >{item.label}</div>
        ))
      }
      // return cityList[letter].map(item => (
      //   <div className="name">{item.label}</div>
      // ))
    }
      
    
    return (
      //每一行都是一个div
      <div
      key = {key}
      style = {style} 
      className="city"
      >
      <div className="title">{letter}</div>
      {renderCityContent()}
      </div>
    )
  } 
  // 计算行高
  calRowHeight = ({index}) => {
    const { cityList, cityIndex } = this.state
    return 36 + cityList[cityIndex[index]].length * 50

  }
  render() {
    const { cityIndex,cityList } = this.state
    return (
      <div className="cityList">
      <NavBar
      mode="light"
      icon={<Icon type="left"></Icon>}
      onLeftClick={() => {
        this.props.history.goBack()
      }}
    >
      城市选择
    </NavBar>
      { cityList.length !==0 &&(
      <List
        width={ 376 }
        height = { 1000 }
        rowCount={cityIndex.length}
        rowHeight={this.calRowHeight}
        rowRenderer = { this.rowRenderer }
      />
      )}
    </div>
    )
  }
}
export default cityList

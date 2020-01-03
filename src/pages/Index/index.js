import React from 'react'
import { Carousel, Flex, Grid, WingBlank, NavBar, Icon } from 'antd-mobile'
import { getSwiper, getGroups, getNews } from './api.js'
import { getCurrCity } from '../../utils/getCurrCity.js'
// 图片可以接收-> base64格式的图片->直接给img的src赋值
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import './index.scss'
const BaseURL = `http://localhost:8080`

const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/bbb'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  }
]

class HomeIndex extends React.Component {
  state = {
    swiperData: [],
    groupsData: [],
    newsData: [],
    imgHeight: 212,
    autoplay: false,
    cityInfo: { label: '定位中', value: '' },
  }
  // API方法
  loadSwiper = async () => {
    const { data } = await getSwiper()
    if (data.status === 200) {
      // this.setState(() => {}, () => {})
      this.setState(
        () => {
          return { swiperData: data.body }
        },
        () => {
          this.setState(() => {
            return { autoplay: true }
          })
        }
      )
    }
  }
  loadGroups = async () => {
    const { data } = await getGroups()
    if (data.status === 200) {
      this.setState(() => {
        return { groupsData: data.body }
      })
    }
  }
  loadNews = async () => {
    const { data } = await getNews()
    if (data.status === 200) {
      this.setState(() => {
        return { newsData: data.body }
      })
    }
  }

  // 定位当前城市
  getCurrCityName = async() => {
    const currCity = await getCurrCity() 
    // 在外部拿到getCurrCity内的结果
    // 异步问题
      this.setState(() => {
          return { cityInfo: currCity}
        })
  //   var myCity = new window.BMap.LocalCity();
  //   myCity.get( async result => {
  //     const cityName = result.name
  //     const {data} = await getAreaInfo(cityName)
  //     if(data.status === 200){
  //       this.setState(() => {
  //         return { cityInfo: data.body}
  //       })
  //     }
      // this.setState(() => {
      //   return { currCity: cityName}
      // })
  //   })

    // var map = new BMap.Map("allmap");
    // var point = new BMap.Point(116.331398,39.897445);
    // map.centerAndZoom(point,12);

    // function myFun(result){
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   alert("当前定位城市:"+cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun); 


  }
  async componentDidMount() {
    this.loadSwiper()
    this.loadGroups()
    this.loadNews()
    // this.getCurrCityName()
    this.getCurrCityName()
    //找其他请求多的文件测试该方法-> Promise.all([Prmise1,Promise2])
  }

  renderCarousel = () => {
    return this.state.swiperData.map(item => (
      <a
        key={item.id}
        href="http://www.itcast.com"
        style={{
          display: 'inline-block',
          width: '100%',
          height: this.state.imgHeight
        }}
      >
        <img
          src={`${BaseURL}${item.imgSrc}`}
          alt="图片未显示"
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            window.dispatchEvent(new Event('resize')) // resize
            this.setState({ imgHeight: 'auto' }) // 图片自适应
          }}
        />
      </a>
    ))
  }

  renderMenus = () => {
    return navs.map(item => (
      <Flex.Item
        className="nav"
        key={item.id}
        onClick={() => {
          this.props.history.push(item.path)
        }}
      >
        <img src={item.img} alt="图片无法显示" />
        <p>{item.title}</p>
      </Flex.Item>
    ))
  }

  renderGrid = () => {
    const { groupsData } = this.state
    return (
      <Grid
        data={groupsData}
        columnNum={2}
        square={false}
        activeStyle
        hasLine={false}
        renderItem={item => {
          return (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${BaseURL}${item.imgSrc}`} alt="图片无法显示" />
            </Flex>
          )
        }}
      />
    )
  }

  renderNews() {
    const { newsData } = this.state
    return newsData.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${BaseURL}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  render() {
    const { autoplay, cityInfo } = this.state
    return (
      <div>
        {/* 导航-> 按钮->进入Citylist */}
        <NavBar
          mode="light"
          leftContent={
            <div
              onClick={() => {
                this.props.history.push('/citylist')
              }}
            >
              {cityInfo.label}
            </div>
          }
          rightContent={
            <Icon
              onClick={() => {
                this.props.history.push('/map')
              }}
              key="0"
              type="ellipsis"
              style={{ marginRight: '16px' }}
            />
          }
        >
          首页
        </NavBar>

        {/* 轮播图 */}
        <Carousel autoplay={autoplay} infinite>
          {this.renderCarousel()}
        </Carousel>
        {/* 菜单 */}
        <Flex>{this.renderMenus()}</Flex>
        {/* 租房小组 */}
        <div className="group">
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 宫格 */}
          {this.renderGrid()}
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}
export default HomeIndex

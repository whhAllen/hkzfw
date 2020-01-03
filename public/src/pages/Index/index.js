import React from 'react'
import { Carousel, Flex, Grid , WingBlank, NavBar, Icon} from 'antd-mobile';
import { getSwiper , getGroups, getNews } from './api.js'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import './index.scss'
// img的src的值:
// 1. 图片地址
// 2. base64格式的图片
// console.log(Nav1)
const BaseURL = `http://localhost:8080`

const navs = [
    {
     id: 0, 
     img: Nav1,
     title: '整租',
     path: '/home/list'
    },
    {
     id: 1, 
     img: Nav2,
     title: '合租',
     path: '/home/list'
    },
    {
     id: 2, 
     img: Nav3,
     title: '地图找房',
     path: '/map'
    },
    {
     id: 3, 
     img: Nav4,
     title: '去出租',
     path: '/rent/add'
    },
]

class Index extends React.Component {
    state = {
        swiperDate: [],
        groupsDate: [],
        newsData: [],
        imgHeight: 176,
        loadFinished: false,
        autoplayTime: 2000,
        cityInfo: { label: '定位中' ,value: ''}
    }

   async componentDidMount() {
        this.loadSwiper();
        this.loadGroups();
        this.loadNews();
        // this.loadCityList();
    }
    loadSwiper = async() => {
        const {data} = await getSwiper()
        // console.log(data)
        const { status, body } = data
            if(status === 200){
                this.setState( () => {
                    return { 
                        swiperDate:body 
                    }
                },
                () => {
                    this.setState({
                        loadFinished: true
                    })
                }
                )
            }
    }
    loadGroups = async () => {
        const {data} = await getGroups()
        // console.log(data)
        const { status, body} = data 
        if( status === 200) {
            this.setState(
                () => {
                    return {
                        groupsDate: body
                    }  
                }
            )
        }
    }
    loadNews = async () => {
        const {data} = await getNews()
        console.log(data)
        const { status, body} = data 
        if( status === 200) {
            this.setState(
                () => {
                    return {
                        newsData: body
                    }  
                }
            )
        }
    }
    // loadCityList = async () => {
    //     const {data} = await getCityList()
    //     console.log(data)
    // }
    // 轮播图渲染
    renderSwiper = () => {
       const { swiperDate } =  this.state
       return swiperDate.map(item => (
        <a 
        key={item.id}
        href="http://www.baidu.cn"
        style={{ 
            display: 'inline-block',
            width: '100%', 
            height: this.state.imgHeight
        }}
        >
        <img
        src={`${BaseURL}${item.imgSrc}`}
        alt=''
        style={{ width: '100%', verticalAlign: 'top' }}
        onLoad={() => {
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        >
        </img>
        </a>
       ))
    }
    renderMenus = () => {
          return navs.map(item => (
                <Flex.Item
                className="Nav"
                key={item.id}
                onClick={
                    () => {
                     this.props.history.push(item.path)
                    }     
                }
                >
                <img src={ item.img } alt="图片无法显示"></img>
                <p>{ item.title }</p>
                </Flex.Item>
            ))
    }
    renderGroup = () => {
       const { groupsDate }  = this.state
      return  (
            <Grid
            data={groupsDate}
            columnNum={2}
            activeStyle
            hasLine={false}
            renderItem = {
                item => {
                    return (
                        <Flex className="grid-item" justify="between">
                            <div className="desc">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <img src={`${BaseURL}${item.imgSrc}`} alt="图片无法显示"></img>
                        </Flex>
                    )
                }
            }
            >
            </Grid>
           )
       
    }
    renderNews = () => {
       const { newsData } = this.state
       return newsData.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img className="img" src={`${BaseURL}${item.imgSrc}`} alt=""></img>
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
        return (
            <div>
            <NavBar
            mode="dark"
            rightContent={
                    <Icon
                     onClick = {() => {
                         this.props.history.push('/map')
                     }}
                     key="0"
                     type="ellipsis"
                     style={{ marginRight: '16px'}}
                    >
                    </Icon>
            
            }
          >首页</NavBar>
                {/* 轮播图 */}
                <Carousel
                autoplayInterval = {this.state.autoplayTime}
                autoplay={this.state.loadFinished}
                infinite
                >
                 {this.renderSwiper()}
                </Carousel>
                {/* 菜单 */}
                <Flex>
                    {this.renderMenus()}
                </Flex>
                {/* 租房小组 */}
                <div className="rent-group">
                    <Flex className="rent-group-flex" justify="between">
                        <h3> 租房小组 </h3>
                        <span>更多</span>
                    </Flex>
                    {/* 宫格 */}
                    {this.renderGroup()}
                </div>
                <div className="news">
                    {/* 最新资讯 */}
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        )
    }
}
export default Index

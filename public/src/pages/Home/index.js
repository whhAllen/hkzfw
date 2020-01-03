import React from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
import '../../assets/fonts/iconfont.css'
import './index.css'
import { tabbarData } from './tabbar.json'


class Home extends React.Component{
    state = {
        // selectedTab: '/home/index',
        // 取出当前的url的path的值->路由数据->history match locaetion
        selectedTab: this.props.location.pathname,
    }
    renderTabBarItems = () => {
      return tabbarData.map(item => (
        <TabBar.Item
        title={item.title}
        key={item.id}
        icon={<i className={`iconfont ${item.icon}`}></i>}
        selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path)
          this.setState({
            selectedTab: item.path
          })
        }}
        >       
        </TabBar.Item>
      ))
    }

    render(){
      console.log(this.state.selectedColor)
        return (
            <div className = "home">
                {/* Route */}
                <Route exact path="/home/index" component = {Index}></Route>
                <Route path="/home/house" component = {House}></Route>
                <Route path="/home/profile" component = {Profile}></Route>
                {/*Link */}
                {/*<Link to="/home/index">首页</Link>*/}
                {/*<Link to="/home/house">找房</Link>*/}
                {/*<Link to="/home/profile">我的</Link>*/} 
        <div className="tabbar">
        <TabBar
        tabBarPosition="bottom"
        noRenderContent
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {this.renderTabBarItems()}
      </TabBar>
    </div>

</div>
)
}
}
export default Home
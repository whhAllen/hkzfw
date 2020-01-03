import React from 'react'
import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
import '../../assets/fonts/iconfont.css'
import './index.css'
import { tabbarData } from './tabbar.json'

class Home extends React.Component {
  state = {
    // 取出当前url的path值->路由数据-> location
    selectedTab: this.props.location.pathname
  }

  // 渲染tabbarItem
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
      />
    ))
  }
  render() {
    return (
      <div className="home">
        {/* Route */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        <div className="tabbar">
          <TabBar
            noRenderContent
            tabBarPosition="bottom"
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

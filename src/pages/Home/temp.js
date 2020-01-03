const temp = () => {
  return (
    <div>
      <TabBar.Item
        title="首页"
        key="Life"
        icon={<i className="iconfont icon-ind"></i>}
        selectedIcon={<i className="iconfont icon-ind"></i>}
        selected={this.state.selectedTab === '/home/index'}
        onPress={() => {
          // 切换组件->js->编程式导航
          this.props.history.push('/home/index')
          this.setState({
            selectedTab: '/home/index'
          })
        }}
      ></TabBar.Item>

      <TabBar.Item
        icon={<i className="iconfont icon-findHouse"></i>}
        selectedIcon={<i className="iconfont icon-findHouse"></i>}
        title="找房"
        key="Koubei"
        selected={this.state.selectedTab === '/home/house'}
        onPress={() => {
          this.props.history.push('/home/house')

          this.setState({
            selectedTab: '/home/house'
          })
        }}
      ></TabBar.Item>
      <TabBar.Item
        icon={<i className="iconfont icon-my"></i>}
        selectedIcon={<i className="iconfont icon-my"></i>}
        title="我的"
        key="Friend"
        selected={this.state.selectedTab === '/home/profile'}
        onPress={() => {
          this.props.history.push('/home/profile')

          this.setState({
            selectedTab: '/home/profile'
          })
        }}
      ></TabBar.Item>
    </div>
  )
}

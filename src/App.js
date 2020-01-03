import React from 'react'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'

import Citylist from './pages/Citylist'

import Map from './pages/Map'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* Link */}
          {/* <Link to="/home">首页</Link> */}
          {/* <Link to="/citylist">城市列表</Link> */}
          <Route path="/home" component={Home} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/citylist" component={Citylist} />
          <Route path="/map" component={Map} />
        </div>
      </Router>
    )
  }
}
export default App

// 1. 使用路由组件
// 2. 使用其他组件

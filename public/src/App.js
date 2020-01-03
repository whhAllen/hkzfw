import React from "react";
// 第一步先配置基本的路由
import { BrowserRouter as Router, Route , Redirect } from "react-router-dom";

// import { TabBar } from "antd-mobile";
import Home from "./pages/Home";
// import cityList from "./pages/cityList";
import Map from './pages/Map'
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
      </div>
          {/*Link */}
          {/*<Link to="/home">首页</Link>*/}
          {/*<Link to="/cityList">城市列表</Link>*}
          {/* Route */}
          <Route path="/home" component={Home}></Route>
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
          {/*<Route path="/cityList" component={cityList}></Route>*/}
          <Route path="/map" component={Map}></Route>     
      </Router>
    );
  }
}

export default App;
// 根组件作用
// 1.使用其他组件
// 2.使用路由组件
// 补充：在App.js中增加路由功能

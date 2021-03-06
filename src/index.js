import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import App from './App'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()

// 1. 导入全局包(多个位置使用的包)
// 2. 使用App跟组件
// 3. 导入公共样式

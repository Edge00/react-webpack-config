import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'

// 热更新
if (module.hot) module.hot.accept()

import 'reset.css'

ReactDOM.render(<Home />, document.getElementById('root'))

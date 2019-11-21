import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'
import 'reset.css'

// 热更新
if (module.hot) module.hot.accept()

ReactDOM.render(<Home />, document.getElementById('root'))

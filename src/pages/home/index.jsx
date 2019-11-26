import React, { PureComponent } from 'react'
import './index.scss'
import cloud from '../../assets/images/cloud.png'

class Home extends PureComponent {
  state = {
    name: 'home'
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>img图片测试</h1>
        <img src={cloud} alt="" />
        <h1>背景图测试</h1>
        <div className="img"></div>
      </div>
    )
  }
}

export default Home

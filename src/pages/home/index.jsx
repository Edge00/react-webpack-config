import React, { PureComponent } from 'react'
import './index.scss'

class Home extends PureComponent {
  state = {
    name: 'home'
  }

  render() {
    return <h1>{this.state.name}</h1>
  }
}

export default Home

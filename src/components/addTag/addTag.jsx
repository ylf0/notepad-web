import React, { Component } from 'react'

import './addTag.less'

class AddTag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tageName: '',
      tagColor: '',
    }
  }

  getColorCircle = () => {
    const colors = ['#3da8f5', '#75c940', '#53beb3', '#797ec9', '#f6ae36', '#ed493a']
    return colors.map((color, index) => (
      <li key={index}>
        <div className="color-circle" style={{backgroundColor: color}}></div>
      </li>
    ))
  }

  transitionEnd = (e) => {
    const { showContainer } = this.props
    if (!showContainer && e.propertyName === 'opacity') {
      e.target.className = 'hidden'
    }
  }

  componentDidMount() {
    const container = this.refs.container
    if (container) {
      container.className = 'hidden'
    }
  }


  render() {
    const { showContainer = false } = this.props
    return (
      <div
        className={showContainer ? 'add-tag-container' : 'add-tag-container fade-out'}
        onTransitionEnd={this.transitionEnd}
        ref="container">
        <header>
          <span>新建标签</span>
          <i className="iconfont icon-close" onClick={this.props.closeContainer}/>
        </header>
        <main>
          <input type="text" placeholder="标签名称"/>
          <div className="color-area">
            <ul>
              {this.getColorCircle()}
            </ul>
          </div>
          <div className="add-btn">
            <span>创建</span>
          </div>
        </main>
      </div>
    )
  }
}

export default AddTag

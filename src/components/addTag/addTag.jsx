import React, { Component } from 'react'

import './addTag.less'

class AddTag extends Component {
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

  checkKeyDown = (e) => {
    const code = e.keyCode
    if (code === 13) {
      this.addTag()
    } else if (code === 27) {
      this.resetInput()
      this.props.closeContainer()
    }
  }

  addTag = () => {
    const { value } = this.refs.input
    if (!value) return
    this.props.addTag(value, '#3da8f5')
    this.resetInput()
  }

  resetInput = () => {
    this.refs.input.value = ''
  }

  componentDidMount() {
    const container = this.refs.container
    if (container) {
      container.className = 'hidden'
    }
  }


  render() {
    const { showContainer = false, top } = this.props
    return (
      <div
        className={showContainer ? 'add-tag-container' : 'add-tag-container fade-out'}
        style={{ top }}
        onTransitionEnd={this.transitionEnd}
        ref="container">
        <header>
          <span>新建标签</span>
          <i className="iconfont icon-close" onClick={this.props.closeContainer}/>
        </header>
        <main>
          <input
            type="text"
            placeholder="标签名称"
            onKeyDown={this.checkKeyDown}
            ref="input"/>
          <div className="color-area">
            <ul>
              {this.getColorCircle()}
            </ul>
          </div>
          <div className="add-btn" onClick={this.addTag}>
            <span>创建</span>
          </div>
        </main>
      </div>
    )
  }
}

export default AddTag

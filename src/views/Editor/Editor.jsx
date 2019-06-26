import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

import './Editor.less'
import './Draft.css'

class MyEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({ editorState })
  }

  formatDoc = (type) => {
    this.handleKeyCommand(type)
  }

  handleKeyCommand = (command) => {
    console.log('command: ', command)
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }
  render () {
    const { editorState } = this.state
    return (
      <div>
        <div className="operation-area">
          <div className="section">
            <span onClick={() => this.formatDoc('bold')}>B</span>
            <span className="italic" onClick={() => this.formatDoc('italic')}>I</span>
          </div>
          <div className="section">
            <span>H</span>
            <span>引用</span>
            <span onClick={() => this.formatDoc('code')}>代码块</span>
            <span>有序列表</span>
            <span>无序列表</span>
          </div>
          <div className="section">
            <span>链接</span>
            <span onClick={() => this.formatDoc('underline')}>下划线</span>
            <span>图片</span>
            <span>视频</span>
            <span>公式</span>
            <span>分割线</span>
          </div>
          <div className="section last-section">
              <span>清除格式</span>
            </div>
        </div>
        <div className="editor-area">
        <Editor
          className="editor"
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}/>
        </div>
      </div>
    )
  }
}

export default MyEditor

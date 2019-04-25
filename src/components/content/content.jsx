import React, { Component } from 'react';
import request from '@/utils/request';

import { markdown } from 'markdown'

import './content.less';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      shouldToggle: false,
      shouldExpand: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getNote(nextProps);
  }

  getNote = async({ _id, shouldToggle }) => {
    if (shouldToggle !== this.state.shouldToggle) {
      this.setState({
        article: null,
        shouldToggle,
      });
      return;
    }
    if (!_id) return;
    try {
      const { articles } = await request('GET', '/article/all', {
        _id,
      });
      this.setState({ article: articles });
    } catch (err) {
      console.log(err);
    }
  }

  expandPanel = async () => {
    try {
      const { shouldExpand, article } = this.state
      const target = document.getElementById('edit')
      if (shouldExpand) {
        const html = markdown.toHTML(target.innerText)
        await request('POST', `/article/${article._id}`, {}, {
          content: target.innerText,
          html,
        })
      }

      this.props.expandPanel();
      this.setState(prevState => ({
        shouldExpand: !prevState.shouldExpand
      }));
    } catch (err) {
      console.log('error: ', err)
    }
  }

  componentDidUpdate() {
    const contentArea = document.getElementById('content');
    this.contentArea = contentArea
    const { article, shouldExpand } = this.state;
    if (article && article.html) {
      let content = article.html

      contentArea.innerHTML = content

      if (shouldExpand) {
        const editArea = document.getElementById('edit')
        editArea.innerText = article.content
      }
    } else {
      contentArea.innerText = 'Start Writing...';

      if (shouldExpand) {
        const editArea = document.getElementById('edit')
        editArea.innerText = 'Start Writing...'
      }
    }
  }

  updateContent = (e) => {
    const { innerText } = e.currentTarget
    const preview = markdown.toHTML(innerText)
    this.contentArea.innerHTML = preview
  }

  render() {
    const { article, shouldExpand } = this.state;
    let spreadContent = null;

    if (shouldExpand) {
      spreadContent = <span>完成</span>;
    } else {
      spreadContent = <i className="iconfont icon-expand"></i>;
    }

    return (
      <div className="panel">
        <div className={shouldExpand ? "operation show-border" : "operation"}>
          <div></div>
          <div
            className={shouldExpand ? "common done-btn" : "common spread-btn"}
            title={shouldExpand ? null : '展开'}
            onClick={this.expandPanel}>
            {spreadContent}
          </div>
        </div>
        <div className={shouldExpand ? "edit-area" : "hidden"}>
          <span className="title">{ article ? article.title : 'No Title' }</span>
          <div id="edit" contentEditable={true} onKeyUp={this.updateContent}/>
        </div>
        <div className={shouldExpand ? "content-area preview" : "content-area"}>
          <span className="title">{ article ? article.title : 'No Title' }</span>
          <div id="content"/>
        </div>
      </div>
    )
  }
}

export default Content;

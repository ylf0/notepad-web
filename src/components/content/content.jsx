import React, { Component } from 'react';
import request from '@/utils/request';

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

  expandPanel = () => {
    this.props.expandPanel();
    this.setState(prevState => ({
      shouldExpand: !prevState.shouldExpand
    }));
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
        <div className="operation">
          <div></div>
          <div className={shouldExpand ? "common done-btn" : "common spread-btn"} onClick={this.expandPanel}>
            {spreadContent}
          </div>
        </div>
        <div className="content-area">
          <span className="title">{ article ? article.title : 'No Title' }</span>
          <p className="content">{ article ? article.content : 'No Content' }</p>
        </div>
      </div>
    )
  }
}

export default Content;

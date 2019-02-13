import React, { Component } from 'react';
import request from '@/utils/request';

import './content.less';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      shouldToggle: false,
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

  render() {
    const { article } = this.state;

    return (
      <div className="content-area">
        <span className="title">{ article ? article.title : 'No Title' }</span>
        <p className="content">{ article ? article.content : 'No Content' }</p>
      </div>
    )
  }
}

export default Content;

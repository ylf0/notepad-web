import React, { Component } from 'react';
import request from '@/utils/request';

import './add-card.less';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  setTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  setContent = (e) => {
    this.setState({ content: e.target.value });
  }

  submitNote = async () => {
    try {
      const userId = this.props._userId;
      const { title, content } = this.state;

      if (!userId) {
        console.log('userId is not existed!');
        return;
      } else if (!title) {
        console.log('title is required!');
        return;
      } else if (!content) {
        console.log('content is required!');
        return;
      }

      await request('POST', '/article', {}, {
        userId,
        title,
        content,
      });

      this.props.showNoteMenu();
    } catch (err) {
      console.log(err);
    }
  };

  makeExpandingArea = (el) => {
    if (el.addEventListener) {
      el.addEventListener('input', () => this.setStyle(el), false);
      this.setStyle(el);
    } else if (el.attachEvent) {
      el.attachEvent('onpropertychange', () => this.setStyle(el), false);
      this.setStyle(el);
    }
  }

  setStyle = (el) => {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    console.log('scrollHeight: ', el.scrollHeight);
  }

  delayedResize = (el) => {
    setTimeout(() => this.setStyle(el), 100);
  }

  componentDidMount() {
    this.makeExpandingArea(document.getElementById('editor'));
  }

  render() {
    return (
      <div className="add-card">
        <input
          type="text"
          placeholder="标题..."
          value={this.state.title}
          onChange={this.setTitle.bind(this)}/>
        <textarea
          id="editor"
          placeholder="写点什么..."
          value={this.state.content}
          onChange={this.setContent.bind(this)}/>
        <div className="add-btn" onClick={this.submitNote.bind(this)}>
          <span>提交</span>
        </div>
      </div>
    )
  }
}

export default AddCard;

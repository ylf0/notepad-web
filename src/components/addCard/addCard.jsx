import React, { Component } from 'react';
import request from '@/utils/request';

import { markdown } from 'markdown'

import './addCard.less';

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

      const html = markdown.toHTML(content)

      await request('POST', '/article', {}, {
        userId,
        title,
        content,
        html,
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
    // this.makeExpandingArea(document.getElementById('editor'));
  }

  render() {
    return (
      <div className="add-card">
        <div className="edit-area">
          <h2>Edit Area</h2>
        </div>
        <div className="preview-area">
          <h2>Preview Area</h2>
        </div>
      </div>
    )
  }
}

export default AddCard;

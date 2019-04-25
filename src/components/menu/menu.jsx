import React, { Component } from 'react';

import SearchInput from '../searchInput/searchInput';
import request from '../../utils/request';
import './menu.less';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavType: '',
      articles: [],
    }
  }

  componentWillMount() {
    this.elementStyle = null
    this.getNotes('all');
    this.setState({ currentNavType: 'all' });
  };

  getNotes = async (type) => {
    try {
      const { articles } = await request('GET', `/article/${type}`);
      this.currentSelectedIndex = 0;

      if (articles.length) this.props.readNote(articles[0]._id);

      this.setState({ articles, currentNavType: type });
    } catch (err) {
      console.log(err);
    }
  }

  readNote = (article, index) => {
    if (!article.selected) {
      this.currentSelectedIndex = index;
    }
    this.props.readNote(article._id);
  }

  dragEnter = (e) => {
    if (e.currentTarget) {
      this.elementStyle = e.currentTarget.style
      this.elementStyle.boxShadow = '0 6px 12px rgba(56, 56, 56, 0.1)'
    }
  }

  dragOver = (e) => {
    e.preventDefault()
  }

  drop = async (index, e) => {
    try {
      const { dragTag } = this.props
      const { articles } = this.state
      const { _id, tagInfo = [] } = articles[index]

      if (e.currentTarget) {
        this.elementStyle.boxShadow = ''
        this.elementStyle = null
      }

      if (tagInfo.length) {
        const hasOne = tagInfo.find(tag => tag && (tag._id === dragTag._id))
        if (hasOne) return
      }
      tagInfo.push(dragTag)

      await request('POST', `/note/tag/${_id}`, {}, {
        tagInfo,
      })
    } catch (err) {
      console.log('err: ', err)
    }
  }

  dragLeave = (e) => {
    const relatedTarget = e.relatedTarget
    if (relatedTarget
        && !relatedTarget.parentNode.className.includes('article')) {
        this.elementStyle.boxShadow = ''
        this.elementStyle = null
    }
  }

  render() {
    const { hiddenMenu, shouldShrink, currentNav } = this.props;
    let lists = [];

    if (hiddenMenu || shouldShrink) return null;

    if (!shouldShrink) {
      const type = currentNav.type;
      const { currentNavType } = this.state;
      if (currentNavType !== type) this.getNotes(type);
      const articles = this.state.articles;
      lists = articles.map((article, index) =>
        <div
          className={index === this.currentSelectedIndex ? "article active" : "article"}
          key={article._id}
          draggable={true}
          onClick={this.readNote.bind(this, article, index)}
          onDragEnter={this.dragEnter}
          onDragOver={this.dragOver}
          onDragLeave={this.dragLeave}
          onDrop={(e) => this.drop(index, e)}>
          <div className="menu-header">
            <span className="menu-title">{article.title}</span>
            <div className="tag-circles">
              {article.tagInfo.map(tag => (
                <div className="circle" style={{backgroundColor: tag && tag.color}} key={tag ? tag._id : 0}></div>
              ))}
            </div>
          </div>
          <pre className="menu-content">{article.content}</pre>
        </div>
      )
    }

    return (
      <div className="menu">
        <header>
          <SearchInput></SearchInput>
        </header>
        <main>
          <div className="header">
            <h2>{this.props.currentNav.name}</h2>
          </div>
          <div className="article-lists">
            {lists}
          </div>
        </main>
        <footer>
          <span onClick={ this.props.addNote }>添加笔记</span>
        </footer>
      </div>
    )
  }
}

export default Menu;

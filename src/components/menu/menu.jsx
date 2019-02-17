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
    this.getNotes('all');
    this.setState({ currentNavType: 'all' });
  };

  getNotes = async (type) => {
    try {
      const { articles } = await request('GET', `/article/${type}`);

      // 添加标记；
      if (articles && articles.length) {
        articles.forEach((article) => {
          article.selected = false;
        });
      }

      this.setState({ articles, currentNavType: type });
    } catch (err) {
      console.log(err);
    }
  }

  readNote = (article) => {
    if (!article.selected) {
      this.clearTags();
      article.selected = true;
    }
    this.props.readNote(article._id);
  }

  clearTags = () => {

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
      lists = articles.map((article) =>
        <div className="article" key={article._id} onClick={this.readNote.bind(this, article)}>
          <span className="menu-title">{article.title}</span>
          <span className="menu-content">{article.content}</span>
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
          <div className="add-btn">
            <span onClick={ this.props.addNote }>添加笔记</span>
          </div>
        </footer>
      </div>
    )
  }
}

export default Menu;

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
          onClick={this.readNote.bind(this, article, index)}>
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

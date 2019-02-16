import React, { Component } from 'react';

import SearchInput from '../searchInput/searchInput';
import request from '../../utils/request';
import './menu.less';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentWillMount() {
    this.getNotes('all');
  };

  getNotes = async (type) => {
    try {
      const { articles } = await request('GET', `/article/${type}`);
      this.setState({ articles });
    } catch (err) {
      console.log(err);
    }
  }

  readNote = (article) => {
    this.props.readNote(article._id);
  }

  render() {
    const { hiddenMenu, shouldShrink, currentNav } = this.props;
    let lists = [];

    if (hiddenMenu || shouldShrink) return null;

    if (!shouldShrink) {
      const type = currentNav.type;
      this.getNotes(type);
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

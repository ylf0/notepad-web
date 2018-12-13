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
    this.getNotes();
  };

  getNotes = async () => {
    try {
      const { articles } = await request('GET', '/article');
      this.setState({ articles });
    } catch (err) {
      console.log(err);
    }
  }

  readNote = (article) => {
    this.props.readNote(article._id);
  }

  render() {
    if (this.props.hiddenMenu) return null;
    const articles = this.state.articles;
    const lists = articles.map((article) =>
      <div className="article" key={article._id} onClick={this.readNote.bind(this, article)}>
        <span className="menu-title">{article.title}</span>
        <span className="menu-content">{article.content}</span>
      </div>
    )
    return (
      <div className="menu">
        <header>
          <SearchInput></SearchInput>
        </header>
        <main>
          <h2>{this.props.currentNavName}</h2>
          <div className="article-lists">
            {lists}
          </div>
        </main>
        <footer>
          <div className="add-btn">
            <span onClick={ this.props.addNote }>Add a Note</span>
          </div>
        </footer>
      </div>
    )
  }
}

export default Menu;

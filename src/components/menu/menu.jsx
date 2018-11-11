import React, { Component } from 'react';

import SearchInput from '../searchInput/searchInput';
import './menu.less';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <header>
          <SearchInput></SearchInput>
        </header>
        <main>
          <h2>Menu</h2>
        </main>
        <footer>
          <div className="add-btn">
            <span>Add a Note</span>
          </div>
        </footer>
      </div>
    )
  }
}

export default Menu;

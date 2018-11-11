import React, { Component } from 'react';

import './searchInput.less';

class SearchInput extends Component {
  render() {
    return (
      <div className="search-input">
        <input type="text" placeholder="Search notes"/>
        <i className="iconfont icon-search"></i>
      </div>
    )
  }
}

export default SearchInput;

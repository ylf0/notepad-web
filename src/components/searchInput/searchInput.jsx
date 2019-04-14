import React, { Component } from 'react';

import './searchInput.less';

class SearchInput extends Component {
  render() {
    return (
      <div className="search-input">
        <input type="text" placeholder="搜索笔记"/>
        <i className="iconfont icon-search"></i>
      </div>
    )
  }
}

export default SearchInput;

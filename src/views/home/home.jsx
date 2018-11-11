import React, { Component } from 'react';

import LeftBar from '@/components/leftBar/leftBar';
import Menu from '@/components/menu/menu';

import './home.less';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <LeftBar></LeftBar>
        <Menu></Menu>
        <div className="content">
          <h2>Content</h2>
        </div>
      </div>
    )
  }
}

export default Home;

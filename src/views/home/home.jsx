import React, { Component } from 'react';

import LeftBar from '@/components/leftBar/leftBar';

import './home.less';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <LeftBar></LeftBar>
        <h2>Home</h2>
      </div>
    )
  }
}

export default Home;

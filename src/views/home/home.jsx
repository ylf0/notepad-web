import React, { Component } from 'react';

import LeftBar from '@/components/leftBar/leftBar';
import Menu from '@/components/menu/menu';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavName: 'My Notes',
    }
  }

  navClicked = (name) => {
    this.setState({
      currentNavName: name,
    });
  };

  render() {
    return (
      <div className="home">
        <LeftBar navClicked={this.navClicked.bind(this)}></LeftBar>
        <Menu currentNavName={this.state.currentNavName}></Menu>
        <div className="content">
          <h2>Content</h2>
        </div>
      </div>
    )
  }
}

export default Home;

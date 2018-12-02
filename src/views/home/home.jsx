import React, { Component } from 'react';

import Login from '../login/login';
import LeftBar from '@/components/leftBar/leftBar';
import Menu from '@/components/menu/menu';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: null,
      currentNavName: 'My Notes',
    }
  }

  getCurrentUser = (user) => {
    if (user.name) {
      this.setState({ user, isLogin: true });
    }
  }

  navClicked = (name) => {
    this.setState({
      currentNavName: name,
    });
  };

  render() {
    let home = null;
    if (!this.state.isLogin) {
      home = <Login getCurrentUser={this.getCurrentUser.bind(this)}></Login>
    } else {
      home = <div className="home">
              <LeftBar navClicked={this.navClicked.bind(this)}></LeftBar>
              <Menu currentNavName={this.state.currentNavName}></Menu>
              <div className="content">
                <h2>Content</h2>
              </div>
            </div>
    }
    return home;
  }
}

export default Home;

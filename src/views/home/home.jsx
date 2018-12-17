import React, { Component } from 'react';

import Login from '../login/login';
import LeftBar from '@/components/leftBar/leftBar';
import Menu from '@/components/menu/menu';
import Content from '@/components/content/content';
import AddCard from '@/components/addCard/addCard';

import request from '@/utils/request';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user: null,
      currentNavName: 'My Notes',
      hiddenMenu: false,
      currentNoteId: '',
    }
  }

  componentWillMount() {
    if (localStorage.USER_ID) {
      this.getCurrentUser(localStorage.USER_ID);
    }
  }

  getCurrentUser = async (_id) => {
    try {
      const { user } = await request('GET', '/me', {
        _id,
      });
      if (user) this.setState({ user, isLogin: true });
    } catch (err) {
      console.log(err);
    }
  }

  handleLogin = (user) => {
    if (user.name) {
      this.setState({ user, isLogin: true });
      localStorage.setItem('USER_ID', user._id);
    }
  }

  navClicked = (name) => {
    this.setState({
      currentNavName: name,
    });
  };

  addNote = () => {
    this.setState({
      hiddenMenu: true,
    });
  };

  readNote = (id) => {
    this.setState({ currentNoteId: id });
  }

  showNoteMenu = () => {
    this.setState({ hiddenMenu: false });
  }

  render() {
    let home = null;
    let board = null;
    if (this.state.hiddenMenu) {
      const { user } = this.state;
      board = <AddCard _userId={user ? user._id : ''} showNoteMenu={this.showNoteMenu.bind(this)}/>
    } else {
      board = <Content _id={this.state.currentNoteId}/>
    }
    if (!this.state.isLogin) {
      home = <Login getCurrentUser={this.handleLogin.bind(this)}></Login>
    } else {
      home = <div className="home">
              <LeftBar
                userName={this.state.user ? this.state.user.name : 'hi'}
                navClicked={this.navClicked.bind(this)}>
              </LeftBar>
              <Menu
                hiddenMenu={this.state.hiddenMenu}
                currentNavName={this.state.currentNavName}
                addNote={this.addNote.bind(this)}
                readNote={this.readNote.bind(this)}>
              </Menu>
              <div className="content">
                { board }
              </div>
            </div>
    }
    return home;
  }
}

export default Home;

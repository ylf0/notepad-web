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
      currentNav: { name: 'My Notes', type: 'all' },
      hiddenMenu: false,
      shouldToggle: false,
      expandPanel: false,
      currentNoteId: '',
      dragTag: null,
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

  navClicked = (name, type) => {
    this.setState(function (prevState) {
      if (type !== prevState.currentNav.type) {
        return {
          shouldToggle: !prevState.shouldToggle,
          currentNav: { name, type },
          currentNoteId: '',
        }
      }
      return { currentNav: { name, type } }
    })
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

  expandPanel = () => {
    this.setState(prevState => ({
      expandPanel: !prevState.expandPanel,
    }));
  }

  dragStart = (tag) => {
    this.setState({ dragTag: tag })
  }

  dragEnd = () => {
    this.setState({ dragTag: null })
  }

  render() {
    let home = null;
    let board = null;
    const {
      hiddenMenu,
      isLogin,
      user,
      shouldToggle,
      currentNav,
      currentNoteId,
      expandPanel,
      dragTag,
    } = this.state
    if (hiddenMenu) {
      board = <AddCard _userId={user ? user._id : ''} showNoteMenu={this.showNoteMenu.bind(this)}/>
    } else {
      board = <Content
                _id={currentNoteId}
                shouldToggle={shouldToggle}
                expandPanel={this.expandPanel.bind(this)}/>
    }
    if (!isLogin) {
      home = <Login getCurrentUser={this.handleLogin.bind(this)}></Login>
    } else {
      home = <div className="home">
              <LeftBar
                shouldHidden={expandPanel}
                userName={user ? user.name : 'hi'}
                navClicked={this.navClicked.bind(this)}
                dragStart={this.dragStart}
                dragEnd={this.dragEnd}>
              </LeftBar>
              <Menu
                hiddenMenu={hiddenMenu}
                currentNav={currentNav}
                shouldShrink={expandPanel}
                dragTag={dragTag}
                getNoteType={this.navClicked.bind(this)}
                addNote={this.addNote.bind(this)}
                readNote={this.readNote.bind(this)}>
              </Menu>
              <div className="right-content">
                { board }
              </div>
            </div>
    }
    return home;
  }
}

export default Home;

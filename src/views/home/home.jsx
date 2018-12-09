import React, { Component } from 'react';

import Login from '../login/login';
import LeftBar from '@/components/leftBar/leftBar';
import Menu from '@/components/menu/menu';

import request from '@/utils/request';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      user: null,
      currentNavName: 'My Notes',
      hiddenMenu: false,
      title: '',
      content: '',
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

  addNote = () => {
    this.setState({
      hiddenMenu: true,
    });
  };

  setTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  setContent = (e) => {
    this.setState({ content: e.target.value });
  };

  submitNote = async () => {
    try {
      const userId = this.state.user._id;
      const { title, content } = this.state;

      if (!userId) {
        console.log('userId is not existed!');
        return;
      } else if (!title) {
        console.log('title is required!');
        return;
      } else if (!content) {
        console.log('content is required!');
        return;
      }

      await request('POST', '/article', {}, {
        userId,
        title,
        content,
      });

      this.setState({
        title: '',
        content: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let home = null;
    if (!this.state.isLogin) {
      home = <Login getCurrentUser={this.getCurrentUser.bind(this)}></Login>
    } else {
      home = <div className="home">
              <LeftBar
                userName={this.state.user ? this.state.user.name : 'hi'}
                navClicked={this.navClicked.bind(this)}>
              </LeftBar>
              <Menu
                hiddenMenu={this.state.hiddenMenu}
                currentNavName={this.state.currentNavName}
                addNote={this.addNote.bind(this)}>
              </Menu>
              <div className={this.state.hiddenMenu ? 'add-new' : 'content'}>
                <h2>Content</h2>
                <div className="add-container">
                  <input
                    type="text"
                    placeholder="标题..."
                    value={this.state.title}
                    onChange={this.setTitle.bind(this)}/>
                  <textarea
                    placeholder="写点什么..."
                    value={this.state.content}
                    onChange={this.setContent.bind(this)}/>
                  <div className="add-btn" onClick={this.submitNote.bind(this)}>
                    <span>提交</span>
                  </div>
                </div>
              </div>
            </div>
    }
    return home;
  }
}

export default Home;

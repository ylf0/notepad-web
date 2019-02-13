import React, { Component } from 'react';
import request from '@/utils/request';

import './login.less';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pwd: '',
    }
  }

  submit = async () => {
    try {
      const { userName, pwd } = this.state;
      if (!userName) {
        console.error('name is required!');
        return;
      } else if (!pwd) {
        console.error('password is required!');
        return;
      }

      const user = await request('POST', '/login', {}, {
        name: userName,
        password: pwd,
      });
      this.props.getCurrentUser(user);
    } catch (err) {
      console.error(err.message);
    }
  }

  setName = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }

  setPwd = (e) => {
    this.setState({
      pwd: e.target.value,
    });
  }

  render() {
    return (
      <div className="login-page">
        <h1>登录</h1>
        <div className="login-container">
          <form>
            <input
              type="text"
              placeholder="用户名"
              autoComplete="username"
              value={ this.state.userName }
              onChange={ this.setName }/>
            <input
              type="password"
              placeholder="密码"
              autoComplete="current-password"
              value={ this.state.pwd }
              onChange={ this.setPwd }/>
          </form>
          <div className="remember-check">
            <input type="checkbox"/>
            <span>30 天内记住我</span>
          </div>
          <div className="confirm-btn" onClick={this.submit}>
            <span>登录</span>
          </div>
          <div className="forget-pwd">
            <span>忘记密码？</span>
          </div>
        </div>
        <div className="create-account">
          <span className="tip">没有账号？</span>
          <span>创建账户</span>
        </div>
      </div>
    )
  }
}

export default Login;

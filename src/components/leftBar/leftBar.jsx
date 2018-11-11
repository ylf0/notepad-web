import React, { Component } from 'react';

import './leftBar.less';

const navs = [
  { name: 'My Notes', icon: 'notepad' },
  { name: 'Starred', icon: 'star' },
  { name: 'Shared', icon: 'share' },
  { name: 'Archived', icon: 'folder' },
  { name: 'Deleted', icon: 'trash' },
];

const tags = [
  { name: 'Work', color: 'blue' },
  { name: 'Personal', color: 'orange' },
  { name: 'Daily Journal', color: 'yellow' },
]

class LeftBar extends Component {
  render() {
    return (
      <div className="left-bar">
        <div className="nav-area">
          {
            navs.map((nav, index) => (
              <div className="nav" key={index}>
                <i className={`iconfont icon-${nav.icon}`}></i>
                <span>{nav.name}</span>
              </div>
            ))
          }
        </div>
        <div className="tag-area">
          <h3>TAGS</h3>
          {
            tags.map((tag, index) => (
              <div className="tag" key={index}>
                <div className={`point ${tag.color}`}></div>
                <span>{tag.name}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default LeftBar;

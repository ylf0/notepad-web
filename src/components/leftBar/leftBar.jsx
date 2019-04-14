import React, { Component } from 'react';
import request from '../../utils/request'
import AddTag from '../addTag/addTag'

import './leftBar.less';

const avatar = require('../../assets/images/avatar.jpg');

class LeftBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navs : [
        { name: '全部', type: 'all', icon: 'notepad', selected: true },
        { name: '收藏', type: 'star', icon: 'star', selected: false },
        { name: '分享', type: 'share', icon: 'share', selected: false },
        { name: '归档', type: 'archived', icon: 'folder', selected: false },
        { name: '回收站', type: 'deleted', icon: 'trash', selected: false },
      ],
      tags: [],
      showAddTagContainer: false,
    }
  }

  getTags = async () => {
    try {
      const { allTags } = await request('GET', '/tags')
      this.setState({ tags: allTags })
    } catch (err) {
      console.log('err: ', err)
    }
  }

  chooseNav = (index) => {
    const navs = this.state.navs;
    navs.forEach((nav) => nav.selected = false);
    navs[index].selected = true;
    this.setState({
      navs,
    });
    this.props.navClicked(navs[index].name, navs[index].type);
  }

  dragStart = (tagId, e) => {
    e.target.style.opacity = .5
    this.props.dragStart(tagId)
  }

  dragEnd = (e) => {
    this.props.dragEnd()
    e.target.style.opacity = ''
  }

  toggleAddTagContainer = (e) => {
    this.setState(prevState => ({
      showAddTagContainer: !prevState.showAddTagContainer,
    }))
  }

  closeAddTagContainer = (e) => {
    e.stopPropagation()
    this.setState({ showAddTagContainer: false })
  }

  componentDidMount() {
    this.getTags()
  }

  render() {
    const { tags, showAddTagContainer } = this.state
    return (
      <div className="left-bar">
        <div className="nav-area">
          {
            this.state.navs.map((nav, index) => (
              <div
                className={nav.selected ? 'nav active' : 'nav'}
                key={index}
                onClick={this.chooseNav.bind(this, index)}>
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
              <div
                className="tag"
                key={index}
                draggable={true}
                onDragStart={(e) => this.dragStart(tag._id, e)}
                onDragEnd={this.dragEnd}>
                <div className="point" style={{backgroundColor: tag.color}}></div>
                <span>{tag.name}</span>
              </div>
            ))
          }
          <div className="add-tag">
            <div className="add-tag-area" onClick={this.toggleAddTagContainer}>
              <i className="iconfont icon-add"/>
              <span className="desc">添加标签</span>
            </div>
            <AddTag
              ref="addTag"
              showContainer={showAddTagContainer}
              closeContainer={this.closeAddTagContainer}/>
          </div>
        </div>
        <footer>
          <img src={ avatar } alt="avatar"/>
          <span>{ this.props.userName }</span>
        </footer>
      </div>
    )
  }
}

export default LeftBar;

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
      addTagTop: 0,
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

  addTag = async (name, color) => {
    try {
      await request('POST', '/tag', {}, {
        name,
        color,
      })
      this.closeAddTagContainer()
    } catch (err) {
      console.log('err: ', err)
    }
  }

  removeTag = async (id) => {
    try {
      await request('DELETE', `/tag/${id}`)
      this.getTags()
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

  dragStart = (tag, e) => {
    e.target.lastChild.style.display = 'none'
    e.target.style.opacity = .5
    this.props.dragStart(tag)
  }

  dragEnd = (e) => {
    this.props.dragEnd()
    e.target.style.opacity = ''
    e.target.lastChild.style.display = ''
  }

  editTag = (index, e) => {
    const { tags } = this.state
    const { value } = e.target
    tags[index].name = value
    this.setState({ tags })
  }

  updateTag = async (tagId, e) => {
    try {
      const { value, parentNode } = e.target
      parentNode.className = 'tag-name-area'
      await request('POST', `/tag/${tagId}`, {}, {
        name: value,
        color: '#3da8f5',
      })
    } catch (err) {
      console.log('err: ', err)
    }
  }

  toggleTagInput = (e) => {
    const { currentTarget } = e
    if (currentTarget) {
      currentTarget.className = 'tag-name-area show-add-input'
      currentTarget.lastChild.focus()
    }
  }

  toggleAddTagContainer = (e) => {
    const { clientY } = e
    this.setState(prevState => ({
      showAddTagContainer: !prevState.showAddTagContainer,
      addTagTop: clientY,
    }))
  }

  closeAddTagContainer = async () => {
    await this.getTags()
    this.setState({ showAddTagContainer: false })
  }

  componentDidMount() {
    this.getTags()
  }

  render() {
    const { tags, showAddTagContainer, addTagTop } = this.state
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
                onDragStart={(e) => this.dragStart(tag, e)}
                onDragEnd={this.dragEnd}>
                <div className="point" style={{backgroundColor: tag.color}}></div>
                <div className="tag-name-area" onClick={this.toggleTagInput}>
                  <span>{tag.name}</span>
                  <input
                    spellCheck={false}
                    value={tag.name}
                    onChange={(e) => this.editTag(index, e)}
                    onBlur={(e) => this.updateTag(tag._id, e)}/>
                </div>
                <i className="iconfont icon-trash" onClick={() => this.removeTag(tag._id)}/>
              </div>
            ))
          }
          <div className="add-tag">
            <div className="add-tag-area" onClick={this.toggleAddTagContainer}>
              <i className="iconfont icon-add"/>
              <span className="desc">添加标签</span>
            </div>
            <AddTag
              showContainer={showAddTagContainer}
              top={addTagTop}
              addTag={this.addTag}
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

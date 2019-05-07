import React, { Component } from 'react';
import request from '../../utils/request'

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
    }
  }

  getTags = async () => {
    try {
      const { allTags } = await request('GET', '/tags')

      for (const tag of allTags) {
        tag.editName = tag.name
      }

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
    tags[index].editName = value
    this.setState({ tags })
  }

  updateTag = async (index, e) => {
    try {
      const { tags } = this.state
      const { _id, name, editName } = tags[index]
      const { parentNode } = e.target

      if (name === editName) {
        parentNode.className = 'tag-name-area'
        return
      }

      tags[index].name = editName
      this.setState({ tags })
      parentNode.className = 'tag-name-area'

      await request('POST', `/tag/${_id}`, {}, {
        name: editName,
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
    const { tags } = this.state
    const { shouldHidden, shouldShrink } = this.props
    if (shouldHidden) return null
    if (shouldShrink) {
      return (
        <div className="left-bar left-shrink">
          <div className="left-content">
            <div className="icon-area">
              <i className="iconfont icon-text"/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="left-bar">
        <div className="nav-area">
          <div className="nav-desc">
            <span>文件夹</span>
            <i className="iconfont icon-add"/>
          </div>
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
          <i className="iconfont icon-add"/>
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
                    value={tag.editName}
                    onChange={(e) => this.editTag(index, e)}
                    onBlur={(e) => this.updateTag(index, e)}/>
                </div>
                <i className="iconfont icon-trash" onClick={() => this.removeTag(tag._id)}/>
              </div>
            ))
          }
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

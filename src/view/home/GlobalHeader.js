import React, { Component } from 'react'
import { Menu, Dropdown, Icon, message, Avatar } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import utils from '@src/utils'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'

class GlobalHeader extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  onClick = ({ key }) => {
    if (key === '3') {
      axios.post(urls.logout).then(res => {
        this.props.history.push('/login')
      })
    }
  }

  render () {
    const user = utils.getCookie('wx_admin')
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="1"><Icon type="user"/>个人中心</Menu.Item>
        <Menu.Item key="2"><Icon type="setting"/>个人设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3"><Icon type="logout"/>退出登录</Menu.Item>
      </Menu>
    )
    return (
      <div style={{ height: '100%', padding: '0 10px' }}>
        {user ? <Dropdown overlay={menu}>
          <div className="avatar-dropdown-link"
            style={{ float: 'right', height: '100%', cursor: 'pointer', padding: '0 20px' }}>
            <Avatar size="small" style={{
              color: '#fff',
              backgroundColor: '#1890ff',
              float: 'left',
              marginTop: '20px'
            }}>U</Avatar>
            <span style={{
              whiteSpace: 'nowrap',
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'inline-block',
              float: 'left',
              fontSize: '16px',
              margin: '0 10px'
            }}>{user}</span>
            <Icon type="down" style={{
              float: 'left',
              margin: '28px 0 0 0px'
            }} />
          </div>
        </Dropdown> : <Link
          to={'/login'}
          href="javascript:;"
          style={{ float: 'right', height: '100%', cursor: 'pointer', padding: '0 20px' }}
        >登录</Link>}
      </div>
    )
  }
}

export default withRouter(GlobalHeader)

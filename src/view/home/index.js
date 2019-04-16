import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Link, withRouter, Redirect, Switch } from 'react-router-dom'
import GlobalHeader from './GlobalHeader'
import styles from './index.less'
import NewsList from '@src/view/newsList'
import NewsContent from '@src/view/newsList/newsContent'
import Redux from '@src/view/redux'

export default class Home extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { Header, Content, Footer, Sider } = Layout
    const imgUrl = require('@src/assets/logo.svg')
    // withRouter(App)以后 this.props就有location等路由信息了
    // 由于此Home组件本身是路由组件，所以不withRouter也会有location等路由信息
    // 每次刷新 切换导航 重新输入url等都会进入这里 重新算出current给到selectedKeys
    // this.props.history.push(a) 动态跳转
    const current = this.props.location.pathname.replace(/\//, '')
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className={styles.logo}>
            <img src={imgUrl} className={styles.logoSvg}></img>
            <h1 className={styles.name}>啊啊啊啊附带</h1>
          </div>
          <Menu theme="dark" mode="inline"
            selectedKeys={[current]}
            defaultOpenKeys={['1']}
          >
            <Menu.SubMenu key="1" title={<span><Icon type="mail" /><span>文章管理</span></span>}>
              <Menu.Item key="newsList">
                <Link to="/newsList" replace>
                  <span className="nav-text">文章列表</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="redux">
                <Link to="/redux" replace>
                  <span className="nav-text">redux</span>
                </Link>
              </Menu.Item>
            </ Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {/* 加了Switch从上往下匹配 只匹配一次 /路由写最后 如果输入/abc 都没匹配到就匹配到最后的/路由 */}
              <Switch>
                <Route path="/newsList" component={NewsList} />
                <Route path="/newsContent/:id" component={NewsContent} />
                <Route path="/redux" component={Redux} />
                <Route path="/" render={() => <Redirect to="/newsList"/>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            xxxx ©2018 Created by xxxxx
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

import React, { Component } from 'react'
import { Button, Table } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'
import './weixin.less'

export default class newsContent extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      content: {}
    }
  }

  componentDidMount () {
    axios.get(urls.getArticleContentById(this.props.match.params.id)).then(res => {
      console.log(res)
      this.setState({ content: res.content })
    })
  }

  render () {
    const { content } = this.state
    return (
      <div className="newsContent">
        <div className="title">
          {content.title}
        </div>
        <div className="author">
          {content.author}
        </div>
        {/* <div className="video">
          <video src="http://v.qq.com/txp/iframe/player.html?origin=https%3A%2F%2Fmp.weixin.qq.com&vid=m0388crwn4g&autoplay=false&full=true&show1080p=false&isDebugIframe=false"></video>
        </div> */}
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: content.content}}></div>
        </div>
      </div>
    )
  }
}

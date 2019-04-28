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
    axios.post(urls.getArticleContentById, { id: this.props.match.params.id }).then(res => {
      this.setState({ content: res.data.content })
    })
  }

  render () {
    const { content } = this.state
    // https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=e0841bel9ll
    // https://mp.weixin.qq.com/mp/readtemplate?t=pages/video_player_tmpl&action=mpvideo&auto=0&vid=wxv_770367681009795072

    return (
      <div className="newsContent">
        {/* <div className="title">
          {content.title}
        </div>
        <div className="author">
          {content.author}
        </div> */}
        {/* <div className="video">
          <a target="_blank" href={content.video_url}>{content.video_url}</a>
          <video src={content.video_url}></video>
        </div> */}
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: content.content}}></div>
        </div>
      </div>
    )
  }
}

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

    return (
      <div className="newsContent">
        {/* <div className="title">
          {content.title}
        </div>
        <div className="author">
          {content.author}
        </div> */}
        {/* <div className="video">
          <a target="_blank" href={content.videoUrl}>{content.videoUrl}</a>
          <video src={content.videoUrl}></video>
        </div> */}
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: content.content}}></div>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Button } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'

export default class Home extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      productAll: []
    }
  }

  list = () => {
    const data = {
      pageNum: 2,
      pageSize: 20,
      key: '121'
    }
    axios.post(urls.getArticleList, data).then(res => {
      console.log(res)
    })
  }

  content = () => {
    axios.get(urls.getArticleContentById(22)).then(res => {
      console.log(res)
    })
  }

  render () {
    return (
      <div className="newsList">
        <Button type="primary" onClick={this.list}>请求列表</Button>
        <Button type="primary" onClick={this.content}>请求详情</Button>
      </div>
    )
  }
}

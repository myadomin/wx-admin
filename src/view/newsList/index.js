import React, { Component } from 'react'
import { Button, Table } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'
import { Link } from 'react-router-dom'

export default class NewsList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      tableData: []
    }
  }

  componentDidMount () {
    this.getArticlelist()
  }

  getArticlelist = () => {
    const data = {
      pageNum: 1,
      pageSize: 10,
      key: '',
      orderBy: 'read_num',
      order: 'ASC'
    }
    axios.post(urls.getArticleList, data).then(res => {
      this.setState({ tableData: res.map(obj => {
        return {...obj, key: obj.id}
      })})
    })
  }

  deleteArticle = (id) => {
    console.log(id)
  }

  render () {
    const columns = [{
      title: 'id',
      dataIndex: 'id'
    }, {
      title: '标题',
      dataIndex: 'title',
      render: (text, record) => {
        return <Link target='_blank' to={`/newsContent/${record.content_id}`}>{text}</Link>
      }
    }, {
      title: '公众号',
      dataIndex: 'author'
    }, {
      title: '创建时间',
      dataIndex: 'datetime'
    }, {
      title: '阅读数',
      dataIndex: 'read_num'
    }, {
      title: '转发数',
      dataIndex: 'relay_num'
    }, {
      title: 'Action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.deleteArticle(record.content_id)}>删除</a>
        </span>
      )
    }]
    const { tableData } = this.state
    return (
      <div className="newsList">
        <div className="header" style={{ margin: '0 0 20px 0' }}>
          <Button type="primary" onClick={this.list}>请求列表</Button>
          <Button type="primary" onClick={this.content}>请求详情</Button>
        </div>
        <div className="content">
          <Table columns={columns} dataSource={tableData} />
        </div>
      </div>
    )
  }
}

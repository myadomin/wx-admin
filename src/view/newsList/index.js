import React, { Component } from 'react'
import { Button, Table } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'
import { Link } from 'react-router-dom'

export default class NewsList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 8,
        total: 0
      }
    }
  }

  componentDidMount () {
    this.getArticlelist()
  }

  // 分页、排序、筛选变化时触发 获取表格数据
  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      pagination: { ...this.state.pagination, pageNum: pagination.current }
    }, () => {
      this.getArticlelist()
    })
  }

  getArticlelist = () => {
    const { pageNum, pageSize, total } = this.state.pagination
    const data = {
      pageNum,
      pageSize,
      key: '',
      orderBy: 'read_num',
      order: 'ASC'
    }
    axios.post(urls.getArticleList, data).then(res => {
      const tableData = res.list.map(obj => {
        return {...obj, key: obj.id}
      })
      const pagination = { ...this.state.pagination, total: res.total }
      this.setState({
        tableData,
        pagination
      })
    })
  }

  deleteArticle = (id) => {
    console.log(id)
  }

  render () {
    const { tableData, pagination } = this.state
    const columns = [{
      title: 'id',
      dataIndex: 'id'
    }, {
      title: '标题',
      dataIndex: 'title',
      render: (text, record) => {
        return <Link style={{color: 'rgba(0, 0, 0, 0.65)'}} target='_blank' to={`/newsContent/${record.content_id}`}>{text}</Link>
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
      title: '操作',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.deleteArticle(record.content_id)}>删除</a>
        </span>
      )
    }]
    return (
      <div className="newsList">
        <div className="header" style={{ margin: '0 0 20px 0' }}>
          <Button type="primary" onClick={this.list}>请求列表</Button>
          <Button type="primary" onClick={this.content}>请求详情</Button>
        </div>
        <div className="content">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={pagination}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}

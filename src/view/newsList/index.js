import React, { Component } from 'react'
import { Button, Table, Input, Select } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styles from './index.less'

export default class NewsList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 8,
        total: 0
      },
      sortedInfo: {
        columnKey: 'datetime',
        order: 'descend'
      },
      filterTitle: '',
      filterBiz: ''
    }
  }

  componentDidMount () {
    this.getArticlelist()
  }
  // 分页、排序、筛选变化时触发 获取表格数据
  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      pagination: { ...this.state.pagination, pageNum: pagination.current },
      sortedInfo: sorter
    }, () => {
      this.getArticlelist()
    })
  }
  // 标题
  handleChangeTitle = (ev) => {
    this.setState({ filterTitle: ev.target.value })
  }
  // 选择公众号
  handleChangeBiz = (value) => {
    this.setState({ filterBiz: value })
  }
  // 获取文章列表
  getArticlelist = () => {
    const { pageNum, pageSize, total } = this.state.pagination
    const { columnKey, order } = this.state.sortedInfo
    const { filterTitle, filterBiz } = this.state
    const data = {
      pageNum,
      pageSize,
      filterTitle,
      filterBiz,
      orderBy: columnKey,
      order: order === 'ascend' ? 'ASC' : 'DESC'
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
  // 点击查询 默认第一页
  search = () => {
    const pagination = { ...this.state.pagination, pageNum: 1 }
    this.setState({ pagination }, () => {
      this.getArticlelist()
    })
  }
  // 删除文章
  deleteArticle = (id) => {
    console.log(id)
  }

  render () {
    const { tableData, pagination, sortedInfo, filterTitle, filterBiz } = this.state
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
      title: '阅读数',
      dataIndex: 'read_num',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'read_num' && sortedInfo.order
    }, {
      title: '转发数',
      dataIndex: 'relay_num',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'relay_num' && sortedInfo.order
    }, {
      title: '创建时间',
      dataIndex: 'datetime',
      render: (text, record) => {
        return <span>{moment(text * 1000).format('MM-DD: hh:mm:ss')}</span>
      },
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'datetime' && sortedInfo.order
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
        <div className={styles.header}>
          <span className={styles.left}>
            <span className={styles.leftItem}>
              标题：<Input style={{ width: 200 }} value={filterTitle} placeholder="输入标题" onChange={this.handleChangeTitle} />
            </span>
            <span className={styles.leftItem}>
              {/* todo 抓完数据后把公众号label value存入数据库 然后展示在这个列表 */}
              公众号：<Select style={{ width: 200 }} value={filterBiz} placeholder="选择公众号" onChange={this.handleChangeBiz}>
                <Select.Option value={''}>所有</Select.Option>
                <Select.Option value={'MzA3NjkyMDc2Ma=='}>公众号a</Select.Option>
                <Select.Option value={'MzA3NjkyMDc2Mg=='}>公众号g</Select.Option>
              </Select>
            </span>
            <span className={styles.leftItem}>
              <Button type="primary" onClick={this.search}>查询</Button>
            </span>
          </span>
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

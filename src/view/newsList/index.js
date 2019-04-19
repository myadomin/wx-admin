import React, { Component } from 'react'
import { Button, Table, Input, Select, message, Tooltip } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'
import { Link } from 'react-router-dom'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import styles from './index.less'

export default class NewsList extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      tableData: [],
      pagination: {
        // 直接对应到pagination组件 所以必须字段名称只能用这三个固定值 不能改动
        current: 1,
        pageSize: 8,
        total: 0
      },
      sortedInfo: {
        columnKey: 'datetime',
        order: 'descend'
      },
      filterTitle: '',
      filterBiz: '',
      bizList: [],
      showDelBtn: false
    }
  }

  componentDidMount () {
    this.getArticlelist()
    this.getBizList()
  }
  // 获取公众号list
  getBizList = () => {
    axios.post(urls.getBizList).then(res => {
      this.setState({ bizList: res.data.list })
    })
  }
  // 分页、排序、筛选变化时触发 获取表格数据
  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      pagination: { ...this.state.pagination, current: pagination.current },
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
    const { current, pageSize, total } = this.state.pagination
    const { columnKey, order } = this.state.sortedInfo
    const { filterTitle, filterBiz } = this.state
    const data = {
      current,
      pageSize,
      filterTitle,
      filterBiz,
      orderBy: columnKey,
      order: order === 'ascend' ? 'ASC' : 'DESC'
    }
    axios.post(urls.getArticleList, data).then(res => {
      const tableData = res.data.list.map(obj => {
        return {...obj, key: obj.id}
      })
      const pagination = { ...this.state.pagination, total: res.data.total }
      this.setState({
        tableData,
        pagination,
        showDelBtn: Boolean(res.data.showDelBtn)
      })
    })
  }
  // 点击查询 默认第一页
  search = () => {
    const pagination = { ...this.state.pagination, current: 1 }
    this.setState({ pagination }, () => {
      this.getArticlelist()
    })
  }
  // 删除文章
  deleteArticle = (id) => {
    console.log(id)
    axios.post(urls.deleteArticleList, { id: id }).then(res => {
      if (res.ret === 0) {
        this.getArticlelist()
        message.success('删除成功')
      } else {
        message.error(res.msg)
      }
    })
  }

  render () {
    const { tableData, pagination, sortedInfo, filterTitle, filterBiz, bizList, showDelBtn } = this.state
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order
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
      title: '视频',
      dataIndex: 'video_url',
      render: (text, record) => {
        return text ? <Tooltip placement="top" title={text}>
          <a href="javascript:;" onClick={() => copy(text)}>复制链接</a>
        </Tooltip> : ''
      }
    }, {
      title: '操作',
      render: (text, record) => (
        <span>
          {showDelBtn ? <a href="javascript:;" onClick={() => this.deleteArticle(record.content_id)}>删除</a> : null}
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
              公众号：<Select style={{ width: 200 }} value={filterBiz} placeholder="选择公众号" onChange={this.handleChangeBiz}>
                <Select.Option value={''}>所有</Select.Option>
                {bizList.map(obj => {
                  return <Select.Option key={obj.id} value={obj.biz}>{obj.author}</Select.Option>
                })}
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

import React, { Component } from 'react'
import { Button, Form, Input, Checkbox, message, Icon } from 'antd'
import axios from '@src/utils/axios'
import urls from '@src/config/urls.js'

class Login extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(urls.login, values).then(res => {
          const { ret } = res
          if (ret) {
            console.log(121)
          } else {
            message.error('用户名或者密码错误')
          }
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login" style={{ height: '100vh', background: '#f8f8f8' }}>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px', margin: '0 auto', paddingTop: '200px' }}>
          <Form.Item>
            <h1>wx-admin</h1>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(Login)

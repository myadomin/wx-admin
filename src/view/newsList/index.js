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

  render () {
    return (
      <div className="newsList">
        newsList
      </div>
    )
  }
}

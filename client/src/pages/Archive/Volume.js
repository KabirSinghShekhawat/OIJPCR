import React, { Component } from 'react'
import axios from 'axios'
import ArticleList from './ArticleList'
import config from '../../config/config'

class Volume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journals: null,
    }
  }

  async componentDidMount () {
    try {
      const { volume } = this.props

      const { data: journals } = await axios.get(
        `${config.host}journals/all/${volume}/info`,
      )

      this.setState({ journals: journals })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render () {
    const { path, volume, archive: volumeInfo } = this.props
    const about = volumeInfo ? volumeInfo.about : ''
    return (
      <div className="flex-grow">
        <div className="px-4 py-6 mx-12 my-6">
          <h1 className="text-gray-900 font-black text-5xl">Volume {volume}</h1>
          <p className="max-w-4xl mt-4 text-lg">{about}</p>
        </div>
        <div>
          <ArticleList
            journals={this.state.journals}
            path={path}
            volume={volume}
          />
        </div>
      </div>
    )
  }
}

export default Volume
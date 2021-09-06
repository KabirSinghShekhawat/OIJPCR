import React, { Component } from 'react'
import axios from 'axios'
import VolumeCard from '../Cards/VolumeCard'
import config from '../../config/config'

class VolumeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volumes: [],
    }
  }

  async componentDidMount () {
    const url = `${config.host}volume`
    const { data } = await axios.get(url)
    this.setState({ volumes: data })
  }

  render () {
    return (
      <div className="flex-grow">
        <Volumes volumes={this.state.volumes}/>
      </div>
    )
  }
}

function Volumes ({ volumes }) {
  let volumeList
  if (typeof volumes == 'undefined')
    volumeList = '...Loading'
  else if (volumes.length === 0)
    volumeList = 'No Volumes Found'
  else volumeList = createVolumeCards(volumes)

  return (
    <div className="h-full lg:mx-0 mx-4">
      <div className="flex flex-row flex-wrap h-full justify-evenly py-2 my-4 w-full editor">
        <div className="flex flex-column md:flex-row flex-wrap justify-evenly">
          {volumeList}
        </div>
      </div>
    </div>
  )
}

function createVolumeCards (volumes) {
  return volumes.map((volume, index) =>
    <VolumeCard {...volume} key={index} isAdmin={true}/>)
}

export default VolumeList
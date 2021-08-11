import React, { Component } from 'react'
import axios from 'axios'
import {
  Switch,
  Route,
} from 'react-router-dom'
import ArticleCardAdmin from '../Admin/Cards/ArticleCardAdmin'
import ReadArticle from '../../pages/Articles/ReadArticle'
import VolumeCard from '../Cards/VolumeCard'

class VolumeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volumes: [],
    }
  }

  async componentDidMount () {
    try {
      const { data } = await axios.get('http://localhost:5000/admin/volume')
      this.setState({ volumes: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render () {
    const { path } = this.props.match
    return (
      <div className="flex-grow">
        {/*<Switch>*/}
        {/*<Route exact path={`${path}/journals/:urlSlug/:id`} render={(props) =>*/}
        {/*  <ReadArticle {...props} />}*/}
        {/*/>*/}
        {/*<Route path={path} render={() =>*/}
        <Volumes volumes={this.state.volumes}/>
        {/*//   }*/}
        {/*//   />/*/}
        {/*// </Switch>*/}
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
    <div className="h-full md:mx-16 mx-4">
      <div className="flex flex-row flex-wrap h-full justify-evenly py-2 my-4 w-full editor">
        <div className="flex md:flex-row flex-column flex-wrap justify-evenly">
          {volumeList}
        </div>
      </div>
    </div>
  )
}

function createVolumeCards (volumes) {
  return volumes.map((volume, index) =>
    <VolumeCard {...volume} key={index} isAdmin={true} />)
}

export default VolumeList
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Volume from './Volume'
import VolumeCard from '../../components/Cards/VolumeCard'
import axios from 'axios'
import FlexContainer from '../../components/utils/FlexContainer'
import ReadArticle from '../Articles/ReadArticle'

class Archive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      archive: [],
    }
  }

  async componentDidMount () {
    try {
      const {data} = await axios.get(`http://localhost:5000/journals/archive`)
      this.setState({ archive: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render () {
    const { path } = this.props.match
    return (
      <FlexContainer>
        <Switch>
          <Route exact path="/archive"
                 render={(props) => <Home {...props} archive={this.state.archive}/>}
          />
          <Route exact path="/archive/:volume"
                 render={(props) => <Volume {...props} />}
          />
          <Route exact path={`${path}/:urlSlug/:id`} render={(props) =>
            <ReadArticle {...props} />}
          />
          <Route exact path="/archive/*"
                 render={() => <Redirect to="/notFound"/>}
          />
        </Switch>
      </FlexContainer>
    )
  }
}

function Home (props) {
  return (
    <div className="flex md:flex-row flex-column flex-wrap justify-evenly">
      {props.archive.map((archive, index) =>
        <VolumeCard {...archive} key={index}/>,
      )}
    </div>
  )
}

export default Archive
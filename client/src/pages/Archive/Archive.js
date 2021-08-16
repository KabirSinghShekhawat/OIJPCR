import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Volume from './Volume'
import VolumeCard from '../../components/Cards/VolumeCard'
import axios from 'axios'
import FlexContainer from '../../components/utils/FlexContainer'
import ReadArticle from '../Articles/ReadArticle'
import SubmitArticleFormFullWidth from './SubmitArticleFormFullWidth'

class Archive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      archive: [],
    }
  }

  async componentDidMount () {
    try {
      const { data } = await axios.get(`http://localhost:5000/journals/archive`)
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
          {/* Archives must be passed as a prop */}
          <Route exact path="/archive/:volume"
                 render={
                   (routeProps) =>
                     <RenderVolumePage
                       archive={this.state.archive}
                       {...routeProps}
                     />
                 }
          />

          <Route exact path={`${path}/:urlSlug/:id`}
                 render={
                   (routeProps) =>
                     <DisplayArticle
                       {...routeProps}
                     />
                 }
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
    <>
      <div className="flex md:flex-row flex-column flex-wrap justify-evenly">
        {props.archive.map((archive, index) =>
          <VolumeCard {...archive} key={index}/>,
        )}
      </div>
      <div className="mx-12">
        <SubmitArticleFormFullWidth/>
      </div>
    </>
  )
}

function RenderVolumePage (props) {
  const { path } = props.match
  const { volume } = props.match.params
  const archive = props.archive.filter(ele => ele.volume === parseInt(volume))
  return (
    <Volume path={path}
            volume={volume}
            archive={archive[0]}
    />
  )
}

function DisplayArticle (props) {
  const {path} = props.match
  const { urlSlug, id } = props.match.params
  return (
    <ReadArticle
      urlSlug={urlSlug}
      id={id}
      path={path}
    />
  )
}


export default Archive
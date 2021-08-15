import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Volume from './Volume'
import VolumeCard from '../../components/Cards/VolumeCard'
import axios from 'axios'
import FlexContainer from '../../components/utils/FlexContainer'
import ReadArticle from '../Articles/ReadArticle'
import box from '../../assets/submitArticleBtn.svg'

class Archive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      archive: [],
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`http://localhost:5000/journals/archive`)
      this.setState({ archive: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render() {
    const { path } = this.props.match

    return (
      <FlexContainer>
        <Switch>
          <Route exact path="/archive"
            render={(props) => <Home {...props} archive={this.state.archive} />}
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
            component={DisplayArticle}
          />

          <Route exact path="/archive/*"
            render={() => <Redirect to="/notFound" />}
          />
        </Switch>
      </FlexContainer>
    )
  }
}

function Home(props) {
  return (
    <>
      <div className="flex md:flex-row flex-column flex-wrap justify-evenly">
        {props.archive.map((archive, index) =>
          <VolumeCard {...archive} key={index} />,
        )}
      </div>
      <div className="mx-12">
        <SubmitArticleForm />
      </div>
    </>
  )
}

function RenderVolumePage(props) {
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

function DisplayArticle(props) {
  const { urlSlug, id } = props.match.params
  return (
    <ReadArticle
      urlSlug={urlSlug}
      id={id}
    />
  )
}

function SubmitArticleForm(props) {
  return (
    <div className="p-2 pb-6 mx-1 mb-6 mt-4 md:mt-10 rounded-lg shadow-xl border">
    <div className="flex flex-col justify-center ml-4">
      <p className="text-5xl sm:text-4xl text-gray-900 text-left font-bold my-4 px-2 primary-color">
        Interested in seeing your article in this space?
      </p>
      <p className="px-2">
        Submit a draft of your article and we'll get back to you!
      </p>
      <button className="mt-16 sm:mt-8 py-2 px-6 ml-4 max-w-max rounded-md primary-color-bg text-white">
        <img src={box} alt="submit button icon" className="mr-2 inline h-4 w-4 mb-1"/>
        <span>
          Submit Article
        </span>
      </button>
    </div>
  </div>
  )
}

export default Archive
import React, { Component } from 'react'
import axios from 'axios'
import {
  Switch,
  Route,
} from 'react-router-dom'
import ReadArticle from '../components/Articles/ReadArticle'
import Journals from '../components/Articles/Journals'

class Archive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journals: [],
    }
  }

  async componentDidMount () {
    try {
      const { data } = await axios.get('http://localhost:5000/journals')
      this.setState({ journals: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render () {
    const { path } = this.props.match
    return (
      <div className="flex-grow">
        <Switch>
          <Route exact path={`${path}/:urlSlug/:id`} render={(props) =>
            <ReadArticle {...props} />}
          />
          <Route path={path} render={() =>
            <Journals journals={this.state.journals}/>}
          />
        </Switch>
      </div>
    )
  }
}


export default Archive
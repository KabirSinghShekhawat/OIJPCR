import React, { Component } from 'react'
import axios from 'axios'
import {
  Switch,
  Route,
} from 'react-router-dom'
import ArticleCard from '../Home/ArticleCard'
import ReadArticle from './ReadArticle'

class ArticleList extends Component {
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
          <Route exact path={`${path}/journals/:urlSlug/:id`} render={(props) =>
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

function Journals ({ journals }) {
  let journalList
  if (typeof journals == 'undefined' || journals.length === 0)
    journalList = '...Loading'
  else journalList = createJournals(journals)

  return (
    <div className="h-full md:mx-16 mx-4">
      <div className="flex flex-col h-full items-center py-2 my-4 w-full editor">
        {journalList}
      </div>
    </div>
  )
}

function createJournals (journals) {
  return journals.map((article) => {
    const articleProps = { id: article._id, ...article }
    return <ArticleCard {...articleProps} key={article._id}/>
  })
}

export default ArticleList
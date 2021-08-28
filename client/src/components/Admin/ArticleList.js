import React, { Component } from 'react'
import axios from 'axios'
import {
  Switch,
  Route,
} from 'react-router-dom'
import ArticleCardAdmin from '../Admin/Cards/ArticleCardAdmin'
import ReadArticle from '../../pages/Articles/ReadArticle'
import config from '../../config/config'
import { UserContext } from '../../UserContext'

class ArticleList extends Component {
  static contextType = UserContext
  constructor (props) {
    super(props)
    this.state = {
      journals: [],
      token: ''
    }
  }

  async componentDidMount () {
    try {

      const { data } = await axios.get(`${config.host}journals`)
      this.setState({ journals: data, token: this.context?.token })
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
  if (typeof journals == 'undefined')
    journalList = '...Loading'
  else if (journals.length === 0)
    journalList = 'No Articles Found'
  else journalList = createJournals(journals)

  return (
    <div className="h-full md:mx-4">
      <div className="flex flex-row flex-wrap h-full justify-evenly py-2 my-4 w-full editor">
        {journalList}
      </div>
    </div>
  )
}

function createJournals (journals) {
  return journals.map((article) => {
    const articleProps = {
      id: article._id,
      coverPhoto: article.cover,
      cname: {
        container: '',
        button: 'mt-10 flex flex-wrap',
      },
      path: '/admin',
      ...article,
    }
    return <ArticleCardAdmin {...articleProps} key={article._id}/>
  })
}

export default ArticleList
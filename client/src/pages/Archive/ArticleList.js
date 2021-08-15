import React, { Component } from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import ReadArticle from '../../pages/Articles/ReadArticle'
import ArticleCard from '../../components/Cards/ArticleCard'

class ArticleList extends Component {
  render () {
    const { path } = this.props
    return (
      <div className="flex-grow">
        <Switch>
          <Route path={path} render={(routeProps) =>
            <Journals journals={this.props.journals} {...routeProps}/>}
          />

          <Route exact path={`${path}/journals/:urlSlug/:id`}
                 component={DisplayArticle}
          />
        </Switch>
      </div>
    )
  }
}

function Journals ({ journals }) {
  let journalList
  if (!journals)
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
      ...article,
    }
    return <ArticleCard {...articleProps} key={article._id}/>
  })
}

function DisplayArticle (props) {
  const { urlSlug, id } = props.match.params
  return (
    <ReadArticle
      urlSlug={urlSlug}
      id={id}
    />
  )
}

export default ArticleList
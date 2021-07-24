import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import FlexContainer from '../utils/FlexContainer'
import NewArticle from './NewArticle'
import EditArticle from './EditArticle'
import ArticleList from './ArticleList'

class Admin extends Component {
  render () {
    const { path } = this.props.match
    const NewArticleProps = {
      initialValue: 'initial Content',
      author: 'Admin',
      title: 'Title',
      slug: 'Slug',
      volume: 1,
    }
    return (
      <FlexContainer cname="m-8">
        {/*/admin/:urlSlug/:id*/}
        <Switch>
          <Route exact path={`${path}/:urlSlug/:id`}
                 render={(props) => <EditArticle {...props} />}
          />
          <Route exact path="/admin/new">
            <NewArticle {...NewArticleProps} />
          </Route>
          <Route exact path="/admin/list"
                 render={(props) => <ArticleList {...props} />}
          />

          <Route exact path="/admin/*"
                 render={() => <Redirect to="/notFound"/>}
          />
        </Switch>
      </FlexContainer>
    )
  }
}

export default Admin
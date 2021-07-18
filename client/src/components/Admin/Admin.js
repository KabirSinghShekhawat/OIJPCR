import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import FlexContainer from '../utils/FlexContainer'
import NewArticle from './NewArticle'
import EditArticle from './EditArticle'

class Admin extends Component {
  render () {
    const { path } = this.props.match
    console.log(path)
    const NewArticleProps = {
      initialValue: 'initial Content',
      author: 'Admin',
      title: 'Title',
      slug: "Slug",
      volume: 1,
    }
    return (
      <FlexContainer cname="m-8">
          <Switch>
            {/*/admin/:urlSlug/:id*/}
            <Route exact path={`${path}/:urlSlug/:id`} render={(props) =>
              <EditArticle {...props} />}
            />
            <Route exact path="/admin/new">
              <NewArticle {...NewArticleProps} />
            </Route>
          </Switch>
      </FlexContainer>
    )
  }
}

export default Admin
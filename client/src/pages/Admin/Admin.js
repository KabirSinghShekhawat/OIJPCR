import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import FlexContainer from '../../components/utils/FlexContainer'
import NewArticle from './Article/NewArticle'
import EditArticle from './Article/EditArticle'
import ArticleList from '../../components/Admin/ArticleList'
import NewVolume from './Volume/NewVolume'
import AdminNav from './AdminNav'
import VolumeList from '../../components/Admin/VolumeList'
import EditVolume from './Volume/EditVolume'
import NewAuthor from './Author/NewAuthor'
import AuthorList from './Author/AuthorList'

class Admin extends Component {
  render () {
    const { path } = this.props.match
    const NewArticleProps = {
      initialValue: 'initial Content',
      author: 'Admin',
      title: 'Title',
      slug: 'Slug',
      volume: 1,
      cover: 'http://localhost:5000/editor/images/article_cover_fallback.jpg'
    }
    return (
      <>
        <AdminNav/>
        <FlexContainer cname="m-2">
          {/*/admin/:urlSlug/:id*/}
          <Switch>
            <Route exact path="/admin/new/volume">
              <NewVolume />
            </Route>

            <Route exact path="/admin/list/volume"
                   render={(props) => <VolumeList {...props} />}
            />

            <Route exact path="/admin/list/volume/:volume"
                   render={(props) => <EditVolume {...props} />}
            />

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
      </>
    )
  }
}

export default Admin
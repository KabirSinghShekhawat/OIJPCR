import React, { useContext } from 'react'
import axios from 'axios'
import { Redirect, Route, Switch } from 'react-router-dom'

import FlexContainer from '../../components/utils/FlexContainer'
import AdminNav from './AdminNav'

import NewArticle from './Article/NewArticle'
import EditArticle from './Article/EditArticle'
import ArticleList from '../../components/Admin/ArticleList'

import NewVolume from './Volume/NewVolume'
import EditVolume from './Volume/EditVolume'
import VolumeList from '../../components/Admin/VolumeList'
import { UserContext } from '../../UserContext'
import config from '../../config/config'

const Admin = (props) => {
  const { value, setValue } = useContext(UserContext)

  const { path } = props.match

  const Logout = async () => {
    const headers = {
      'Authorization': value ? `Bearer ${value}` : null,
      'Content-Type': 'application/json',
    }

    const { data } = await axios.post(`${config.host}admin/logout`, {}, {
      withCredentials: true,
      headers: headers,
    })

    if (data.status === 'success') setValue('')
  }

  const NewArticleProps = {
    initialValue: 'initial Content',
    author: 'Admin',
    title: 'Title',
    slug: 'Slug',
    volume: 1,
    cover: 'http://localhost:5000/editor/images/article_cover_fallback.jpg',
  }

  if (!value)
    return <Redirect to="/login"/>

  return (
    <>
      <AdminNav/>
      <div>
        <button onClick={Logout}>Logout</button>
      </div>
      <FlexContainer cname="m-2">
        {/*/admin/:urlSlug/:id*/}
        <Switch>
          <Route exact path="/admin/new/volume">
            <NewVolume/>
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

export default Admin
import React, { useContext, useEffect } from 'react'
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
import { NewArticleProps } from './Article/DefaultData'


const Admin = (props) => {
  const { token, setToken } = useContext(UserContext)

  useEffect(() => {
    const authToken = localStorage.getItem("jwt")
    setToken(authToken)
  }, [token, setToken])

  const Logout = async () => {
    const headers = {
      'Authorization': token ? `Bearer ${token}` : null,
      'Content-Type': 'application/json',
    }

    const { data } = await axios.get(`${config.host}admin/logout`,  {
      withCredentials: true,
      headers: headers,
    })

    if (data.status === 'success') {
      localStorage.setItem("jwt", "")
      setToken('')
    }
  }

  if (!token)
    return <Redirect to="/login"/>

  const { path } = props.match

  return (
    <>
      <AdminNav
        token={token}
        Logout={Logout}
      />
      <FlexContainer cname="m-2">
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
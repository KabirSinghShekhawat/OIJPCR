import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Archive from '../../pages/Archive'
import SubmitArticle from '../../pages/SubmitArticle'
import React from 'react'

export default function NavController () {
  return (
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route path="/archive" render={(props) =>
        <Archive {...props} />}
      />
      <Route exact path="/submitArticle">
        <SubmitArticle/>
      </Route>
      <Route path="*" render={() =>
        <Redirect to="/notFound" />
      }
      />
    </Switch>
  )
}

import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import About from '../About/About'
import Archive from '../Articles/Archive'
import SubmitArticle from '../SubmitArticle/SubmitArticle'
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

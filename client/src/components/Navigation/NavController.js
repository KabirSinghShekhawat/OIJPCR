import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Archive from '../../pages/Archive/Archive'
import SubmitArticle from '../../pages/SubmitArticle'
import React from 'react'

export default function NavController () {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/about" component={About}/>

      <Route path="/archive" render={(props) =>
        <Archive {...props} />}
      />

      <Route exact path="/submitArticle" component={SubmitArticle} />

      <Route path="*" render={() =>
        <Redirect to="/notFound" />
      }/>
    </Switch>
  )
}

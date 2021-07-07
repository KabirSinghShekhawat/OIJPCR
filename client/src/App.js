import './App.css'
import { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Nav from './components/Nav'
import About from './components/About'
import Archive from './components/Archive'
import Podcast from './components/Podcast'
import SubmitArticle from './components/SubmitArticle'

class App extends Component {
  render () {
      return (
        <Router>
            <Nav />
            <NavController />
        </Router>
      )
  }
}

function NavController() {
  return (
    <>
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/archive">
          <Archive />
        </Route>
        <Route exact path="/podcast">
          <Podcast />
        </Route>
        <Route exact path="/submitArticle">
          <SubmitArticle />
        </Route>
      </Switch>
    </>
  )
}

export default App

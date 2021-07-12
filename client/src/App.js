import './App.css'
import { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Nav from './components/Nav'
import About from './components/About'
import Archive from './components/Archive'
import SubmitArticle from './components/SubmitArticle'
import Home from './components/Home/Home'
import Footer from './components/Footer'

class App extends Component {
  render () {
      return (
        <Router>
          <div className="flex flex-col h-screen">
            <Nav />
            <NavController />
            <Footer/>
          </div>
        </Router>
      )
  }
}

function NavController() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/archive">
          <Archive />
        </Route>
        <Route exact path="/submitArticle">
          <SubmitArticle />
        </Route>
      </Switch>
    </>
  )
}

export default App

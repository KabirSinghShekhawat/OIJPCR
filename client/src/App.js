import { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './App.css'
import Nav from './components/Nav'
import About from './components/About'
import Archive from './components/Archive'
import SubmitArticle from './components/SubmitArticle'
import Home from './components/Home/Home'
import Footer from './components/Footer'
import Editor from './EditorJS/Editor'


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
        <Route path="/archive" render={(props) =>
          <Archive {...props} /> }
        />
        <Route exact path="/submitArticle">
          <SubmitArticle />
        </Route>
        <Route exact path="/admin">
          <Editor/>
        </Route>
      </Switch>
    </>
  )
}

export default App

import { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './App.css'
import Nav from './components/Navigation/Nav'
import About from './components/About/About'
import Archive from './components/Articles/Archive'
import SubmitArticle from './components/SubmitArticle/SubmitArticle'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import NewArticle from './components/Admin/NewArticle'


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
        <Route path="/admin">
          <NewArticle/>
        </Route>
      </Switch>
    </>
  )
}

export default App

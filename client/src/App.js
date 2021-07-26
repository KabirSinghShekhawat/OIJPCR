import React, { Component } from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'

import './App.css'
import Nav from './components/Navigation/Nav'
import Footer from './components/Footer/Footer'
import NavController from './components/Navigation/NavController'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          {/*404*/}
          <Route exact path="/notFound">
            <NotFound msg="could not find that"/>
          </Route>

          {/*Admin*/}
          <Route path="/admin" render={(props) => <Admin {...props} />} />

          {/*App*/}
          <div className="flex flex-col h-screen">
            <Nav/>
            <NavController/>
            <Footer/>
          </div>
        </Switch>
      </Router>
    )
  }
}

export default App

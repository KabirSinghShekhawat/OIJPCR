import React, { Component, useState } from 'react'
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom'

import { UserContext } from './UserContext'

import './App.css'
import Nav from './components/Navigation/Nav'
import Footer from './components/Footer/Footer'
import NavController from './components/Navigation/NavController'
import Admin from './pages/Admin/Admin'
import Login from './pages/Admin/Auth/Login'
import NotFound from './pages/NotFound'

const App = () => {
  const [value, setValue] = useState('')

  return (
    <Router>
      <Switch>
        {/*404*/}
        <Route exact path="/notFound">
          <NotFound msg="could not find that"/>
        </Route>

        {/*Admin*/}
        <UserContext.Provider value={{ value, setValue }}>
          <Route path="/admin" render={(props) => <Admin {...props} />}/>
          <Route path="/login" component={Login}/>
        </UserContext.Provider>
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

export default App

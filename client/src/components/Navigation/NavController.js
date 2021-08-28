import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Archive from '../../pages/Archive/Archive'
import SubmitArticle from '../../pages/SubmitArticle'
import React from 'react'
import Nav from './Nav'
import Footer from '../Footer/Footer'


const NavController = () => {
  return (
    <div className="flex flex-col h-screen">
      <Nav/>
      <Switch>

        <Route exact path="/about" render={() => <About/>}/>

        <Route path="/archive"
               render={(props) => <Archive {...props}/>}
        />

        <Route exact path="/submitArticle"
               render={() => <SubmitArticle/>}
        />

        <Route exact path="/" render={() => <Home/>}/>

        <Route path="*" >
          <Redirect to="/notFound"/>
        </Route>
      </Switch>
      <Footer/>
    </div>
  )
}

export default NavController
import { Component } from 'react'
import { Header } from './Header'
import { LeftGrid } from './LeftGrid'
import { Topics } from './SideBar/Topics'
import { Popular } from './SideBar/Popular'
import { SubmitArticleForm } from './SideBar/SubmitArticleForm'

class Home extends Component {
  render () {
    return (
      <div className="flex-grow">
        <Header/>
        <div className="flex flex-col md:flex-row px-4 mx-4">
          <LeftGrid />
          <div className="flex flex-col lg:w-1/4 md:w-1/3 w-full mt-4">
            <Topics />
            <Popular />
            <SubmitArticleForm />
          </div>
        </div>
      </ div>
    )
  }
}

export default Home
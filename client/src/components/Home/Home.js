import { Component } from 'react'
import Header from './Header'
import LeftGrid from './LeftGrid'
import Topics from './SideBar/Topics'
import Popular from './SideBar/Popular'
import SubmitArticleForm from './SideBar/SubmitArticleForm'
import Podcast from './Podcast/Podcast'

class Home extends Component {
  render () {
    return (
      <div className="flex-grow">
        <Header/>
        <Main/>
        <Podcast/>
      </div>
    )
  }
}

function Main () {
  return (
    <div className="flex flex-col md:flex-row px-4 mx-4">
      <LeftGrid/>
      <SideBar/>
    </div>
  )
}

function SideBar () {
  return (
    <div className="flex flex-col lg:w-1/4 md:w-1/3 w-full mt-4">
      <Topics/>
      <Popular/>
      <SubmitArticleForm/>
    </div>
  )
}

export default Home
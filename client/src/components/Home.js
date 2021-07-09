import { Component } from 'react'
import alertCircle from './alert-circle.svg'

class Home extends Component {
  render () {
    return (
      <>
        <Header/>
      </>
    )
  }
}

function Header() {
  const headerText = (
    <h1 className="text-2xl md:text-5xl font-bold">
      Online Indian Journal <br/> of Peace and Conflict Resolution
    </h1>
  )

  const aboutJournal =
    'The Journal will endeavour to highlight and discuss conflict issues pertinent' +
    ' to the peace and stability of the sub-continent and will develop a forum for' +
    ' networking, learning and information sharing to evolve innovative methods for' +
    ' managing and resolving conflicts.'

  return (
    <div className="header-home primary-color-bg flex-grow">
      <div className="p-2 max-w-prose flex-1">
        {headerText}
      </div>
      <div className="p-2 flex-1 max-w-prose">
        <p className="md:text-xl text-sm">
          {aboutJournal}
        </p>
        <button className="mt-4 sm:mt-4 py-2 px-4 max-w-max rounded-lg bg-black">
          <img src={alertCircle} className="mr-2 inline" alt=" " /> Learn More
        </button>
      </div>
    </div>
  )
}

export default Home
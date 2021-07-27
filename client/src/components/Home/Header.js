import {Link} from 'react-router-dom'
import alertCircle from '../../assets/alert-circle.svg'

export default function Header () {
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
    <div className="header-home primary-color-bg ">
      <div className="p-2 max-w-prose flex-1">
        {headerText}
      </div>
      <div className="p-2 flex-1 max-w-prose">
        <p className="md:text-xl text-sm mb-4">
          {aboutJournal}
        </p>
        <Link
          className="py-2 px-4 max-w-max rounded-lg bg-black"
          to="/about"
        >
          <img src={alertCircle} className="mr-2 mb-1 inline" alt="alert icon"/>
          Learn More
        </Link>
      </div>
    </div>
  )
}
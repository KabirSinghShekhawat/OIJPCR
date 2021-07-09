import { Component } from 'react'
import logo from './logo.svg'
import logo_mobile from './logo_mobile.svg'
import { Link } from 'react-router-dom'

class Nav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isHidden: true
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick () {
    this.setState((prevState) => ({
      isHidden: !prevState.isHidden
    }))
  }

  render () {
    const Items = [
      { url: '/', value: 'Home' },
      { url: '/about', value: 'About' },
      { url: '/archive', value: 'Archive' },
      // { url: '/podcast', value: 'Podcast' },
      { url: '/submitArticle', value: 'Submit Article' },
    ]

    return (
      <>
        <header className="lg:px-16 sm:px-6 px-4 shadow-lg md:shadow-none bg-white flex flex-wrap items-center lg:py-1 py-2">
          <Brand/>
          <MenuToggle />
          <input className="hidden" type="button" id="menu-toggle" onClick={this.handleMenuClick} />
          <div
            className={`${this.state.isHidden ? 'hidden' : ''} lg:flex lg:items-center lg:w-auto w-full`}
            id="menu"
          >
            <NavLinks navItems={Items}/>
          </div>

        </header>
      </>
    )
  }
}

function Brand () {
  return (
    <div className="flex-1 flex justify-between items-center md:mt-2">
      <Link to="/">
        <img className="hidden sm:inline sm:w-14 sm:h-14 w-10 h-10 mr-2" src={logo} alt="OIJPCR logo"/>
        <img className="inline sm:hidden sm:w-14 sm:h-14 w-10 h-10 mr-2" src={logo_mobile} alt="OIJPCR logo"/>
        <label className="sm:hidden font-black text-lg">OIJPCR</label>
      </Link>
    </div>
  )
}

function NavLinks ({ navItems }) {
  const links = navItems.map((item, index) => {
    return <NavLink key={index} url={item.url} value={item.value}/>
  })

  return (
    <nav>
      <ul className="lg:flex items-center justify-between text-base text-black-900 pt-4 lg:pt-0">
        {links}
      </ul>
    </nav>
  )
}

function NavLink ({ url, value }) {
  return (
    <li>
      <Link
        className="lg:p-4 py-3 px-0 block border-b-2 text-semibold text-xl border-transparent hover:border-indigo-400"
        to={url}
      >
        {value}
      </Link>
    </li>
  )
}

function MenuToggle () {
  return (
    <>
      <label htmlFor="menu-toggle"
             className=" lg:hidden block cursor-pointer"
      >
        <svg className="fill-current text-gray-900 "
             xmlns="http://www.w3.org/2000/svg" width="30" height="30"
             viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </label>
    </>
  )
}

export default Nav
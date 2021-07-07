import { Component } from 'react'
import logo from './logo.svg'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render () {
    const Items = [
      { url: '/about', value: 'About' },
      { url: '/archive', value: 'Archive' },
      { url: '/podcast', value: 'Podcast' },
      { url: '/submitArticle', value: 'Submit Article' },
    ]

    return (
      <>
        <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
          <Brand/>
          <MenuToggle/>

          <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
            <NavLinks navItems={Items}/>
          </div>

        </header>
      </>
    )
  }
}

function Brand () {
  return (
    <div className="flex-1 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="OIJPCR logo"/>
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
      <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
        {links}
      </ul>
    </nav>
  )
}

function NavLink ({ url, value }) {
  return (
    <li>
      <Link
        className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
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
             className="pointer-cursor lg:hidden block"
      >
        <svg className="fill-current text-gray-900"
             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle"/>
    </>
  )
}

export default Nav
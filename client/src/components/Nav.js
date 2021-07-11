import { Component } from 'react'
import logo from '../assets/logo.svg'
import logo_mobile from '../assets/logo_mobile.svg'
import { Link } from 'react-router-dom'

export const urlLinks = [
  { url: '/', value: 'Home' },
  { url: '/about', value: 'About' },
  { url: '/archive', value: 'Archive' },
  { url: '/submitArticle', value: 'Submit Article' },
]

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHidden: true,
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick () {
    this.setState((prevState) => ({
      isHidden: !prevState.isHidden,
    }))
  }

  render () {
    let toggleClass = this.state.isHidden ? 'hidden' : ''
    toggleClass += ' lg:flex lg:items-center lg:w-auto w-full'

    return (
      <>
        <header className="header-nav">
          <Brand/>
          <MenuToggle/>
          <input className="hidden" type="button" id="menu-toggle" onClick={this.handleMenuClick}/>
          <div
            className={toggleClass}
            id="menu"
          >
            <NavLinks navItems={urlLinks}/>
          </div>
        </header>
      </>
    )
  }
}

function Brand () {
  return (
    <div className="brand-container">
      <Link to="/">
        <img className="hidden sm:inline brand-logo" src={logo} alt="OIJPCR logo"/>
        <img className="inline sm:hidden brand-logo" src={logo_mobile} alt="OIJPCR logo"/>
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
      <ul className="nav-link-ul">
        {links}
      </ul>
    </nav>
  )
}

function NavLink ({ url, value }) {
  return (
    <li>
      <Link
        className="nav-link"
        to={url}
      >
        {value}
      </Link>
    </li>
  )
}

function MenuToggle () {
  const svg = {
    path: 'M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z',
    xmlns: 'http://www.w3.org/2000/svg',
    height: 30,
    width: 30,
    viewBox: '0 0 20 20',
  }

  return (
    <label
      htmlFor="menu-toggle"
      className=" lg:hidden block cursor-pointer"
    >
      <svg className="fill-current text-gray-900 "
           xmlns={svg.xmlns}
           width={svg.width}
           height={svg.height}
           viewBox={svg.viewBox}
      >
        <title>menu</title>
        <path d={svg.path}/>
      </svg>
    </label>
  )
}

export default Nav
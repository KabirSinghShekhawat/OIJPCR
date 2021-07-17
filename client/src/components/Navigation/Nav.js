import { Component } from 'react'
import logo from '../../assets/logo.svg'
import logo_mobile from '../../assets/logo_mobile.svg'
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
      <Header cname="header-nav">
        <Brand logo={logo} logo_mobile={logo_mobile} brandName="OIJPCR"/>
        <MenuToggle MenuClick={this.handleMenuClick}/>
        <NavMenu cname={toggleClass}>
          <NavLinks navItems={urlLinks}/>
        </NavMenu>
      </Header>
    )
  }
}

function Header (props) {
  return (
    <header className={props.cname}>
      {props.children}
    </header>
  )
}

// id="menu"
function NavMenu (props) {
  return (
    <div className={props.cname}>
      {props.children}
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

function MenuToggle ({ MenuClick }) {
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
      <input className="hidden" type="button" id="menu-toggle" onClick={MenuClick}/>
    </label>
  )
}

function Brand ({ logo, logo_mobile, brandName }) {
  const BrandProps = {
    altText: `${brandName} logo`,
    brandLogoCN: 'sm:w-14 sm:h-14 w-16 h-16 mr-2',
  }
  return (
    <div className="flex-1 flex justify-between items-center md:mt-2">
      <Link to="/">
        <BrandLogo {...BrandProps} logo={logo} hidden={true} />
        <BrandLogo {...BrandProps} logo={logo_mobile} hidden={false} />
        <label className="sm:hidden font-black text-lg">{brandName}</label>
      </Link>
    </div>
  )
}

function BrandLogo (props) {
  const { brandLogoCN, logo, altText, hidden } = props
  let cname = brandLogoCN
  cname += hidden ? ' hidden sm:inline' : ' inline sm:hidden'
  return (
    <img className={cname} src={logo} alt={altText}/>
  )
}

export default Nav
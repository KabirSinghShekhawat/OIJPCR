import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { urlLinks as NavLinks } from './Nav'

const PodcastLinks = [
  { url: '#', value: 'Spotify' },
  { url: '#', value: 'Apple Podcasts' },
  { url: '#', value: 'PocketCast' },
  { url: '#', value: 'Google Podcasts' },
  { url: '#', value: 'RadioPublic' },
  { url: '#', value: 'Overcast' },
]

export default function Footer () {
  return (
    <>
      <footer className="bg-black p-4 flex flex-col-reverse md:flex-row text-gray-400">
        <CopyrightLeftPanel />

        <div className="footer-nav-container">
          <FooterLinks links={NavLinks} heading={'Navigate'}/>
          <FooterLinks links={PodcastLinks} heading={'Podcast'}/>
        </div>
      </footer>
    </>
  )
}

function CopyrightLeftPanel() {
  return (
    <div className="copyright-container">
      <img src={logo} alt="OIJPCR logo" className="w-14 h-14 md:w-20 md:h-20"/>
      <p className="mt-2 md:mt-6">&copy; Copyright 2020-21</p>
      <p>Online Indian Journal for Peace and Conflict Resolution</p>
    </div>
  )
}

function FooterLinks ({ links, heading }) {
  return (
    <>
      <div className="flex-1 md:p-2 py-2 text-center">
        <h4 className="footer-links-heading">{heading}</h4>
        <ul className="footer-links">
          <LinkItems links={links} />
        </ul>
      </div>
    </>
  )
}

function LinkItems({links}) {
  return (
    links.map((item, index) => {
      return <NavLink key={index} url={item.url} value={item.value} />
    })
  )
}

function NavLink ({ url, value }) {
  return (
    <li>
      <Link to={url}>
        {value}
      </Link>
    </li>
  )
}

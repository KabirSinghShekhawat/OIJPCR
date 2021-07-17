import { Link } from 'react-router-dom'

export function LinkItems ({ links, cname = '', newTab }) {
  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} cname={cname} newTab={newTab}/>
    })
  )
}

function NavLink ({ url, value, cname = '', newTab }) {
  return (
    <li className={cname}>
      {
        newTab ?
          <a href={url} target="_blank" rel="noreferrer">
            {value}
          </a>
          :
          <Link to={url}>
            {value}
          </Link>
      }

    </li>
  )
}

import { Link } from 'react-router-dom'

export function LinkItems({links, cname=""}) {
  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} cname={cname} />
    })
  )
}

function NavLink ({ url, value, cname='' }) {
  return (
    <li className={cname}>
      <Link to={url}>
        {value}
      </Link>
    </li>
  )
}

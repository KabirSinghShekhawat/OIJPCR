import { Link } from 'react-router-dom'

export const urlLinks = [
  { url: '/admin', value: 'Admin Home' },
  { url: '/admin/new', value: 'New Article' },
  { url: '/admin/new/volume', value: 'New Volume' },
  { url: '/admin/list/volume', value: 'All Volumes' },
  { url: '/admin/list', value: 'All Articles' },
]

function AdminNav () {
  return (
    <div className="w-full bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex flex-row flex-wrap justify-evenly text-black text-lg">
        <LinkItems links={urlLinks}/>
      </div>
    </div>
  )
}

function LinkItems ({ links }) {
  const styles = {
    padding: 'lg:p-4 py-3 px-0',
    border: 'border-b-4 border-transparent hover:border-gray-50 ',
    font: 'font-semibold text-xl text-gray-50 ',
    display: 'block cursor-pointer'
  }

  let cname = ''
  for (let style in styles) {
    cname = cname + styles[style] + ' '
  }

  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} cname={cname}/>
    })
  )
}

function NavLink ({ url, value, cname = '' }) {
  return (
    <Link className={cname} to={url}>
      {value}
    </Link>
  )
}

export default AdminNav
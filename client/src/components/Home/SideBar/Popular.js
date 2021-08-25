import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config/config'
import slugify from 'slugify'

// const MostPopular = [
//   { url: '#', title: 'Role of Police in Conflict Resolution', author: 'Jyoti M. Pathania', volume: 1 },
//   { url: '#', title: 'Economics and the Resolution of Conflicts', author: 'Jyoti M. Pathania', volume: 2 },
//   { url: '#', title: 'Role of Women in Conflict Resolution: The Durga Way', author: 'Jyoti M. Pathania', volume: 3 },
//   { url: '#', title: 'Politics: An Instrument to Resolve Conflicts', author: 'Jyoti M. Pathania', volume: 4 },
//   { url: '#', title: 'Editor\'s Note', author: 'Jyoti M. Pathania', volume: 5 },
// ]

const Popular = () => {
  const [mostPopular, setPopular] = useState([])

  useEffect(() => {
    async function fetchPopular () {
      return await axios.get(`${config.host}journals/home/5`)
    }

    fetchPopular().then((result) => {
      setPopular(result?.data)
    })
  }, [])

  return (
    <div className="p-2 mx-1 mb-6 md:mb-0 mt-4 rounded-lg shadow-xl border">
      <p className="text-3xl text-gray-900 text-center font-bold my-4 mx-2">Most Popular</p>
      <div className="flex flex-col justify-center">
        <LinkItems links={mostPopular}/>
      </div>
    </div>
  )
}

function LinkItems ({ links }) {
  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} index={index}/>
    })
  )
}

function NavLink (props) {
  const {
          author,
          volume,
          title,
          slug,
          index,
          _id: id,
        } = props
  const urlSlug = slugify(title)
  console.log(id)
  const url = `/archive/${urlSlug}/${id}`
  return (
    <div className="flex flex-row flex-1 my-2 mr-4 pb-2 border-b-2  border-transparent hover:border-indigo-400 ">
      <div className="w-1/4 font-bold text-5xl text-right pr-2">
        {index + 1}
      </div>
      <div className="flex-1 w-3/4">
        <p className="text-sm font-semibold text-gray-900">
          <Link to={url}> {title} </Link>
        </p>
        <p className="text-gray-500 text-xs font-medium">By {author} {String.fromCharCode(183)} Vol {volume}</p>
      </div>
    </div>
  )
}

export default Popular
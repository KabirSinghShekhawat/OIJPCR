import { Link } from 'react-router-dom'

const MostPopular = [
  { url: '#', value: 'Role of Police in Conflict Resolution', author: 'Jyoti M. Pathania', vol: 1 },
  { url: '#', value: 'Economics and the Resolution of Conflicts', author: 'Jyoti M. Pathania', vol: 1 },
  { url: '#', value: 'Role of Women in Conflict Resolution: The Durga Way', author: 'Jyoti M. Pathania', vol: 1 },
  { url: '#', value: 'Politics: An Instrument to Resolve Conflicts', author: 'Jyoti M. Pathania', vol: 1 },
  { url: '#', value: 'Editor\'s Note', author: 'Jyoti M. Pathania', vol: 1 },
]

export default function Popular () {
  return (
    <div className="p-2 mx-1 mb-6 md:mb-0 mt-4 rounded-lg shadow-xl border">
      <p className="text-3xl text-gray-900 text-center font-bold my-4 mx-2">Most Popular</p>
      <div className="flex flex-col justify-center">
          <LinkItems links={MostPopular}/>
      </div>
    </div>
  )
}

function LinkItems ({ links }) {
  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} index={index} />
    })
  )
}

function NavLink ({ url, value, author, vol, index }) {
  return (
    <div className="flex flex-row flex-1 my-2 mr-4 pb-2 border-b-2  border-transparent hover:border-indigo-400 ">
      <div className="w-1/4 font-bold text-5xl text-right pr-2">
        {index+1}
      </div>
      <div className="flex-1 w-3/4">
        <p className="text-sm font-semibold text-gray-900">
          <Link to={url}> {value} </Link>
        </p>
        <p className="text-gray-500 text-xs font-medium">By {author} {String.fromCharCode(183)} Vol {vol}</p>
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom'
import alertCircle from '../../../assets/alert-circle.svg'

function CardButton (props) {
  const { slug, id, path, cname } = props
  const pathUrl = path ? path : '/archive'
  return (
    <div className={cname}>
      <Link
        to={`/archive/${slug}/${id}`}
        className="my-4 sm:my-4 py-2 px-4 mr-4 max-w-max rounded-lg bg-black text-white"
      >
        <img src={alertCircle} className="mr-2 mb-1 inline" alt="alert icon"/>
        Read More
      </Link>
      {
        path
        &&
        <Link
          to={`${pathUrl}/${slug}/${id}`}
          className="my-4 sm:my-4 py-2 px-4 max-w-max rounded-lg bg-black text-white"
        >
          <img src={alertCircle} className="mr-2 mb-1 inline" alt="alert icon"/>
          Edit
        </Link>
      }
    </div>
  )
}

export default CardButton
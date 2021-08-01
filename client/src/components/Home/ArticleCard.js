import alertCircle from '../../assets/alert-circle.svg'
import dollar from '../../assets/stockPhotos/r1_c1.jpg'
import { Link } from 'react-router-dom'
import slugify from 'slugify'

export default function ArticleCard (props) {
  const {
          coverPhoto,
          author,
          volume,
          title,
          slug,
          cname,
          id,
          path,
        } = props
  const authorText =
          `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  const defaultPhoto = coverPhoto ? coverPhoto : dollar
  return (
    <div className={`article-card-container ${cname}`}>
      <CardCover coverPhoto={defaultPhoto} authorText={authorText}/>
      <CardContent title={title} slug={slug} id={id} path={path}/>
    </div>
  )
}

function CardCover ({ coverPhoto, authorText }) {
  return (
    <>
      <img className="h-64 w-full object-cover hover:bg-gray"
           src={coverPhoto}
           alt="ArticleList cover"
      />
      <p className="article-card-author">{authorText}</p>
    </>
  )
}

function CardContent ({ title, slug, id, path }) {
  const urlSlug = slugify(slug)
  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="article-card-title"> {title} </div>
      <p className="article-card-slug"> {slug} </p>
      <div>
        <CardButton text="Read More" slug={urlSlug} id={id} path={path}/>
      </div>
    </div>
  )
}

function CardButton ({ slug, id, path }) {
  const pathUrl = path ? path : '/archive'
  return (
    <>
      <Link
        to={`/archive/${slug}/${id}`}
        className="my-4 sm:my-4 py-2 px-4 mr-4 max-w-max rounded-lg bg-black text-white"
      >
        <img src={alertCircle} className="mr-2 mb-1 inline" alt="alert icon"/>
        Read More
      </Link>
      {
        path && <Link
          to={`${pathUrl}/${slug}/${id}`}
          className="my-4 sm:my-4 py-2 px-4 max-w-max rounded-lg bg-black text-white"
        >
          <img src={alertCircle} className="mr-2 mb-1 inline" alt="alert icon"/>
          Edit
        </Link>
      }

    </>
  )
}

import dollar from '../../assets/stockPhotos/r1_c1.jpg'
import slugify from 'slugify'
import { Link } from 'react-router-dom'
import alertCircle from '../../assets/alert-circle.svg'

function ArticleCardFullWidth (props) {
  const {
          coverPhoto,
          author,
          volume,
          title,
          slug,
        } = props

  const { cname, id, path } = props
  const authorText =
          `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  const defaultPhoto = coverPhoto ? coverPhoto : dollar
  return (
    <div className='h-auto rounded-md overflow-hidden shadow-lg m-4 lg:h-auto md:col-span-full'>
      <CardCover coverPhoto={defaultPhoto} authorText={authorText}/>
      <CardContent title={title} slug={slug} id={id} path={path} cname={cname.button} />
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

function CardContent ({ title, slug, id, path, cname }) {
  const start = 0,
        end = slug.length >= 250 ? 250 : slug.length
  const aboutSlug = slug.slice(start, end)
  const urlSlug = slugify(slug)
  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="font-bold text-4xl text-gray-600 mb-8 text-center"> {title} </div>
      <p className="font-normal text-gray-700 text-lg mb-8 text-center"> {aboutSlug} </p>
      <div>
        <CardButton text="Read More" slug={urlSlug} id={id} path={path} cname={cname} />
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

export default ArticleCardFullWidth;
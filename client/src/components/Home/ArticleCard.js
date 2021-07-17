import alertCircle from '../../assets/alert-circle.svg'
import dollar from '../../assets/r1_c1.jpg'
import { Link } from 'react-router-dom'
import slugify from 'slugify'

export default function ArticleCard ({
  coverPhoto,
  author,
  volume,
  title,
  slug,
  cname,
  id,
}) {
  const authorText =
    `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  return (
    <div className={`article-card-container ${cname}`}>
      <CardCover coverPhoto={coverPhoto ? coverPhoto : dollar} authorText={authorText} />
      <CardContent title={title} slug={slug} id={id} />
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

function CardContent ({ title, slug, id }) {
  const urlSlug = slugify(slug)
  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="article-card-title"> {title} </div>
      <p className="article-card-slug"> {slug} </p>
      <Link
        to={`/archive/journals/${urlSlug}/${id}`}
        className="mt-4 sm:mt-4 py-2 px-4 max-w-max rounded-lg bg-black text-white"
      >
        <img src={alertCircle} className="mr-2 mb-1 inline" alt="alert icon"/>
        Read More
      </Link>
    </div>
  )
}
import dollar from '../../assets/stockPhotos/r1_c1.jpg'
import CardButton from '../utils/CardButton'
import slugify from 'slugify'

export default function ArticleCard (props) {
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
    <div className={`article-card-container min-40`}>
      <CardCover coverPhoto={defaultPhoto} authorText={authorText}/>
      <CardContent title={title} slug={slug} id={id} path={path} cname={cname} />
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
          /**
           * slug length limit is 250 for optimal viewing.
           * url slug limit will be enforced later
           * changing urls always causes trouble (-_-).
           */
  const aboutSlug = slug.slice(start, end)
  const urlSlug = slugify(slug)

  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="article-card-title"> {title} </div>
      <p className="article-card-slug"> {aboutSlug} </p>
      <div>
        <CardButton text="Read More" slug={urlSlug} id={id} path={path} cname={cname}/>
      </div>
    </div>
  )
}



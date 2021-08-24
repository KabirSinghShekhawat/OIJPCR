import dollar from '../../assets/stockPhotos/r1_c1.jpg'
import slugify from 'slugify'
import { Link } from 'react-router-dom'

export default function ArticleCardSmall (props) {
  const { slug, id } = props

  const urlSlug = slugify(slug.slice(0, 40))
  // const url = `/archive/${urlSlug}/${id}`
  const url = {
    slug: urlSlug,
    id: id
  }


  function handleClick () {
    props.handleClick(url)
  }

  const {
          coverPhoto,
          author,
          volume,
          title,
        } = props

  const authorText =
          `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  const defaultPhoto = coverPhoto ? coverPhoto : dollar

  return (
    <div className={`md:max-w-xs h-auto rounded-md
                     overflow-hidden shadow-lg my-4
                     md:m-4 lg:h-auto`}
    >
      <CardCover coverPhoto={defaultPhoto} authorText={authorText}/>
      <CardContent
        handleClick={handleClick}
        title={title}
        slug={slug}
        id={id}
      />
    </div>
  )
}

function CardCover ({ coverPhoto, authorText }) {
  return (
    <>
      <img className="h-48 w-full object-cover hover:bg-gray"
           src={coverPhoto}
           alt="ArticleList cover"
      />
      <p className="text-gray-500 font-medium text-xs text-center mt-2">{authorText}</p>
    </>
  )
}

function CardContent ({ title, slug, id, handleClick }) {
  const start     = 0,
        end       = slug.length >= 100 ? 100 : slug.length,
        urlLength = 40
  /**
   * slug length limit is 250 for optimal viewing.
   * url slug limit will be enforced later
   * changing urls always causes trouble (-_-).
   */
  const aboutSlug = slug.slice(start, end)
  // const urlSlug = slugify(slug.slice(start, urlLength))
  const urlSlug = slugify(title)

  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="font-bold text-gray-600 mb-4 text-center">
        <Link to={`/archive/${urlSlug}/${id}`}
              className="text-xl"
              onClick={handleClick}
        >
          {title}
        </Link>
      </div>
      <p className="font-normal text-gray-700 text-sm mb-4 text-center"> {aboutSlug} </p>
    </div>
  )
}




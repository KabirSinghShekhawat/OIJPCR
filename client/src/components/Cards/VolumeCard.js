import fallback from '../../assets/stockPhotos/r2_c1.jpg'
import { Link } from 'react-router-dom'

// volume, about, cover, date
function VolumeCard (props) {
  const {
          volume,
          about,
          cover,
          date,
          isAdmin,
        } = props

  return (
    <div className=
           "min-40 max-w-sm md:max-w-md h-auto
           rounded-md overflow-hidden shadow-lg m-4 lg:max-w-lg lg:h-auto"
    >
      <CardCover volumeCover={cover || fallback} volume={volume} date={date}/>
      <CardContent volume={volume} about={about} isAdmin={isAdmin}/>
    </div>
  )
}

function CardCover ({ volumeCover, volume, date }) {
  return (
    <>
      <img className="h-98 md:h-64 w-full object-cover hover:bg-gray"
           src={volumeCover}
           alt={`volume ${volume}`}
      />
      <p className="text-gray-500 font-medium text-sm text-center mt-2">{date}</p>
    </>
  )
}

function CardContent ({ about, volume, isAdmin }) {
  const start = 0,
        end   = about.length >= 250 ? 250 : about.length
  /**
   * slug length limit is 250 for optimal viewing.
   * url slug limit will be enforced later
   * changing urls always causes trouble (-_-).
   */
  const volumeSlug = about.slice(start, end)

  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="font-bold text-2xl text-gray-600 mb-4 text-center">
        Volume {volume}
      </div>
      <p className="font-normal text-gray-700 text-sm mb-6 text-center">
        {volumeSlug}
      </p>
      <div>
        <CardButton text={`Explore Vol. ${volume}`} volume={volume}/>
        {
          isAdmin
          &&
          <CardButton text={`Edit Vol. ${volume}`} volume={volume} isAdmin={isAdmin}/>
        }
      </div>
    </div>
  )
}

function CardButton ({ text, volume, isAdmin }) {
  let link = `/archive/${volume}`
  if (isAdmin)
    link = `/admin/list/volume/${volume}`
  return (
      <Link
        to={link}
        className="my-4 sm:my-4 py-2 px-4 mr-4 max-w-max rounded-lg bg-black text-white"
      >
        {text}
      </Link>
  )
}

export default VolumeCard
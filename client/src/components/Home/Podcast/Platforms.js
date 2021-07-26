export default function PodcastPlatforms ({ covers, links }) {
  return (
    <>
      {
        Object.keys(links).map((link) => {
          return (
            <Platform url={links[link]} icon={covers[link]} link={link}/>
          )
        })
      }
    </>
  )
}

function Platform ({ url, link, icon }) {
  return (
    <a
      href={url}
    >
      <img src={icon}
           alt={`${link.toUpperCase()} Podcast`}
           className="w-8 h-8 object-cover inline mr-4 mb-4"
      />
    </a>
  )
}
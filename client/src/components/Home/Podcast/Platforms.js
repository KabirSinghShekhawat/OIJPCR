export default function PodcastPlatforms ({ covers, links }) {
  return (
    <div className="mt-8">
      {
        Object.keys(links).map((link, index) => {
          return (
            <Platform url={links[link]} icon={covers[link]} link={link} key={index} />
          )
        })
      }
    </div>
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
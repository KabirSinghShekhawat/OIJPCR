import cover from '../../assets/podcastCover.jpg'
import apple from '../../assets/cib_apple-podcasts.svg'
import spotify from '../../assets/cib_spotify.svg'
import pocketcasts from '../../assets/simple-icons_pocketcasts.svg'
import google from '../../assets/cib_google-podcasts.svg'
import radiopublic from '../../assets/cib_radiopublic.svg'
import overcast from '../../assets/cib_overcast.svg'

const podcastDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut auctor hac sed neque.\n" +
  "Dui in mi dignissim in. Velit pellentesque bibendum adipiscing eu hac. Laoreet integer\n" +
  "massa suspendisse sagittis. Ipsum arcu nulla in euismod mattis eget. Non ac fermentum\n" +
  "donec nibh sit. Donec morbi elit neque risus. Mattis imperdiet elementum sagittis,\n" +
  "porttitor lorem amet sed. massa suspendisse sagittis. Ipsum arcu nulla in euismod mattis eget. " +
  "Non ac fermentum donec nibh sit. Donec morbi elit neque risus. Mattis imperdiet elementum sagittis," +
  " porttitor lorem amet sed."

export default function Podcast() {
  return (
    <div className="flex flex-col md:flex-row md:mx-12 mx-4 my-8 p-10 rounded-md shadow-xl border">
      <div className="md:w-1/4 mr-4 mb-6 md:mb-0">
        <img src={cover} alt="OIJPCR Podcast Cover" className="w-64 h-64 object-cover rounded" />
      </div>
      <div className="md:w-3/4">
        <p className="text-5xl font-bold">OIJPCR - The Podcast</p>
        <p className="text-md text-gray-900 text-left pt-4 mb-6 md:mb-8 tracking-tighter w-11/12">
          {podcastDescription}
        </p>
        <PodcastPlatforms />
      </div>
    </div>
  )
}

function PodcastPlatforms () {
  return (
    <>
      <a href="https://podcasts.apple.com/in/podcast/indian-conflict-resolution/id1531189437">
        <img src={apple} alt="Apple Podcast" className="podcast-streaming-cover"/>
      </a>

      <a href="https://open.spotify.com/show/6p5wjidjUFg2DgXs2xqhIT">
        <img src={spotify} alt="Spotify Podcast" className="podcast-streaming-cover" />
      </a>

      <a href="https://pca.st/3uyv69hy">
        <img src={pocketcasts} alt="Pocketcasts Podcast" className="podcast-streaming-cover" />
      </a>

      <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8yN2ZiMTY2Yy9wb2RjYXN0L3Jzcw==">
        <img src={google} alt="Google Podcast" className="podcast-streaming-cover" />
      </a>

      <a href="https://radiopublic.com/indian-conflict-resolution-WdqZq7">
        <img src={radiopublic} alt="Radiopublic Podcast" className="podcast-streaming-cover" />
      </a>

      <a href="https://overcast.fm/itunes1531189437/indian-conflict-resolution">
        <img src={overcast} alt="Overcast Podcast" className="podcast-streaming-cover"/>
      </a>
    </>
  )
}

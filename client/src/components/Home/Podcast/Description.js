const podcastDescription =
        'The Online Indian Journal of Peace & Conflict Resolution (OIJPCR) Podcast Series is\n' +
        'focused on peace and conflict resolution, with the aim of positively contributing\n' +
        'towards the creation of a peaceful society. A common feature in all podcasts will be\n' +
        'a five-point analysis and five recommendations.'

export default function Description () {
  return (
    <>
      <p className="text-3xl md:text-4xl xl:text-5xl font-bold">OIJPCR - The Podcast</p>
      <p
        className="text-xl md:text-2xl lg:text-lg xl:text-2xl text-gray-900 text-left pt-4 mb-6 md:mb-4 tracking-tighter lg:leading-relaxed"
      >
        {podcastDescription}
        <p>'Now streaming on all major podcast streaming platforms!'</p>
      </p>
    </>
  )
}
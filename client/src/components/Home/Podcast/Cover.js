export default function Cover ({cover}) {
  return (
    <div className="mb-6 lg:w-1/3 lg:mr-4 lg:mb-0">
      <img
        src={cover}
        alt="OIJPCR Podcast Cover"
        className="w-full h-auto  object-cover rounded"
      />
    </div>
  )
}
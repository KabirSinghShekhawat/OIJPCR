export default function Cover ({cover}) {
  return (
    <div className="md:w-1/4 mr-4 mb-6 md:mb-0">
      <img
        src={cover}
        alt="OIJPCR Podcast Cover"
        className="w-64 h-64 object-cover rounded"
      />
    </div>
  )
}
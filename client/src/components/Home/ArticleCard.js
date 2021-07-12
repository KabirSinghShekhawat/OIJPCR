export function ArticleCard ({coverPhoto, author, volume, title, slug, cname}) {
  const authorText = `BY ${author.toUpperCase()} ${String.fromCharCode(183)} VOLUME ${volume}`
  return (
    <div className={`article-card-container ${cname}`}>
      <CardCover coverPhoto={coverPhoto} authorText={authorText} />
      <CardContent title={title} slug={slug} />
    </div>
  )
}

function CardCover({coverPhoto, authorText}) {
  return (
    <>
      <img className="h-64 w-full object-cover hover:bg-gray"
           src={coverPhoto}
           alt="Article cover"
      />
      <p className="article-card-author">{authorText}</p>
    </>
  )
}

function CardContent({title, slug}) {
  return (
    <div className="mx-6 my-4 border-gray-light">
      <div className="article-card-title"> {title} </div>
      <p className="article-card-slug"> {slug} </p>
    </div>
  )
}
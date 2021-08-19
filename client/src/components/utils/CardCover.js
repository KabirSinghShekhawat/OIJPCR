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

export default CardCover
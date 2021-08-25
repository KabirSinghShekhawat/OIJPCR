const CardCover = ({ coverPhoto, authorText }) => {
  return (
    <>
      <img className="h-64 w-full object-cover hover:bg-gray"
           src={coverPhoto}
           alt="Article-List cover"
      />
      <p className="text-gray-500 font-medium text-sm text-center mt-2">{authorText}</p>
    </>
  )
}


export default CardCover
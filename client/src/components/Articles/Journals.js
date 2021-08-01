import ArticleCard from '../Home/ArticleCard'

export default function Journals ({ journals }) {
  const journalList = createJournals(journals)
  return (
    <div className="h-full md:mx-16 mx-4">
      <div className="flex flex-col md:flex-row h-full justify-evenly flex-wrap items-center py-2 my-4 w-full editor">
        {journalList}
      </div>
    </div>
  )
}

function createJournals (journals) {
  if (typeof journals == 'undefined' || journals.length === 0) return '...Loading'
  return journals.map((article) => {
    const articleProps = { id: article._id, coverPhoto: article.cover,  ...article }
    return <ArticleCard {...articleProps} key={article._id}/>
  })
}
import { cardData } from './DummyData'
import { ArticleCard } from './ArticleCard'

export function LeftGrid () {
  const cardGrid = cardData.map((card, index) => {
    return <ArticleCard
      key={index}
      {...card}
      volume={index + 1}
      cname={
        index === 0 ?
        'md:col-span-full'
        :
        ''
      }
    />
  })

  return (
    <>
      <div className="card-grid-home">
        {cardGrid}
      </div>
    </>
  )
}
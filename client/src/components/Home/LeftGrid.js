import { cardData } from './DummyData'
import ArticleCard from '../Cards/ArticleCard'
import ArticleCardFullWidth from '../Cards/ArticleCardFullWidth'

function LeftGrid () {
  const cardGrid = cardData.map((card, index) => {
    const cname = {
      container: '',
      button: 'ml-4',
    }

    return (
      index === 0 ?
        <ArticleCardFullWidth
          key={index}
          {...card}
          volume={index + 1}
          cname={cname}
        />
        :
        <ArticleCard
          key={index}
          {...card}
          volume={index + 1}
          cname="mt-10"
        />
    )
  })

  return (
    <>
      <div
        className="grid grid-cols-1 grid-flow-row grid-rows-5 lg:grid-cols-2 lg:grid-rows-3 lg:w-3/4 md:w-2/3 w-full">
        {cardGrid}
      </div>
    </>
  )
}

export default LeftGrid


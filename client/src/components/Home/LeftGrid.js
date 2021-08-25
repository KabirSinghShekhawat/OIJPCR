// import { cardData } from './DummyData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ArticleCard from '../Cards/ArticleCard'
import ArticleCardFullWidth from '../Cards/ArticleCardFullWidth'
import config from '../../config/config'

function LeftGrid () {
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    async function fetchJournals () {
      return await axios.get(`${config.host}journals/home/5`)
    }
    const result =  fetchJournals();
    console.log(result)
    setCardData(result?.data)
  }, [])

  const cardGrid = cardData?.map((card, index) => {
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
          cname="mt-10 md:mt-6"
        />
    )
  })

  return (
    <div
      className={
        `grid grid-cols-1 grid-flow-row
         grid-rows-5 lg:grid-cols-2 
         lg:grid-rows-3 lg:w-3/4 
         md:w-2/3 w-full`}
    >
      {cardGrid}
    </div>
  )
}

export default LeftGrid


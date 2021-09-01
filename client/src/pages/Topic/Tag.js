import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArticleList from '../Archive/ArticleList'
import config from '../../config/config'
import { useParams, useRouteMatch } from 'react-router-dom'


const Tag = () => {
  const [journals, setJournals] = useState([])
  const {tag} = useParams()
  const {path, url} = useRouteMatch()

  useEffect(() => {
    async function getJournals(tag) {
      const url = `${config.host}journals/tags/${tag}`
      const {data: journals} = await axios.get(url)
      setJournals(journals)
    }
    return getJournals(tag)
  }, )

  return (
    <div className="flex-grow">
      <div className="px-4 py-6 mx-12 my-6">
        <h1 className="text-gray-900 font-black text-5xl">{tag}</h1>
      </div>
      <div>
        <ArticleList
          journals={journals}
          path={path}
          url={url}
        />
      </div>
    </div>
  )
}


export default Tag
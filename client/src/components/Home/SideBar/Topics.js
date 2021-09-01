import { NavLink } from '../../utils/LinkItems'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config/config'

const Topics = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    async function getTopics () {
      const url = `${config.host}journals/tags`
      return await axios.get(url)
    }
    getTopics().then((result) => {
      setTopics(result?.data)
    })
  }, [])

  return (
    <div className="p-2 mx-1 mb-6 md:mb-0 rounded-lg shadow-xl border">
      <p className="text-3xl text-gray-900 text-center font-bold my-4 mx-2">
        Explore Topics
      </p>
      <ul className="text-center primary-color text-xl font-semibold">
        <LinkItems
          links={topics}
          cname="my-2 pb-2 border-b-2 border-transparent hover:border-indigo-400"
        />
      </ul>
    </div>
  )
}

function LinkItems ({ links, cname = '', newTab }) {
  return (
    links.map((topic, index) => {
      const topicLink = {
        value: topic,
        url: `/tags/${topic}`,
      }
      return (
        <NavLink key={index}
                 cname={cname}
                 newTab={newTab}
                 {...topicLink}
        />
      )
    })
  )
}

export default Topics
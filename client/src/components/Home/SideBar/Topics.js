import { LinkItems } from '../../utils/LinkItems'

const ExploreTopics = [
  { url: '#', value: 'Philosophy' },
  { url: '#', value: 'Nature' },
  { url: '#', value: 'Health & Nutrition' },
  { url: '#', value: 'Peace' },
  { url: '#', value: 'Conflict Resolution' },
  { url: '#', value: 'Psychology' },
  { url: '#', value: 'Interviews' },
  { url: '#', value: 'Indian Constitution' },
  { url: '#', value: 'Culture' }
]


export function Topics() {
  return (
    <div className="p-2 mx-1 mb-6 md:mb-0 rounded-lg shadow-xl border">
      <p className="text-3xl text-gray-900 text-center font-bold my-4 mx-2">Explore Topics</p>
      <ul className="text-center primary-color text-xl font-semibold">
        <LinkItems links={ExploreTopics} cname="my-2 pb-2 border-b-2 border-transparent hover:border-indigo-400" />
      </ul>
    </div>
  )
}
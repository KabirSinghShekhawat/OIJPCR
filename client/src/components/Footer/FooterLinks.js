import { LinkItems } from '../utils/LinkItems'

export default function FooterLinks ({ links, heading, newTab }) {
  return (
    <>
      <div className="flex-1 md:p-2 py-2 text-center">
        <h4 className="text-gray-200 text-xl font-bold">{heading}</h4>
        <ul className="text-center mt-2 text-gray-400">
          <LinkItems links={links} newTab={newTab}/>
        </ul>
      </div>
    </>
  )
}
import {Link} from "react-router-dom"
import box from '../../../assets/submitArticleBtn.svg'

export default function SubmitArticleForm () {
  return (
    <div className="p-2 pb-6 mx-1 mb-6 mt-4 md:mt-10 rounded-lg shadow-xl border">
      <div className="flex flex-col justify-center">
        <p className="text-5xl sm:text-4xl text-gray-900 text-left font-bold my-4 px-2 primary-color">
          Interested in seeing your article in this space?
        </p>
        <p className="px-2 mt-2 md:mt-0">
          Submit a draft of your article and we'll get back to you!
        </p>
        <button className="mt-6 md:mt-16 self-center sm:mt-8 py-2 px-6 max-w-max rounded-md primary-color-bg text-white">
          <img src={box} alt="submit button icon" className="mr-2 inline h-4 w-4 mb-1"/>
          <Link
            to="/submitArticle"
          >
            Submit Article
          </Link>
        </button>
      </div>
    </div>
  )
}
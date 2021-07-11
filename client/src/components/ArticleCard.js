import sample from '../assets/r1_c1.jpg'

export function ArticleCard () {
  return (
    <div className="h-auto max-w-sm rounded-md overflow-hidden shadow-lg m-16">

      <div className="h-64 bg-cover hover:bg-gray"
           style={{ backgroundImage: `url(${sample})` }}
      >

      </div>
      <div className="mx-6 my-4 border-gray-light">
        <div className="font-medium text-base text-gray-darker mb-4">Item name goes here</div>
        <p className="font-normal text-gray-dark text-sm mb-2">
          Economists have long held that a peaceful environment obtained under the rule of law is absolutely vital for an economy to thrive. These are of course necessary conditions for that to happen, not sufficient ones. To thrive businesses need a certain environment where planning is possible and decisi…
        </p>
        <p className="font-normal text-gray-dark text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </div>
    </div>
  )
}
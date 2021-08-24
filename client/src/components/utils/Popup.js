import React, {useState} from 'react'

const SVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className="w-12 h-12 p-3 md:w-16 md:h-16 rounded-2xl md:p-3 border border-blue-100 text-blue-400 bg-blue-50"
         fill="none"
         viewBox="0 0 24 24" stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  )
}

const PopUp = (props) => {
  const { heading, text, buttonText, buttonColor } = props
  const [isOpen, setOpen] = useState(true)

  const handleClick = () => {
    props.handlePopUp()
    setOpen(!isOpen)
  }

  return (
    <div
      className={`${!isOpen ? 'hidden' : 'block'} flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-30`}
    >
      <div className="flex flex-col md:p-8 p-2 bg-white shadow-md hover:shadow-lg rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mt-4 md:mt-0">
            <SVG/>
            <div className="flex flex-col ml-3">
              <div className="font-medium leading-none">{heading || 'Notification'}</div>
              <p className="text-sm text-gray-600 leading-none mt-1">
                {text || "This is an auto-generated message"}
              </p>
            </div>
          </div>
          <button
            className={`flex-no-shrink ${buttonColor || 'bg-red-500 border-red-500'} px-5 my-4 md:my-0 md:ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full`}
            onClick={handleClick}
          >
            {buttonText || 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopUp
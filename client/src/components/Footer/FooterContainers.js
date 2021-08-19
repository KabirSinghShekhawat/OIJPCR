function FooterContainer (props) {
  return (
    <footer className="bg-black p-4 flex flex-col-reverse md:flex-row text-gray-400">
      {props.children}
    </footer>
  )
}

function FooterNavContainer (props) {
  return (
    <div className="
           w-full mt-2
           flex flex-1 flex-row
           md:flex-1 md:w-1/2 md:mt-0
    ">
      {props.children}
    </div>
  )
}

export {FooterContainer, FooterNavContainer}
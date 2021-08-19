function Container (props) {
  return (
    <div className="flex flex-col lg:flex-row md:mx-4 mx-2 my-8 p-6 md:p-10 rounded-md shadow-xl border">
      {props.children}
    </div>
  )
}

function Body (props) {
  return (
    <div className="lg:w-2/3">
      {props.children}
    </div>
  )
}

export { Container, Body }
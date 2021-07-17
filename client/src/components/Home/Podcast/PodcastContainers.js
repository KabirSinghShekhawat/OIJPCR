function Container (props) {
  return (
    <div className="flex flex-col md:flex-row md:mx-12 mx-4 my-8 p-10 rounded-md shadow-xl border">
      {props.children}
    </div>
  )
}

function Body (props) {
  return (
    <div className="md:w-3/4">
      {props.children}
    </div>
  )
}

export { Container, Body }
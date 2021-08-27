const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="w-5/6 sm:w-3/4 md:w-1/2 mt-8">
      {props.children}
    </form>
  )
}


const FormField = (props) => {
  return (
    <div className="flex justify-evenly flex-col">
      <label
        htmlFor={props.id}
        className="text-xl font-semibold my-4"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.id}
        className="h-12 py-2 px-4 border-2 border-gray-300 rounded-lg"
        onChange={props.handleFieldChange}
      />
    </div>
  )
}


const FormContainer = (props) => {
  return (
    <div className="flex flex-col min-h-screen items-center py-4 px-1 sm:p-4 md:p-8 justify-start">
      {props.children}
    </div>
  )
}


const FormHeading = (props) => {
  return (
    <h1 className="text-center text-4xl tracking-wide font-bold text-gray-700 mt-4">
      {props.heading}
    </h1>
  )
}


const FormButton = ({text}) => {
  return (
    <div className="flex justify-center mt-12">
      <button className="rounded-lg bg-purple-700 text-2xl font-mono tracking-wide text-white px-4 py-2 w-32 h-12">
        {text}
      </button>
    </div>
  )
}


export {
  Form,
  FormField,
  FormContainer,
  FormHeading,
  FormButton
}
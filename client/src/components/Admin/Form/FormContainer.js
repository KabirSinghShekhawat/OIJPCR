export default function FormContainer (props) {
  const { heading, handleSubmit } = props
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">{heading}</h1>
        <form onSubmit={handleSubmit} method="POST">
          {props.children}
        </form>
      </div>
    </div>
  )
}
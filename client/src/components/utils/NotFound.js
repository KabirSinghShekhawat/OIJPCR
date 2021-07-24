export default function NotFound (props) {
  const {msg} = props.msg ? props : ''
  return (
    <div className="p-4">
      <h1 className="text-2xl text-black">
        <p>404: Page not found</p>
        {msg}
      </h1>
    </div>
  )
}
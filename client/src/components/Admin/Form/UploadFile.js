function UploadFile(props) {
  return (
    <div className="my-4 border-1">
      <h1>{props.label}</h1>
      <input
        type="file"
        name={props.name}
        onChange={props.onFileChange}
      />
    </div>
  )
}

export default UploadFile
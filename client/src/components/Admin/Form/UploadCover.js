export default function UploadCover(props) {
  return (
    <div className="my-4 border-1">
      <h1>File Upload</h1>
      <input type="file" name="image" onChange={props.onFileChange} />
    </div>
  )
}
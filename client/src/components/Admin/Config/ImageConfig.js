// backend file uploader endpoint
const uploadImageByFile = 'http://localhost:5000/editor/uploadFile'
// endpoint that provides uploading by Url
const uploadImageByUrl = 'http://localhost:5000/editor/fetchUrl'

export const ImageConfig = {
  endpoints: {
    byFile: uploadImageByFile,
    byUrl: uploadImageByUrl,
  },
  field: 'image',
  types: 'image/*',
}
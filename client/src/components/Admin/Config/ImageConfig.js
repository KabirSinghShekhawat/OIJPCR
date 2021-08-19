// backend file uploader endpoint
const uploadImageByFile = 'http://localhost:5000/admin/editor/uploadFile'
// endpoint that provides uploading by Url
const uploadImageByUrl = 'http://localhost:5000/admin/editor/fetchUrl'

export const ImageConfig = {
  endpoints: {
    byFile: uploadImageByFile,
    byUrl: uploadImageByUrl,
  },
  field: 'image',
  types: 'image/*',
}
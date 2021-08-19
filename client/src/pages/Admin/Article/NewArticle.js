import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from '../../../components/Admin/EditorForm'
import { initEditor } from '../../../components/Admin/Config/TinyMCEConfig'

class NewArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorRef: {},
      content: '',
      author: this.props.author || '',
      title: this.props.title || '',
      slug: this.props.slug || '',
      volume: this.props.volume || '',
      tags: this.props.tags || '',
      cover: this.props.cover || '',
      authorPhoto: this.props.authorPhoto || '',
      articleCoverImage: null,
      authorImage: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PostData = this.PostData.bind(this)
    this.onInit = this.onInit.bind(this)
  }

  onFileChange (evt) {
    this.setState({ [evt.target.name]: evt.target.files[0] })
  }

  handleChange (evt) {
    this.setState(() => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    const cover = await this.fileUpload(this.state.articleCoverImage)
    const authorPhoto = await this.fileUpload(this.state.authorImage)

    if(!cover)
      return alert('Article cover image not uploaded')

    if (!authorPhoto)
      return alert('Author profile photo not uploaded')

    this.setState({
      cover: cover,
      authorPhoto: authorPhoto,
    })
    await this.PostData()
  }

  handleEditorChange = () => {
    this.setState({
      content: this.state.editorRef.getContent(),
    })
  }

  render () {
    const {
            content,
            articleCoverImage,
            authorImage,
            ...formState
          } = this.state
    return (
      <EditorForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onFileChange={this.onFileChange}
        {...formState}
        isEdit={false}
      >
        <Editor
          onInit={this.onInit}
          onChange={this.handleEditorChange}
          init={{...initEditor}}
        />
      </EditorForm>
    )
  }

  onInit (evt, editor) {
    this.setState({
      editorRef: editor,
    })
  }

  async fileUpload (file) {
    const url = 'http://localhost:5000/admin/editor/uploadFile'
    const formData = new FormData()
    formData.append('image', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    const { data } = await axios.post(url, formData, config)
    return 'http://localhost:5000' + data.file.url
  }

  async PostData () {
    try {
      const {
              editorRef,
              articleCoverImage,
              authorImage,
              ...data
            } = this.state
      const url = 'http://localhost:5000/admin/editor/'
      await axios.post(url, { ...data })
      alert('Created New Article')
    } catch (err) {
      console.log('An Error occurred in posting data: ' + err.message)
    }
  }
}

export default NewArticle
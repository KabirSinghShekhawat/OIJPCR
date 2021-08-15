import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from '../../components/Admin/EditorForm'
import { toolbar, plugins } from '../../components/Admin/Config/TinyMCEConfig'

class NewArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorRef: {},
      content: this.props.content || '',
      author: this.props.author || '',
      title: this.props.title || '',
      slug: this.props.slug || '',
      volume: this.props.volume || '',
      cover: this.props.cover || '',
      tags: this.props.tags || '',
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PostData = this.PostData.bind(this)
    this.onInit = this.onInit.bind(this)
  }

  onFileChange (evt) {
    this.setState({file: evt.target.files[0]})
  }

  handleChange (evt) {
    this.setState(() => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    const imgPath = await this.fileUpload(this.state.file)
    this.setState({cover: imgPath})
    await this.PostData()
  }

  handleEditorChange = () => {
    this.setState({
      content: this.state.editorRef.getContent(),
    })
  }

  render () {
    const { content, ...formState } = this.state
    return (
      <EditorForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onFileChange={this.onFileChange}
        {...formState}
      >
        <Editor
          onInit={this.onInit}
          onChange={this.handleEditorChange}
          init={{
            height: 500,
            menubar: true,
            branding: false,
            plugins: plugins,
            toolbar: toolbar,
            content_css: [
              '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
              '//www.tiny.cloud/css/codepen.min.css',
            ],
          }}
        />
      </EditorForm>
    )
  }

  onInit (evt, editor) {
    this.setState({
      editorRef: editor,
    })
  }

  async fileUpload(file) {
    const url = 'http://localhost:5000/admin/editor/uploadFile';
    const formData = new FormData();
    formData.append('image', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const {data} = await axios.post(url, formData,config)
    return 'http://localhost:5000' + data.file.url
  }

  async PostData () {
    try {
      const {editorRef, file, ...rest} = this.state
      await axios.post('http://localhost:5000/admin/editor/', { ...rest })
      alert('Created New Article')
    } catch (err) {
      console.log('An Error occurred in posting data: ' + err.message)
    }
  }
}

export default NewArticle
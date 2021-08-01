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
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PostData = this.PostData.bind(this)
    this.onInit = this.onInit.bind(this)
  }

  onFileChange (evt) {
    this.setState({file: evt.target.files[0]})
  }

  async handleSave (evt, editor) {
    console.log('handle Save')
    await this.PostData()
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

  handleEditorChange = (editor) => {
    this.setState({
      content: this.state.editorRef.getContent(),
    })
    console.log('Content was updated:')
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
            save_onsavecallback: this.handleSave,
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
    const url = 'http://localhost:5000/editor/uploadFile';
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
      await axios.post('http://localhost:5000/editor/', {
        content: this.state.content,
        author: this.state.author,
        title: this.state.title,
        slug: this.state.slug,
        volume: this.state.volume,
        cover: this.state.cover
      })
      console.log('Sent Data to http://localhost:5000/editor/')
    } catch (err) {
      console.log('An Error occurred in posting data: ' + err.message)
    }
  }
}

export default NewArticle
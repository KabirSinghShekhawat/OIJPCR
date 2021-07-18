import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from './EditorForm'

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
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.PostData = this.PostData.bind(this)
    this.onInit = this.onInit.bind(this)
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
        {...formState}
      >
        <Editor
          onInit={this.onInit}
          onChange={this.handleEditorChange}
          initialValue={this.state.content}
          init={{
            height: 500,
            menubar: true,
            branding: false,
            save_onsavecallback: this.handleSave,
            plugins: [
              'advlist autolink lists link image',
              'charmap print preview anchor help',
              'searchreplace visualblocks fullscreen',
              'code',
              'insertdatetime media table paste wordcount save',
            ],
            toolbar:
              'save | undo redo | link | image | \
              insert | styleselect | bold | italic | code | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist | outdent indent | help',
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

  async PostData () {
    try {
      await axios.post('http://localhost:5000/editor/', {
        content: this.state.content,
        author: this.state.author,
        title: this.state.title,
        slug: this.state.slug,
        volume: this.state.volume,
      })
      console.log('Sent Data to http://localhost:5000/editor/')
    } catch (err) {
      console.log('An Error occurred in posting data: ' + err.message)
    }
  }
}

export default NewArticle
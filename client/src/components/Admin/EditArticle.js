import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from './EditorForm'
import { Redirect } from 'react-router-dom'

class EditArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorRef: {},
      content: '',
      initialValue: this.props.content || '',
      author: this.props.author || '',
      title: this.props.title || '',
      slug: this.props.slug || '',
      volume: this.props.volume || '',
      id: '',
      redirect: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.PostData = this.PostData.bind(this)
    this.onInit = this.onInit.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id } = this.props.match.params
      const url = `http://localhost:5000/journals/${urlSlug}/${id}`
      const { data } = await axios.get(url)
      const { content: initialValue } = data
      this.setState({ ...data, id, initialValue })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async handleDelete () {
    try {
      const url = `http://localhost:5000/editor/${this.state.id}`
      await axios.delete(url)
      this.setState({ redirect: '/admin/new' })
    } catch (err) {
      console.log('An Error occurred in deleting data: ' + err.message)
    }
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
    const { content, redirect, ...formState } = this.state
    if (redirect)
      return <Redirect to={this.state.redirect}/>

    return (
      <EditorForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        {...formState}
        isEdit={true}
      >
        <Editor
          onInit={this.onInit}
          onChange={this.handleEditorChange}
          initialValue={this.state.initialValue}
          init={{
            height: 500,
            menubar: true,
            branding: false,
            save_onsavecallback: this.PostData,
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
      const url = `http://localhost:5000/editor/${this.state.id}`
      const { editorRef, initialValue, ...data } = this.state
      await axios.patch(url, { ...data })
      console.log('Sent Data to http://localhost:5000/editor/')
    } catch (err) {
      console.log('An Error occurred in posting data: ' + err.message)
    }
  }
}

export default EditArticle
import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from '../../../components/Admin/EditorForm'
import { Redirect } from 'react-router-dom'
import { toolbar, plugins } from '../../../components/Admin/Config/TinyMCEConfig'

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
      cover: this.props.cover ||
        'http://localhost:5000/editor/images/r2_c1.jpg',
      file: null,
      tags: this.props.tags || '',
      id: '',
      redirect: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)
    this.deletePreviousCoverImage = this.deletePreviousCoverImage.bind(this)
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

  async deleteArticle () {
    try {
      const imageName = this.state.cover.split('/').pop()
      const url = `http://localhost:5000/admin/editor/${this.state.id}/${imageName}`
      await axios.delete(url)

      setTimeout(() => {
          alert('Article deleted, redirecting now')
          this.setState({ redirect: '/admin/list' })
        },
        1000,
      )
    } catch (err) {
      console.log('An Error occurred in deleting data: ' + err.message)
    }
  }

  async deletePreviousCoverImage() {
    const imageName = this.state.cover.split('/').pop()
    const url = `http://localhost:5000/admin/editor/${imageName}`
    await axios.delete(url)
  }

  onFileChange (evt) {
    this.setState({ file: evt.target.files[0] })
  }

  handleChange (evt) {
    this.setState(() => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    if (this.state.file !== null) {
      const imgPath = await this.fileUpload(this.state.file)
      await this.deletePreviousCoverImage()
      this.setState({ cover: imgPath })
    }
    await this.PostData()
  }

  handleEditorChange = () => {
    this.setState({
      content: this.state.editorRef.getContent(),
    })
  }

  render () {
    const { content, redirect, ...formState } = this.state

    if (redirect)
      return <Redirect to={this.state.redirect}/>

    return (
      <EditorForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.deleteArticle}
        onFileChange={this.onFileChange}
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
    console.log(data.file.url)
    return 'http://localhost:5000' + data.file.url
  }

  async PostData () {
    try {
      const url = `http://localhost:5000/admin/editor/${this.state.id}`
      const { editorRef, initialValue, id, redirect, ...data } = this.state
      await axios.patch(url, { ...data })

      this.setState({ success: 'success' })
      alert('Successfully submitted data')
    } catch (err) {
      console.log('An Error occurred in posting data: ' + err.message)
      alert('error in posting data')
    }
  }
}

export default EditArticle
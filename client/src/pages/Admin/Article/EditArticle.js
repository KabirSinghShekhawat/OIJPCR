import { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from '../../../components/Admin/EditorForm'
import { Redirect } from 'react-router-dom'
import { initEditor } from '../../../components/Admin/Config/TinyMCEConfig'

class EditArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorRef: {},
      initialValue: this.props.content || '',
      content: '',
      author: this.props.author || '',
      title: this.props.title || '',
      slug: this.props.slug || '',
      volume: this.props.volume || '',
      tags: this.props.tags || '',
      cover: this.props.cover ||
        'http://localhost:5000/editor/images/article_cover_fallback.jpg',
      authorPhoto: this.props.authorPhoto || '',
      articleCoverImage: null,
      authorImage: null,
      id: '',
      redirect: null,
      postDataFlag: true
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
      const articleCover = this.state.cover.split('/').pop()
      const authorPhoto = this.state.authorPhoto.split('/').pop()
      let url = `http://localhost:5000/admin/editor/${this.state.id}/${articleCover}/${authorPhoto}`
      await axios.delete(url)

      setTimeout(() => {
          alert('Article deleted, redirecting now')
          this.setState({ redirect: '/admin/list', postDataFlag: false })
        },
        1000,
      )
    } catch (err) {
      console.log('An Error occurred in deleting data: ' + err.message)
    }
  }

  async deletePreviousCoverImage (imagePath) {
    const imageName = imagePath.split('/').pop()
    const url = `http://localhost:5000/admin/editor/${imageName}`
    await axios.delete(url)
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

    if (this.state.articleCoverImage !== null) {
      const imgPath = await this.fileUpload(this.state.articleCoverImage)
      // before sending delete request
      // check if cover exists on server
      if(this.state.cover)
        await this.deletePreviousCoverImage(this.state.cover)
      this.setState({ cover: imgPath })
    }

    if (this.state.authorImage !== null) {
      const imgPath = await this.fileUpload(this.state.authorImage)
      // before sending delete request
      // check if author photo exists on server
      if(this.state.authorPhoto)
        await this.deletePreviousCoverImage(this.state.authorPhoto)
      this.setState({ authorPhoto: imgPath })
    }
    this.setState({ postDataFlag: true })
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
            redirect,
            articleCoverImage,
            authorImage,
            ...formState
          } = this.state

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
              initialValue,
              redirect,
              articleCoverImage,
              authorImage,
              id,
              ...data
            } = this.state
      const url = `http://localhost:5000/admin/editor/${this.state.id}`
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
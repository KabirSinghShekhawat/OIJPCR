import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'
import EditorForm from '../../../components/Admin/EditorForm'
import { Redirect } from 'react-router-dom'
import { initEditor } from '../../../components/Admin/Config/TinyMCEConfig'
import config from '../../../config/config'
import PopUp from '../../../components/utils/Popup'
import { UserContext } from '../../../UserContext'

class EditArticle extends Component {
  static contextType = UserContext

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
        `${config.host}editor/images/article_cover_fallback.jpg`,
      authorPhoto: this.props.authorPhoto || '',
      articleCoverImage: null,
      authorImage: null,
      id: '',
      redirect: null,
      postDataFlag: true,
      notification: {
        show: false,
        msg: '',
      },
      token: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePopUp = this.handlePopUp.bind(this)
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
      const url = `${config.host}journals/${urlSlug}/${id}`
      const { data } = await axios.get(url)
      const { content: initialValue } = data
      this.setState({
        ...data,
        id,
        initialValue,
        token: this.context?.token,
      })
    } catch (e) {
      this.setState({
        notification: {
          show: true,
          msg: 'Error: Cannot fetch article from server',
        },
      })
    }
  }

  handlePopUp () {
    this.setState(prevState => {
      return {
        notification: {
          show: !prevState.notification.show,
          msg: '',
        },
      }
    })
  }

  async deleteArticle () {
    try {
      const articleCover = this.state.cover.split('/').pop()
      const authorPhoto = this.state.authorPhoto.split('/').pop()

      let url = `${config.host}admin/editor`

      const data = {
        id: this.state.id,
        articleCover,
        authorPhoto,
      }

      const headerConfig = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
      }

      await axios.delete(
        url,
        {
          ...headerConfig,
          data: { ...data },
        })

      this.setState({
        redirect: '/admin/list',
        postDataFlag: false,
      })

    } catch (err) {
      this.setState({
        notification: {
          show: true,
          msg: 'Error: Article could not be deleted',
        },
      })
    }
  }

  async deletePreviousCoverImage (imagePath) {
    const imageName = imagePath.split('/').pop()
    const url = `${config.host}admin/editor/${imageName}`

    const headerConfig = {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    }

    await axios.delete(url, { ...headerConfig })
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

    if (!this.state.postDataFlag) return

    if (this.state.articleCoverImage) {
      const imgPath = await this.fileUpload(this.state.articleCoverImage)
      // before sending delete request
      // check if cover exists on server
      if (this.state.cover)
        await this.deletePreviousCoverImage(this.state.cover)
      this.setState({ cover: imgPath })
    }

    if (this.state.authorImage) {
      const imgPath = await this.fileUpload(this.state.authorImage)
      // before sending delete request
      // check if author photo exists on server
      if (this.state.authorPhoto)
        await this.deletePreviousCoverImage(this.state.authorPhoto)
      this.setState({ authorPhoto: imgPath })
    }

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
      <>
        <EditorForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDelete={this.deleteArticle}
          onFileChange={this.onFileChange}
          {...formState}
          isEdit={true}
          heading={'Edit Article'}
        >
          <Editor
            onInit={this.onInit}
            onChange={this.handleEditorChange}
            initialValue={this.state.initialValue}
            init={{ ...initEditor }}
          />
        </EditorForm>
        {
          (this.state.notification.show) ?
            <PopUp
              heading={this.state.notification.msg}
              handlePopUp={this.handlePopUp}
              text=""
              buttonText=""
              buttonColor=""
            /> : ''
        }
      </>
    )
  }

  onInit (evt, editor) {
    this.setState({
      editorRef: editor,
    })
  }

  async fileUpload (file) {
    const url = `${config.host}admin/editor/uploadFile`

    const formData = new FormData()
    formData.append('image', file)

    const headerConfig = {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post(url, formData, { ...headerConfig })
    const { host } = config
    return host.slice(0, host.length - 1) + data.file.url
  }

  async PostData () {
    try {
      if (!this.state.postDataFlag) return

      const {
              editorRef,
              initialValue,
              redirect,
              articleCoverImage,
              authorImage,
              ...data
            } = this.state

      const url = `${config.host}admin/editor`

      const headerConfig = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
      }

      await axios.patch(url, { ...data }, { ...headerConfig })

      this.setState({
        notification: {
          show: true,
          msg: 'Article Edited',
        },
      })

    } catch (err) {
      this.setState({
        notification: {
          show: true,
          msg: 'Error: could not edit article',
        },
      })
    }
  }
}

export default EditArticle
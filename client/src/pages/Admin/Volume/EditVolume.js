import React, { Component } from 'react'
import VolumeForm from '../../../components/Admin/VolumeForm'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import PopUp from '../../../components/utils/Popup'

class EditVolume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volume: '',
      about: 'loading...',
      cover: '',
      date: 'loading...',
      isEdit: true,
      file: null,
      redirect: null,
      notification: {
        show: false,
        msg: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PatchData = this.PatchData.bind(this)
    this.deleteVolume = this.deleteVolume.bind(this)
    this.deletePreviousCoverImage = this.deletePreviousCoverImage.bind(this)
  }

  async componentDidMount () {
    const { volume } = this.props.match.params
    const { data } = await axios.get(`http://localhost:5000/admin/volume/${volume}`)
    if (!data) {
      this.setState({redirect: '/notFound'})
    }
    this.setState({
      volume: data[0].volume,
      about: data[0].about,
      cover: data[0].cover,
      date: data[0].date,
    })
  }

  onFileChange (evt) {
    this.setState({ file: evt.target.files[0] })
  }

  handleChange (evt) {
    this.setState(() => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  async deleteVolume () {
    try {
      const imageName = this.state.cover.split('/').pop()
      const url = `http://localhost:5000/admin/volume/${this.state.volume}/${imageName}`
      await axios.delete(url)

      setTimeout(() => {
          alert('Volume deleted, redirecting now')
          this.setState({ redirect: '/admin/list' })
        },
        1000,
      )
    } catch (err) {
      // console.log('An Error occurred in deleting data: ' + err.message)
      this.setState({
        notification: {
          show: true,
          msg: 'Could not Delete data'
        }
      })
    }
  }

  async deletePreviousCoverImage () {
    const imageName = this.state.cover.split('/').pop()
    const url = `http://localhost:5000/admin/editor/${imageName}`
    await axios.delete(url)
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    if (this.state.file !== null) {
      const imgPath = await this.fileUpload(this.state.file)
      await this.deletePreviousCoverImage()
      this.setState({ cover: imgPath })
    }
    await this.PatchData()
  }

  async PatchData () {
    try {
      const url = `http://localhost:5000/admin/volume/${this.state.volume}`
      const { volume, about, cover, date } = this.state
      await axios.patch(url, {
        volume,
        about,
        cover,
        date,
      })
      alert('Edited Volume')
    } catch (err) {
      console.log('An Error occurred in creating volume: ' + err.message)
    }
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

  render () {
    const { redirect } = this.state
    if (redirect)
      return <Redirect to={this.state.redirect}/>

    if (this.state.notification.show) {
      const {msg} = this.state.notification
      return (<PopUp
        heading={msg}
        text=""
        buttonText=""
        buttonColor=""
      />)
    }

    return (
      <VolumeForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDelete={this.deleteVolume}
        onFileChange={this.onFileChange}
        {...this.state}
      >

      </VolumeForm>
    )
  }
}

export default EditVolume
import React, { Component } from 'react'
import VolumeForm from '../../components/Admin/VolumeForm'
import axios from 'axios'

class NewVolume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volume: '',
      about: 'This is a volume',
      cover: 'http://localhost:5000/editor/images/r2_c1.jpg',
      date: 'January 2021',
      isEdit: false,
      file: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PostData = this.PostData.bind(this)
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
    if (this.state.file === null) {
      alert('Please upload cover image')
      return
    }
      const imgPath = await this.fileUpload(this.state.file)
      this.setState({ cover: imgPath })
      await this.PostData()
  }

  async PostData () {
    try {
      await axios.post('http://localhost:5000/admin/volume/', {
        volume: this.state.volume,
        about: this.state.about,
        cover: this.state.cover,
        date: this.state.date,
      })
      alert('Created New Volume')
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
    return (
      <VolumeForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        onFileChange={this.onFileChange}
        {...this.state} >

      </VolumeForm>
    )
  }
}

export default NewVolume
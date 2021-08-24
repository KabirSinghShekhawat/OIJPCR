import React, { Component } from 'react'
import VolumeForm from '../../../components/Admin/VolumeForm'
import axios from 'axios'
import PopUp from '../../../components/utils/Popup'

class NewVolume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      volume: '',
      about: 'This is a volume',
      cover: 'http://localhost:5000/editor/images/volume_cover_fallback.jpeg',
      date: 'January 2021',
      isEdit: false,
      file: null,
      notification: {
        show: false,
        msg: '',
      },
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePopUp = this.handlePopUp.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PostData = this.PostData.bind(this)
  }

  handlePopUp () {
    this.setState(prevState => {
      return {
        notification: {
          show: false,
          msg: ''
        }
      }
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

  async handleSubmit (evt) {
    evt.preventDefault()
    if (this.state.file === null) {
      this.setState({
        notification: {
          show: true,
          msg: 'Please upload cover image',
        },
      })
      // alert('Please upload cover image')
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

      this.setState({
        notification: {
          show: true,
          msg: 'Created New Volume',
        },
      })

    } catch (err) {
      this.setState({
        notification: {
          show: true,
          msg: 'An Error occurred in creating volume',
        },
      })
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
    try {
    const { data } = await axios.post(url, formData, config)
    return 'http://localhost:5000' + data.file.url
    } catch (e) {
      this.setState({
        notification: {
          show: true,
          msg: 'Error in uploading file',
        },
      })
    }
  }

  render () {
    return (
      <>
        <VolumeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          onFileChange={this.onFileChange}
          {...this.state} >

        </VolumeForm>
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
}

export default NewVolume
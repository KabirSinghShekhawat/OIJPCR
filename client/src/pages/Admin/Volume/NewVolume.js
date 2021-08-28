import React, { Component } from 'react'
import VolumeForm from '../../../components/Admin/VolumeForm'
import axios from 'axios'
import PopUp from '../../../components/utils/Popup'
import config from '../../../config/config'
import { UserContext } from '../../../UserContext'

class NewVolume extends Component {
  static contextType = UserContext
  constructor (props) {
    super(props)
    this.state = {
      volume: '',
      about: 'This is a volume',
      cover: `${config.host}editor/images/volume_cover_fallback.jpeg`,
      date: 'January 2021',
      isEdit: false,
      file: null,
      notification: {
        show: false,
        msg: '',
      },
      token: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePopUp = this.handlePopUp.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.PostData = this.PostData.bind(this)
  }

  componentDidMount () {
    this.setState({ token: this.context?.token })
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

    if (!this.state.file || !this.state.volume) {
      this.setState({
        notification: {
          show: true,
          msg: 'Please fill all the required info',
        },
      })
      return
    }

    const imgPath = await this.fileUpload(this.state.file)
    this.setState({ cover: imgPath })
    await this.PostData()
  }

  async PostData () {
    try {
      const {volume, about,  cover, date} = this.state

      const url = `${config.host}admin/volume/`

      const headerConfig = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'content-type': 'application/json',
        },
      }

      await axios.post(url, {
          volume,
          about,
          cover,
          date
        }, {...headerConfig})

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

    try {
      const { data } = await axios.post(url, formData, {...headerConfig})
      const {host} = config
      return host.slice(0, host.length - 1) + data.file.url
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
          heading={"New Volume"}
          {...this.state}
        >
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
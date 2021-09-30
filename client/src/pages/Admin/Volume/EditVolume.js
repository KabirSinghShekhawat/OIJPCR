import config from '../../../config/config'
import React, { Component } from 'react'
import VolumeForm from '../../../components/Admin/VolumeForm'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import PopUp from '../../../components/utils/Popup'
import { UserContext } from '../../../UserContext'
import { deleteOldImage, uploadMultipart } from '../utils'

class EditVolume extends Component {
  static contextType = UserContext

  constructor (props) {
    super(props)
    this.state = {
      volume: this.props.volume || '',
      about: 'loading...',
      cover: '',
      date: 'loading...',
      id: '',
      isEdit: true,
      file: null,
      redirect: null,
      postDataFlag: true,
      notification: {
        show: false,
        msg: '',
      },
      token: '',
    }
  }

  async componentDidMount () {
    this.setState({ token: this.context?.token })

    const headerConfig = {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    }
    const { volume } = this.props.match.params
    const url = `${config.host}volume/${volume}`

    const { data } = await axios.get(url, { ...headerConfig })

    if (!data) {
      this.setState({ redirect: '/notFound' })
    }

    if (!data || data.length === 0)
      return

    const { about, cover, date, _id: id } = data[0]
    this.setState({
      volume: data[0].volume,
      about: about,
      cover: cover,
      date: date,
      id: id,
    })
  }

  handlePopUp = () => {
    this.setState(prevState => {
      return {
        notification: {
          show: !prevState.notification.show,
          msg: '',
        },
      }
    })
  }

  onFileChange = (evt) => {
    this.setState({ file: evt.target.files[0] })
  }

  handleChange = (evt) => {
    this.setState(() => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  deleteVolume = async () => {
    try {
      const imageName = encodeURI(this.state.cover.split('/').pop())

      const url = `${config.host}admin/volume`

      const data = {
        volume: this.state.volume,
        imageName: imageName,
      }

      const headerConfig = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
      }

      await axios.delete(url, {
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
          msg: 'Error: Volume could not be deleted',
        },
      })
    }
  }

  deletePreviousCoverImage = async (imagePath) => {
    const routePrefix = `${config.host}admin/editor/`
    const authToken = this.state.token
    await deleteOldImage({
      imagePath,
      routePrefix,
      authToken
    })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()

    if (!this.state.postDataFlag) return

    if (this.state.file) {
      const imgPath = await this.fileUpload(this.state.file)
      await this.deletePreviousCoverImage(this.state.cover)
      this.setState({ cover: imgPath })
    }

    await this.PatchData()
  }

  PatchData = async () => {
    try {
      if (!this.state.postDataFlag) return

      const { volume, about, date, id } = this.state

      const cover =
              this.state.file
                ?
                this.state.cover : ''

      const url = `${config.host}admin/volume`

      const headerConfig = {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
      }

      await axios.patch(url, {
        volume,
        about,
        cover,
        date,
        id,
      }, { ...headerConfig })

      this.setState({
        notification: {
          show: true,
          msg: 'Edited Volume: ' + this.state.volume,
        },
      })

    } catch (err) {
      this.setState({
        notification: {
          show: true,
          msg: 'An Error occurred in editing volume: ' +
            this.state.volume,
        },
      })
    }
  }

  fileUpload = async (file) => {
    const url = `${config.host}admin/editor/uploadFile`
    const authToken = this.state.token
    return await uploadMultipart(file, { url, authToken })
  }

  render () {
    const { redirect } = this.state
    if (redirect)
      return <Redirect to={this.state.redirect}/>

    return (
      <>
        <VolumeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDelete={this.deleteVolume}
          onFileChange={this.onFileChange}
          heading={'Edit Volume'}
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

export default EditVolume
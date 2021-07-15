import React, { Component } from 'react'
import axios from 'axios'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image'
import EditorForm from './EditorForm'

const editor = new EditorJS({
  data: {},
  holder: 'editor',
  tools: {
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:5000/editor/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:5000/editor/fetchUrl', // Your endpoint that provides uploading by Url
        },
        field: 'image',
        types: 'image/*',
      },
    },
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
      shortcut: 'CTRL+SHIFT+H',
    },
    linkTool: {
      class: LinkTool,
      // config: {
      //   endpoint: 'http://localhost:8008/editor/fetchUrl',
      // Your backend endpoint for url data fetching
      // }
    },
  },
  logLevel: 'ERROR',
})

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorJSObject: {},
      author: '',
      title: '',
      slug: '',
      volume: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount () {
    try {
      await editor.isReady
    } catch (err) {
      console.log(err)
    }
  }

  handleChange (evt) {
    this.setState((state) => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    const editorJSObject = await editor.save()
    this.setState({ editorJSObject: editorJSObject })

    axios.post('http://localhost:5000/editor/', {
      author: this.state.author,
      title: this.state.title,
      editorJSObject: editorJSObject,
      slug: this.state.slug,
      volume: this.state.volume,
    })
      .then(() => {
        console.log('Sent Data to http://localhost:5000/editor/')
      })
      .catch((err) => {
        console.log('An Error occurred in posting data: ' + err.message)
      })

  }

  render () {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center min-h-screen h-auto w-full">
          <div className="w-5/6 h-full rounded shadow-2xl border mt-8">
            <div id="editor"></div>
          </div>
        </div>
        <EditorForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} {...this.state} />
      </div>
    )
  }
}

export default Editor
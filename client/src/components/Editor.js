import React, { Component } from 'react'
import axios from 'axios'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image'

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
        defaultLevel: 3,
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
      data: {},
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
      console.log('Editor is ready')
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
    const editorData = await editor.save()
    this.setState({ data: editorData })
    const editorStateData = this.state.data

    axios.post('http://localhost:5000/editor/', {
      author: this.state.author,
      title: this.state.title,
      blocks: editorStateData.blocks,
      time: editorStateData.time,
      version: editorStateData.version,
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
      <>
        <div id="editor"></div>
        <hr/>
        <br/>
        <div className="button-container">
          <form onSubmit={this.handleSubmit} method="POST">
            <div>
              <label>Author: </label>
              <input type="text"
                     value={this.state.author}
                     name="author"
                     onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Title: </label>
              <input type="text"
                     value={this.state.title}
                     name="title"
                     onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Slug: </label>
              <input type="text"
                     value={this.state.slug}
                     name="slug"
                     onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Volume: </label>
              <input type="number"
                     value={this.state.volume}
                     name="volume"
                     onChange={this.handleChange}
                     min="0"
              />
            </div>
            <button onClick={this.handleSubmit}>SAVE</button>
          </form>
        </div>
      </>
    )
  }
}

export default Editor
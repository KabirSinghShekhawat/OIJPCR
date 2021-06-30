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
          byFile: 'http://localhost:5000/test/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:5000/test/fetchUrl', // Your endpoint that provides uploading by Url
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
      //   endpoint: 'http://localhost:8008/test/fetchUrl',
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
    }
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

  handleSubmit () {
    editor.save().then(editorData => {
      this.setState({ data: editorData })
      logOutput(this.state.data.blocks)
      const editorStateData = this.state.data

      axios.post('http://localhost:5000/test/editorJS', {
          blocks: editorStateData.blocks,
          time: editorStateData.time,
          version: editorStateData.version
      }).then(() => {
        console.log("Sent Data to http://localhost:5000/test/editorJS")
      }).catch((err) => {console.log('An Error occurred in posting data: ' + err.message)})

    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <>
        <div id="editor"></div>
        <hr/>
        <br/>
        <div className="button-container">
          <button onClick={this.handleSubmit}>SAVE</button>
        </div>
      </>
    )
  }
}

function logOutput (blocks) {
  for (let block of blocks) {
    console.log(`Type: ${block.type}\n Text: ${block.data.text}
    \n Level: ${block.data.level ? block.data.level : ''}`)
  }
}

export default Editor
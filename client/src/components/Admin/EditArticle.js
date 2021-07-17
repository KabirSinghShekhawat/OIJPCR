import React, { Component } from 'react'
import axios from 'axios'
import EditorJS from '@editorjs/editorjs'
import EditorForm from './EditorForm'
import { config as EditorJSConfig } from './Config/EditorConfig'

class EditArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorJSObject: {},
      author: '',
      title: '',
      slug: '',
      volume: 0,
      editor: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id } = this.props.match.params
      const url = `http://localhost:5000/journals/${urlSlug}/${id}`
      const { data } = await axios.get(url)
      this.setState({ journal: data })
      const editor = new EditorJS(EditorJSConfig)
      await editor.isReady
      this.setState({ editor: editor })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange (evt) {
    this.setState(() => ({
      [evt.target.name]: evt.target.value,
    }))
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    const editorJSObject = await this.state.editor.save()
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
        <Editor/>
        <EditorForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          {...this.state}
        />
      </div>
    )
  }
}

function Editor () {
  return (
    <div className="flex justify-center items-center min-h-screen h-auto w-full">
      <div className="w-5/6 h-full rounded shadow-2xl border mt-8">
        <div id="editor" className="editor">EditorJS</div>
      </div>
    </div>
  )
}

export default EditArticle
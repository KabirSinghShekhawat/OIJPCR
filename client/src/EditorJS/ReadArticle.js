import React, { Component } from 'react'
import axios from 'axios'
import edjsParser from 'editorjs-parser'
import HTMLReactParser from 'html-react-parser'

const customParsers = {
  image: function (data, config) {
    return `<img src="${data.file.url}" alt="${data.caption}" class="w-1/2" >`
  },
}

class ReadArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {},
    }
    this.getArticle = this.getArticle.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id } = this.props.match.params
      console.log(this.props.match.params)
      console.log('id: ' + id)
      const url = `http://localhost:5000/journals/${urlSlug}/${id}`
      const { data } = await axios.get(url)
      this.setState({ journal: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  getArticle () {
    const journal = this.state.journal
    if (journal === 'undefined' || Object.keys(journal).length === 0) return '...Loading'
    const parser = new edjsParser(undefined, customParsers)
    return parser.parse(journal.editorJSObject)
  }

  render () {
    const author = this.state.journal.author
    return (
      <div className="h-full md:mx-16 mx-4">
        <div className="flex flex-col h-full items-center py-2 my-4 w-full editor">
          <h1 className="text-3xl text-center">Written BY {author ? author : ''}</h1>
          {HTMLReactParser(`${this.getArticle()}`)}
        </div>
      </div>
    )
  }
}

export default ReadArticle
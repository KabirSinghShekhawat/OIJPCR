import React, { Component } from 'react'
import edjsParser from 'editorjs-parser'
import HTMLReactParser from 'html-react-parser'
import axios from 'axios'

class EditorJSParser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.Articles = this.Articles.bind(this)
  }

  async componentDidMount () {
    try {
      const {data}  = await axios.get('http://localhost:5000/editor')
      this.setState({ data: data })
    } catch (e) {
      throw new Error(e.message())
    }
  }

  Articles() {
    const ArticleList  = this.state.data
    if ( typeof ArticleList == 'undefined' || ArticleList.length === 0) return '...Loading'
    const parser = new edjsParser();
    console.log(ArticleList)
    return ArticleList.map((article) => {
      return parser.parse(article.editorJSObject)
    })
  }

  render () {
    return (
      <div className="border-2 shadow-lg px-4 py-2 mt-4 mx-4 w-11/12">
        {HTMLReactParser(`${this.Articles()}`)}
      </div>
    )
  }
}

export default EditorJSParser
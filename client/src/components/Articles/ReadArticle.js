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
    this.parseArticle = this.parseArticle.bind(this)
    this.journalHasLoaded = this.journalHasLoaded.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id } = this.props.match.params
      const url = `http://localhost:5000/journals/${urlSlug}/${id}`
      const { data } = await axios.get(url)
      this.setState({ journal: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  parseArticle () {
    if (!this.journalHasLoaded()) return '...Loading'
    const parser = new edjsParser(undefined, customParsers)
    return parser.parse(this.state.journal.editorJSObject)
  }

  journalHasLoaded () {
    const journal = this.state.journal
    return !(journal === 'undefined' || Object.keys(journal).length === 0);

  }

  render () {
    const journal = this.state.journal
    const author = journal.author
    const content = this.journalHasLoaded() ? journal.content : ''
    const WrittenBy =
            <h1 className="text-3xl text-center mb-4">
              Written BY - {author ? author : ''}
            </h1>

    return (
      <ReadContainer>
        {WrittenBy}
        {/*<ParseArticle article={this.parseArticle} />*/}
        {HTMLReactParser(content.toString())}
      </ReadContainer>
    )
  }
}

function ReadContainer (props) {
  return (
    <div className="h-full md:mx-16 mx-4">
      <div className="flex flex-col h-full items-center py-2 my-4 w-full editor">
        {props.children}
      </div>
    </div>
  )
}

function ParseArticle ({ article }) {
  const rawArticle = article().toString()
  return (
    <>
      {HTMLReactParser(rawArticle)}
    </>
  )
}

export default ReadArticle
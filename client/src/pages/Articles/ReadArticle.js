import React, { Component } from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import UTCToFormalDate from '../../utils/DateTime'
import member_1 from '../../assets/teamMembers/member_1.jpg'

class ReadArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {},
    }
    this.journalHasLoaded = this.journalHasLoaded.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id } = this.props
      const url = `http://localhost:5000/journals/${urlSlug}/${id}`
      const { data } = await axios.get(url)
      this.setState({ journal: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  journalHasLoaded () {
    const journal = this.state.journal
    return !(journal === 'undefined' || Object.keys(journal).length === 0)

  }

  render () {
    const journal = this.state.journal
    const author = journal.author
    const content = this.journalHasLoaded() ? journal.content : ''
    // convert createdAt into formal Date
    const date = UTCToFormalDate(journal.createdAt)
    // format date
    const publishedDate = (
      <span className="text-sm text-gray-700 leading-3">
        Published {`${date.month} ${date.day}`}
        <sup>{date.superScript} </sup>
        {date.year}
      </span>
    )

    return (
      <ReadContainer>
        <h1 className="text-center font-black mb-4">
          <span className="text-3xl md:text-5xl">{journal.title}</span>
        </h1>

        <div className="flex flex-row justify-center py-1">
          <img src={member_1} alt="Author" className="h-16 w-16 inline rounded-full"/>
          <h2 className="text-base text-center font-semibold inline py-4 ml-4">
            <span className="text-base block leading-3">by {author ? author : ''}</span>
            {publishedDate}
          </h2>
        </div>

        <div className="my-4 flex flex-row justify-center">
          <img src={journal.cover} alt="Article Cover" className="w-full md:w-3/4 h-98 rounded-lg"/>
        </div>
        {HTMLReactParser(content.toString())}
      </ReadContainer>
    )
  }
}

function ReadContainer (props) {
  return (
    <div className="h-full md:mx-16 mx-4">
      <div className="flex flex-col h-full py-2 my-4 w-full editor">
        {props.children}
      </div>
    </div>
  )
}

export default ReadArticle
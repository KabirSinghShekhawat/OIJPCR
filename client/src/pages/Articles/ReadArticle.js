import React, { Component } from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import UTCToFormalDate from '../../utils/DateTime'
import member_1 from '../../assets/teamMembers/member_1.jpg'
import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import shareIcon from '../../assets/shareIcons/shareLink.svg'
import ArticleCardSmall from '../../components/Cards/ArticleCardSmall'
import SubmitArticleFormFullWidth from '../Archive/SubmitArticleFormFullWidth'

class ReadArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {},
      moreJournals: {},
    }
    this.journalHasLoaded = this.journalHasLoaded.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id} = this.props
      const url = `http://localhost:5000/journals/${urlSlug}/${id}`
      const { data: journal } = await axios.get(url)
      const volume = journal.volume
      const moreJournalsUrl = `http://localhost:5000/journals/limit/${volume}/${3}`
      const { data: moreJournals } = await axios.get(moreJournalsUrl)
      this.setState({
        journal: journal,
        moreJournals: moreJournals,
      })
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
        <ShareArticleLinks/>
        <div className="lg:mx-4 mt-16">
          {HTMLReactParser(content.toString())}
        </div>
        <Tags tags={journal.tags}/>
        <MoreArticles journals={this.state.moreJournals}/>
        <SubmitArticleFormFullWidth />
      </ReadContainer>
    )
  }
}

function ReadContainer (props) {
  return (
    <div className="h-full md:mx-16 mx-4 relative">
      <div className="flex flex-col h-full py-2 my-4 w-full editor">
        {props.children}
      </div>
    </div>
  )
}

function ShareArticleLinks () {
  const links = [
    {
      url: 'https://www.twitter.com',
      img: twitter,
      alt: 'Twitter',
    },
    {
      url: 'https://www.linkedin.com',
      img: linkedin,
      alt: 'LinkedIn',
    },
    {
      url: 'https://www.google.com',
      img: shareIcon,
      alt: 'shareable link',
    },
  ]
  return (
    <div className="fixed right-0 z-50 bg-white shadow-xl rounded-sm top-1/2 p-1">
      <div className="flex flex-col">
        {links.map((link, index) => {
          return (
            <a href={link.url} className="mx-2 my-2 block" key={index}>
              <img src={link.img} className="h-6 w-6" alt={link.alt}/>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function Tags ({ tags }) {
  return (
    <div className="my-10">
      {
        tags?.split(', ').map(
          (tag, index) => {
            return (
              <span
                key={index}
                className="mx-4 px-4 py-2 font-semibold text-gray-900 bg-gray-300">
            {tag}
          </span>
            )
          })
      }
    </div>
  )
}

function MoreArticles ({journals}) {
  return (
    <div className="my-4">
      <h1 className="text-2xl primary-color font-bold border-b-2 border-gray-900">
        More from this volume
      </h1>
      <div className="flex flex-col md:flex-row justify-evenly my-4">
        { journals?.length > 1 ?
          journals?.map(
            (journal) => {
            const journalProps = {
              id: journal._id,
              coverPhoto: journal.cover,
              cname: {
                container: '',
                button: 'mt-10 flex flex-wrap',
              },
              ...journal,
            }
            return (
              <ArticleCardSmall {...journalProps} key={journal._id}/>
            )
          }) :
          ''
        }
      </div>
    </div>
  )
}


export default ReadArticle
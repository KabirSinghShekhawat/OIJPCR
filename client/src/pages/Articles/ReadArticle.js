import React, { Component } from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import UTCToFormalDate from '../../utils/DateTime'
import female_avatar from '../../assets/teamMembers/female_avatar.svg'
import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import shareIcon from '../../assets/shareIcons/shareLink.svg'
import ArticleCardSmall from '../../components/Cards/ArticleCardSmall'
import SubmitArticleFormFullWidth from '../Archive/SubmitArticleFormFullWidth'
import config from '../../config/config'

class ReadArticle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {},
      moreJournals: {},
    }
    this.journalHasLoaded = this.journalHasLoaded.bind(this)
    this.handleClickOtherArticle = this.handleClickOtherArticle.bind(this)
  }

  async componentDidMount () {
    try {
      const { urlSlug, id} = this.props
      const url = `${config.host}journals/${urlSlug}/${id}`
      const { data: journal } = await axios.get(url)
      const volume = journal.volume
      const moreJournalsUrl = `${config.host}journals/limit/${volume}/${3}`
      const { data: moreJournals } = await axios.get(moreJournalsUrl)
      this.setState({
        journal: journal,
        moreJournals: moreJournals,
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  async handleClickOtherArticle(url) {
    const { urlSlug, id} = url
    const articleURL = `${config.host}journals/${urlSlug}/${id}`
    const { data: journal } = await axios.get(articleURL)
    this.setState({
      journal: journal,
    })

    try {
      window.scroll({
        top: -10,
        left: 0,
        behavior: 'smooth',
      })
    } catch (e) {
      // fallback for older browsers
      window.scrollTo(0, 0)
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
          <span className="text-3xl md:text-5xl">
            {journal.title}
          </span>
        </h1>

        <div className="flex flex-row justify-center py-1">
          <img src={journal?.authorPhoto || female_avatar}
               className="h-16 w-16 inline rounded-full object-cover"
               alt="Author"
          />
          <h2 className="text-base text-center font-semibold inline py-4 ml-4">
            <span className="text-base block leading-3">
              by {author ? author : ''}
            </span>
            {publishedDate}
          </h2>
        </div>

        <div className="my-4 flex flex-row justify-center">
          <img src={journal.cover}
               className="w-full md:w-3/4 h-98 rounded-lg"
               alt="Article Cover"
          />
        </div>

        <ShareArticleLinks/>
        <div className="lg:mx-4 mt-16">
          {HTMLReactParser(content.toString())}
        </div>

        <Tags tags={journal.tags}/>
        <MoreArticles
          journals={this.state.moreJournals}
          handleClick={this.handleClickOtherArticle}
          path={this.props.path}
        />
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
    <div className="my-10 flex flex-wrap flex-row">
      {
        tags?.split(', ').map(
          (tag, index) => {
            return (
              <span
                key={index}
                className="mx-4 my-2 px-4 py-2 block font-semibold text-gray-900 bg-gray-300">
            {tag}
          </span>
            )
          })
      }
    </div>
  )
}

function MoreArticles ({journals, path, handleClick}) {
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
              <ArticleCardSmall
                {...journalProps}
                handleClick={handleClick}
                key={journal._id}
                path={path}
              />
            )
          }) :
          'No articles available'
        }
      </div>
    </div>
  )
}


export default ReadArticle
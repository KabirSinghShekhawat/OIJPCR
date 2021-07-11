import { Component } from 'react'
import { ArticleCard } from './ArticleCard'

class About extends Component {
  render () {
    return (
      <div className="flex-grow">
        <ArticleCard/>
      </div>
    )
  }
}

export default About
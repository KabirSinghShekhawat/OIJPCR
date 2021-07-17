import { Component } from 'react'
import ArticleCard from '../Home/ArticleCard'
import coverPhoto from '../../assets/r1_c1.jpg'

class About extends Component {
  render () {
    const slug = 'Economists have long held that a peaceful environment obtained under the rule of law is absolutely vital for an economy to thrive. These are of course necessary conditions for that to happen, not sufficient ones. To thrive businesses need a certain environment where planning is possible and decisi…'
    const title = 'Economics and Resolution of Conflicts'
    return (
      <div className="flex-grow">
        <ArticleCard coverPhoto={coverPhoto} author="Jyoti M. Pathania" volume={1} title={title} slug={slug}/>
      </div>
    )
  }
}

export default About
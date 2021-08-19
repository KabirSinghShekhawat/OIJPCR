import Podcast from '../components/Home/Podcast/Podcast'
import MeetTheTeam from '../components/About/MeetTheTeam'
import { headingText, aboutText, teamMembers } from '../components/About/helpers'

function About () {
  return (
    <div className="flex-grow">
      <AboutContainer>
        <Heading>
          {headingText}
        </Heading>
        <Description>
          {aboutText}
        </Description>
        <MeetTheTeam teamMembers={teamMembers}/>
        <Podcast/>
      </AboutContainer>
    </div>
  )
}

function AboutContainer (props) {
  return (
    <div className="sm:mx-8 mx-4 mt-8 mb-4 md:mx-8 md:mt-8 md:mb-6">
      {props.children}
    </div>
  )
}

function Heading (props) {
  return (
    <h1 className="text-3xl text-left md:text-6xl font-bold primary-color">
      {props.children}
    </h1>
  )
}

function Description (props) {
  return (
    <p className="mt-8">
      {props.children}
    </p>
  )
}

export default About
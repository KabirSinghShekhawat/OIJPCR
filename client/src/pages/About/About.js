import Podcast from '../../components/Home/Podcast/Podcast'
import { headingText, aboutText, teamMembers } from './helpers'


function About () {
  return (
    <div className="flex-grow">
      <AboutContainer>
        <h1 className="text-3xl text-left md:text-6xl font-bold primary-color">
          {headingText}
        </h1>
        <p className="mt-8">
          {aboutText}
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left font-bold mt-16">
          Meet the team
        </h3>
        <div className="flex flex-col flex-wrap lg:flex-row lg:justify-around my-8">
          {teamMembers.map((member) => { return <TeamMemberCard {...member} /> })}
        </div>
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

function TeamMemberCard ({name, position, description, profilePhoto, }) {
  return (
    <div className="flex items-center justify-center my-4 md:my-4 md:mx-4">
      <figure className="relative max-w-xs cursor-pointer">
        <img className="h-80 md:h-96 rounded-lg"
             src={profilePhoto}
             alt={name}
        />
          <figcaption className="absolute inset-0 text-gray-900 px-4 pb-4 opacity-0 hover:opacity-90 hover:bg-gray-50 duration-300">
            <div className="mt-2 md:mt-8 mb-2">
              <h5 className="text-2xl font-bold text-center" >{name}</h5>
            </div>
            <div className="mt-2 mb-2">
              <h6 className="text-xl font-semibold text-center" >{position}</h6>
            </div>
            <div>
              <p className="text-md leading-snug">{description}</p>
            </div>
          </figcaption>
      </figure>
    </div>
  )
}

export default About
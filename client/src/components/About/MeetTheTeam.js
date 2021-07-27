import TeamMemberCard from './TeamMemberCard'

function MeetTheTeam({teamMembers}) {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left font-bold mt-16">
        Meet the team
      </h3>
      <div className="flex flex-col flex-wrap lg:flex-row lg:justify-around my-8">
        {teamMembers.map((member) => { return <TeamMemberCard {...member} /> })}
      </div>
    </>
  )
}

export default MeetTheTeam
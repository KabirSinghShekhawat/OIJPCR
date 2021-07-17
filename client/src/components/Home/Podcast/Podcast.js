import * as PodcastCovers from './PodcastIcons'
import { PodcastLinks } from './Links'
import { Container, Body } from './PodcastContainers'
import Cover from './Cover'
import Description from './Description'
import PodcastPlatforms from './Platforms'

export default function Podcast () {
  return (
    <Container>
      <Cover cover={PodcastCovers.cover}/>
      <Body>
        <Description/>
        <PodcastPlatforms covers={PodcastCovers} links={PodcastLinks}/>
      </Body>
    </Container>
  )
}



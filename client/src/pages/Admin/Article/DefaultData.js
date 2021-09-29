import config from '../../../config/config'

export const NewArticleProps = {
  initialValue: 'initial Content',
  author: 'Anonymous',
  title: 'OIJPCR Article',
  slug: 'This is an Article',
  volume: 1,
  cover: `${config.host}editor/images/article_cover_fallback.jpg`,
}
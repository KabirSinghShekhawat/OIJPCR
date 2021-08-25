import config from '../../../config/config'
// backend endpoint for url data fetching
const linkFetcherEndpoint = `${config.host}editor/fetchUrl`

export const LinkConfig = {
  endpoint: linkFetcherEndpoint,
}
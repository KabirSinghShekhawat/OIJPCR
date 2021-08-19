import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
// Configs
import { HeaderConfig } from './HeaderConfig'
import { ImageConfig } from './ImageConfig'
import { LinkConfig } from './LinkConfig'

// id of <div> that will hold the editor
const holder = 'editor'
const logLevel = 'ERROR'

export const config = {
  journals: {},
  holder: holder,
  tools: {
    image: {
      class: ImageTool,
      config: { ...ImageConfig },
    },
    header: {
      class: Header,
      config: { ...HeaderConfig },
      shortcut: 'CTRL+SHIFT+H',
    },
    linkTool: {
      class: LinkTool,
      config: { ...LinkConfig },
    },
  },
  logLevel: logLevel,
}
import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'

export const config = {
  journals: {},
  holder: 'editor',
  tools: {
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:5000/editor/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:5000/editor/fetchUrl', // Your endpoint that provides uploading by Url
        },
        field: 'image',
        types: 'image/*',
      },
    },
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 1,
      },
      shortcut: 'CTRL+SHIFT+H',
    },
    linkTool: {
      class: LinkTool,
      // config: {
      //   endpoint: 'http://localhost:8008/editor/fetchUrl',
      // Your backend endpoint for url data fetching
      // }
    },
  },
  logLevel: 'ERROR',
}
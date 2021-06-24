import logo from './logo.svg';
import './App.css';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

function App() {
  const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: {
        class: Header,
        config:{
          placeholder: 'Enter a header',
          levels: [1,2,3,4,5,6],
          defaultLevel: 3
        },
        shortcut: "CTRL+SHIFT+H"
      },
      linkTool: {
        class: LinkTool,
        // config: {
        //   endpoint: 'http://localhost:8008/fetchUrl',
        // Your backend endpoint for url data fetching
        // }
      },
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: 'http://localhost:5000/uploadFile', // Your backend file uploader endpoint
            byUrl: 'http://localhost:5000/fetchUrl', // Your endpoint that provides uploading by Url
          },
          field: 'image',
          types: 'image/*'
        }
      }
    }
  });
  return (
     <div id="editorjs"></div>
  );
}

export default App;

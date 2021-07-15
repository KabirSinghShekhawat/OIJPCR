import { Component } from 'react'
import EditorJSParser from '../EditorJS/EditorJSParser'

class Archive extends Component {
  render () {
    return (
      <div className="flex-grow">
        <EditorJSParser/>
      </div>
    )
  }
}

export default Archive
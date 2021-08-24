import { Component } from 'react'
import PopUp from '../components/utils/Popup'

class SubmitArticle extends Component {
  render () {
    return (<div className="flex-grow">
      <PopUp
        heading="SubmitArticle"
        text="By submitting an article you agree to T&C"
        buttonText="Submit"
        buttonColor=""
      />
    </div>)
  }
}

export default SubmitArticle
import { Component } from 'react'
import FormContainer from './Form/FormContainer'
import FormField from './Form/FormField'
import UploadFile from './Form/UploadFile'
import { Button, ButtonGroup } from './Form/FormButtons'

class EditorForm extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  onFileChange (evt) {
    this.props.onFileChange(evt)
  }

  handleDelete () {
    this.props.handleDelete()
  }

  handleSubmit (evt) {
    this.props.handleSubmit(evt)
  }

  handleChange (evt) {
    this.props.handleChange(evt)
  }

  render () {
    const {
            author,
            title,
            slug,
            volume,
            tags,
            isEdit  = false,
            heading = 'Submit Form',
          } = this.props
    return (
      <FormContainer heading={heading} handleSubmit={this.handleSubmit}>
        {/* Author */}
        <FormField name="author" value={author} label="Author" handleChange={this.handleChange}/>
        {/* Title */}
        <FormField name="title" value={title} label="Title" handleChange={this.handleChange}/>
        {/*Slug*/}
        <FormField name="slug" value={slug} label="Slug" handleChange={this.handleChange}/>
        {/*tags*/}
        <FormField name="tags" value={tags} label="Tags" handleChange={this.handleChange}/>
        {/*Volume*/}
        <FormField name="volume" value={volume} label="Volume" handleChange={this.handleChange}
                   type="number"
                   min={0}
        />
        {/*Article Cover Image upload*/}
        <UploadFile
          name="articleCoverImage"
          label="Article Cover Image"
          onFileChange={this.onFileChange}
        />
        {/* Author Profile pic upload*/}
        <UploadFile
          name="authorImage"
          label="Author Profile Pic"
          onFileChange={this.onFileChange}
        />
        {this.props.children}
        {
          isEdit
            ?
            <ButtonGroup
              handleSubmit={this.handleSubmit}
              handleDelete={this.handleDelete}
            />
            :
            <Button handleClick={this.handleSubmit} cname="primary-color-bg text-white">
              Save Data
            </Button>
        }
      </FormContainer>
    )
  }
}

export default EditorForm
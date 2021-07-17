import { Component } from 'react'

class EditorForm extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (evt) {
    this.props.handleSubmit(evt)
  }

  handleChange (evt) {
    this.props.handleChange(evt)
  }

  render () {
    const { author, title, slug, volume } = this.props
    return (
      <FormContainer heading="Submit Form" handleSubmit={this.handleSubmit}>
        {/* Author */}
        <FormField name="author" value={author} label="Author" handleChange={this.handleChange}/>
        {/* Title */}
        <FormField name="title" value={title} label="Title" handleChange={this.handleChange}/>
        {/*Slug*/}
        <FormField name="slug" value={slug} label="Slug" handleChange={this.handleChange}/>
        {/*Volume*/}
        <FormField name="volume" value={volume} label="Volume" handleChange={this.handleChange}
                   type="number"
                   min={0}
        />
        <Button text="Save Data" handleClick={this.handleSubmit}/>
      </FormContainer>
    )
  }
}

function FormContainer (props) {
  const { heading, handleSubmit } = props
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-5/6 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">{heading}</h1>
        <form onSubmit={handleSubmit} method="POST">
          {props.children}
        </form>
      </div>
    </div>
  )
}

function FormField ({ name, label, type, value, min, handleChange }) {
  const minVal = type === 'number' ? `min=${min}` : false
  return (
    <div className="flex flex-col mb-4">
      <label
        className="mb-2 font-bold text-lg text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="border py-2 px-3 text-grey-800"
        type={type ? type : 'text'}
        {...minVal}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  )
}

function Button ({ handleSubmit, text }) {
  return (
    <button
      className="block primary-color-bg text-white uppercase text-xl font-bold mx-auto p-4 rounded mt-8 w-64"
      type="submit"
      onClick={handleSubmit}
    > {text}
    </button>
  )
}

export default EditorForm
import { Component } from 'react'

class EditorForm extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
    const { author, title, slug, volume, isEdit=false } = this.props
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

function FormContainer (props) {
  const { heading, handleSubmit } = props
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full bg-white rounded shadow-2xl p-8 m-4">
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

function ButtonGroup ({ handleSubmit, handleDelete }) {
  return (
    <div className="flex flex-row justify-center">
      <Button handleClick={handleSubmit} cname="primary-color-bg text-white">
        Save Data
      </Button>
      <Button handleClick={handleDelete} cname="bg-red-600 text-white">
        Delete Article
      </Button>
    </div>
  )
}

function Button (props) {
  const { handleClick, cname } = props
  const btnCN = cname +
    ' block uppercase text-xl font-bold mx-auto p-4 rounded mt-8 w-64'
  return (
    <button
      className={btnCN}
      type="submit"
      onClick={handleClick}
    > {props.children}
    </button>
  )
}

export default EditorForm
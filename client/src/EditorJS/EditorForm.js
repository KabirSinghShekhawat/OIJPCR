import { Component } from 'react'

class EditorForm extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    this.props.handleSubmit(evt);
  }

  handleChange(evt) {
  this.props.handleChange(evt);
  }

  render() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
          <div className="w-5/6 bg-white rounded shadow-2xl p-8 m-4">
            <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Submit Form</h1>
            <form onSubmit={this.handleSubmit} method="POST">
              {/*AUTHOR*/}
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="first_name">Author</label>
                <input className="border py-2 px-3 text-grey-800" type="text" id="first_name"
                  value={this.props.author}
                  name="author"
                  onChange={this.handleChange}
                />
              </div>
              {/*Title*/}
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="title">Title</label>
                <input className="border py-2 px-3 text-grey-800" type="text" id="title"
                       value={this.props.title}
                       name="title"
                       onChange={this.handleChange}
                />
              </div>
              {/*Slug*/}
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="slug">Slug</label>
                <input className="border py-2 px-3 text-grey-800"  id="slug" type="text"
                       value={this.props.slug}
                       name="slug"
                       onChange={this.handleChange}
                />
              </div>
              {/*Volume*/}
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="volume">Volume</label>
                <input className="border py-2 px-3 text-grey-800"  id="volume" type="number"
                       value={this.props.volume}
                       name="volume"
                       onChange={this.handleChange}
                       min="0"
                />
              </div>

              <button className="block primary-color-bg text-white uppercase text-xl font-bold mx-auto p-4 rounded mt-8 w-64"
                      type="submit"
                      onClick={this.handleSubmit}
              > Save Data
              </button>
            </form>
          </div>
        </div>
      )
    }
  }

  export default EditorForm
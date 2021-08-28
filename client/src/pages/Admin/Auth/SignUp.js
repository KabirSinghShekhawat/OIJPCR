import { useFormFields } from './FormHooks'
import { useContext } from 'react'
import axios from 'axios'
import config from '../../../config/config'
import {
  FormContainer,
  FormHeading,
  FormField,
  Form, FormButton,
} from './Form'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../../UserContext'

const SignUp = () => {
  const { token, setToken } = useContext(UserContext)

  const [fields, handleFieldChange] = useFormFields({
    username: '',
    password: '',
    admin_key: '',
  })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const url = `${config.host}admin/signup`

    const formData = {
      username: fields.username,
      password: fields.password,
      key: fields.admin_key,
    }

    const { data } = await axios.post(url, { ...formData })

    const newToken = data?.token
    localStorage.setItem('jwt', newToken)
    setToken(newToken)
  }

  if (token) {
    return <Redirect to="/admin"/>
  }

  return (
    <FormContainer
      cname="px-4 py-2 px-1 md:py-2 md:px-8"
    >
      <FormHeading heading="Sign Up"/>
      <Form handleSubmit={handleSubmit}>
        <FormField
          id="username"
          label="Username"
          type="text"
          value={fields.username}
          name="username"
          handleFieldChange={handleFieldChange}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={fields.password}
          name="password"
          handleFieldChange={handleFieldChange}
        />
        <FormField
          id="admin_key"
          label="Admin Key"
          type="password"
          value={fields.admin_key}
          name="key"
          handleFieldChange={handleFieldChange}
        />
        <FormButton text="Submit"/>

        <div className="mt-12 text-center md:mt-0 md:text-left">
          <Link to="/login" className="text-indigo-700 underline">
            Already a user? Login instead
          </Link>
        </div>
      </Form>
    </FormContainer>
  )
}

export default SignUp
import { useFormFields } from './FormHooks'
import { useContext} from 'react'
import axios from 'axios'
import config from '../../../config/config'
import {
  FormContainer,
  FormHeading,
  FormField,
  Form, FormButton,
} from './Form'
import { Redirect} from 'react-router-dom'
import { UserContext } from '../../../UserContext'

const Login = () => {
  const { value, setValue } = useContext(UserContext)

  const [fields, handleFieldChange] = useFormFields({
    username: '',
    password: '',
  })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const url = `${config.host}admin/login`

    const formData = {
      username: fields.username,
      password: fields.password,
    }

    const headerConfig = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      url,
      { ...formData },
      headerConfig,
    )
    setValue(data?.token)
  }

  if (value) {
    return <Redirect to="/admin"/>
  }

  return (
    <FormContainer>
      <FormHeading heading="Login"/>
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
        <FormButton text="Submit"/>
      </Form>
    </FormContainer>
  )
}

export default Login
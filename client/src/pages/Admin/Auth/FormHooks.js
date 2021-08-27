import { useState } from 'react'

const useFormFields = (initialState) => {
  const [fields, setFields] = useState(initialState)

  return [
    fields, (evt) => {
      evt.preventDefault()
      setFields({
        ...fields,
        [evt.target.id] : evt.target.value
      })
    }
  ]
}

export {useFormFields}
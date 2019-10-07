import { useState, useEffect } from 'react'

export const useFormValidation = (initialValues, validate, formCallback) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isDataSubmitting, setIsDataSubmitting] = useState(false)

  // as a result (side effect) of isDataSubmitting changing, do this.
  // as a side effect of the value of errors changing,
  // check if there are not errors and if so, call the callback function.
  useEffect(() => {
    if (isDataSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) formCallback()
      setIsDataSubmitting(false)
    }
  }, [errors, isDataSubmitting, formCallback])

  const handleChange = event => {
    if (event) {
      event.persist()
      setValues({
        ...values,
        [event.target.name]: event.target.value
      })
    }
  }

  const handleSubmit = event => {
    if (event) event.preventDefault()
    setIsDataSubmitting(true)
    setErrors(validate(values))
  }

  return [values, errors, isDataSubmitting, handleChange, handleSubmit]
}

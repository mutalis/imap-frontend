import React, {useState, useEffect} from 'react'
import * as R from 'ramda'
import { validateEmail } from './EmailValidationRules'

export const Email = ({emailId=null, username='username undefined', quota=0, modifyEmailUrl=R.identity, deleteEmail=R.identity} = {}) => {
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState({quota, password: '', passwordConfirmation: ''})
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    // setError(validate(quota))
  }, [])

  const handleChange = event => {
    if (event) {
      event.persist()
      setEmail(prevEmail => ({
        ...prevEmail,
        [event.target.name]: event.target.value.trim(),
      }))
    }
  }

  const updateEmail = event => {
    event.preventDefault()
    const attrName = event.target.elements[0].attributes.name.value
    const attrError = validateEmail(email, attrName)
    setErrors(attrError)
    if (R.isEmpty(attrError))
    {
      const config = {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          [attrName]: email[attrName]
        }),
      }
      console.log('Body payload:',config.body)
      modifyEmailUrl(config)
      .then(response => response.json())
      .then(jsonEmail => {
        setEmail(prevEmail => ({
          ...prevEmail,
          [attrName]: jsonEmail[attrName],
        }))
        console.log('JsonEmail:',jsonEmail)
      })
      .catch(error => console.log('Update error:',error))
    }
  }

  return (
    <>
    <tr>
      <td data-testid='username'>{username}</td>
        <td>
          <form onSubmit={updateEmail}>
            <input type='number' name='quota' value={email.quota} data-testid='quota' required onChange={handleChange} style={{width: 40}} />
            <button type='submit'>Update</button>
          </form>
        </td>
        <td><button onClick={() => deleteEmail(emailId)}>Delete</button></td>
        <td>
         {showPasswordForm ? (
          <form onSubmit={updateEmail}>
            <input type='password' name='password' value={email.password} data-testid='password' required onChange={handleChange} size='10'/>
            <input type='password' name='passwordConfirmation' value={email.passwordConfirmation} data-testid='passwordConfirmation' required onChange={handleChange} size='10'/>
            <button type='submit'>Change Password</button>
            <button type='button' onClick={() => setShowPasswordForm(false)}>Cancel</button>
          </form>
          ) : (
            <button type='button' onClick={() => setShowPasswordForm(true)}>Change Password</button>
          )}
        </td>
    </tr>
    <tr><td className='error-text'>{errors.quota && errors.quota}</td></tr>
    <tr><td className='error-text'>{errors.password && errors.password}</td></tr>
    </>
  )
}

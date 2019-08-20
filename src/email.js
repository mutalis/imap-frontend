import React, {useState, useEffect} from 'react'
import * as R from 'ramda'

export const Email = ({emailId=null, username='username undefined', quota=0, modifyEmailUrl=R.identity, deleteEmail=R.identity} = {}) => {
  const [error, setError] = useState(null)
  const [email, setEmail] = useState({quota, password: ''})
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    // setError(validate(quota))
  }, [])

  const validate = value => {
    const maxUserQuota = 50
    const availableDomainQuota = 70
    const number = Number(value)

    // not empty value
    if (value === '') return 'Enter a number'
    // is a number
    else if (isNaN(number)) return 'It must be a number'
    // is a positive number
    else if (number < 0) return 'It must be a positive number'
    // check available quota per domain
    else if (number > availableDomainQuota) return `It must be at most ${availableDomainQuota}`
    // check maximum quota allowed per user
    else if (number > maxUserQuota) return `It must be at most ${maxUserQuota}`
    // no error
    else return ''
  }

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
    const attrError = validate(email.quota)
    // const attrError = ''
    setError(attrError)
    if (!attrError) 
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
          [attrName]: email[attrName],
        }))
        // setError(attrError) // removes error message
        console.log(email)
      })
      .catch(error => console.log('UpdateQuota error:',error))
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
            <button type='submit'>Change Password</button>
            <button type='button' onClick={() => setShowPasswordForm(false)}>Cancel</button>
          </form>
          ) : (
            <button type='button' onClick={() => setShowPasswordForm(true)}>Change Password</button>
          )}
        </td>
    </tr>
    <tr><td className='error-text'>{error && error}</td></tr>
    </>
  )
}

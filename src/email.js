import React, {useState, useEffect} from 'react'
import * as R from 'ramda'

export const Email = ({emailId=null, username='username undefined', quota=0, modifyEmail=R.identity, deleteEmail=R.identity} = {}) => {
  const [error, setError] = useState(null)
  const [quotaUsed, setQuota] = useState(quota)

  useEffect(() => {
    setError(validate(quota))
  }, [quota])

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
      // console.log(event.target.value.trim())
      event.persist()
      setQuota(event.target.value.trim())
      console.log(event.target.value.trim())
    }
  }

  const updateQuota = event => {
    event.preventDefault()
    const newQuota = event.target.elements.quota.value.trim()
    const quotaError = validate(newQuota)
    
    if (quotaError) setError(quotaError)
    else {
      console.log('Sub:',newQuota)
      const config = {
        method: 'PATCH',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          quota: newQuota
        }),
        // mode: 'no-cors',
      }
      modifyEmail(config)
      .then(response => response.json())
      .then(jsonEmail => {
        setQuota(jsonEmail.quota)
        setError(quotaError)
      })
      .catch(error => console.log('UpdateQuota error:',error))
    }

  }

  return (
    <>
    <tr>
      <td data-testid='username'>{username}</td>
        <td>
          <form onSubmit={updateQuota}>
            <input type='number' name='quota' value={quotaUsed} data-testid='quota' required onChange={handleChange} />
            <button type='submit'>Update</button>
          </form>
        </td>
        <td><button onClick={event => deleteEmail(event,emailId)}>Delete</button></td>
        <td><button>Change Password</button></td>
    </tr>
    <tr><td className='error-text'>{error && error}</td></tr>
    </>
  )
}

import React, {useState, useEffect} from 'react'
import * as R from 'ramda'

export const Email = ({username='username undefined', quota=0, updateEmail=R.identity} = {}) => {
  const [error, setError] = useState(null)
  const [quotaUsed, setQuota] = useState(quota)

  useEffect(() => {
    setError(validate(quota))
  }, [quota])

  const validate = value => {
    const maxUserQuota = 50
    const availableDomainQuota = 7
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
      setQuota(event.target.value.trim())
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newQuota = event.target.elements.quota.value
    setError(validate(newQuota))
    if (error === '') {
      updateEmail(newQuota)
    }
  }

  const deleteEmail = () => {
    updateEmail()
  }

  return (
    <>
    <tr>
      <td data-testid='username'>{username}</td>
        <td>
          <form onSubmit={handleSubmit}>
            <input type='number' name='quota' value={quotaUsed} data-testid='quota' required onChange={handleChange} />
            <button type='submit'>Update</button>
          </form>
        </td>
        <td><button onClick={deleteEmail}>Delete</button></td>
    </tr>
    <tr><td className='error-text'>{error && error}</td></tr>
    </>
  )
}

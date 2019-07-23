import React, {useState} from 'react'

export const Email = ({username='username undefined', quota=0} = {}) => {
  const [error, setError] = useState('')
  const [quotaUsed, setQuota] = useState(quota)

  const validate = value => {
    const maxUserQuota = 50
    const maxDomainQuota = 7
    const number = Number(value)

    // not empty value
    if (value === '') return 'Enter a number'
    // is a number
    else if (isNaN(number)) return 'It must be a number'
    // is a positive number
    else if (number < 0) return 'It must be a positive number'
    // check maximum quota allowed per domain
    else if (number > maxDomainQuota) return `It must be at most ${maxDomainQuota}`
    // check maximum quota allowed per user
    else if (number > maxUserQuota) return `It must be at most ${maxUserQuota}`
   
  }

  const handleChange = event => {
    if (event) {
      setQuota(event.target.value.trim())
      setError(validate(quotaUsed))
    }
  }

  const handleBlur = () => setError(validate(quotaUsed))

  return (
    <tr>
      <td data-testid='username'>{username}</td>
      <td>
        <input type='number' name='quota' value={quotaUsed} data-testid='quota' required onChange={handleChange} onBlur={handleBlur} />
      </td>
      <td className='error-text'>{error && error}</td>
    </tr>
  )
}

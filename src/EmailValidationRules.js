export const validateEmail = (values, attrName) => {
  // Email Errors
  let errors = {}
  // if (!values.email) {
  //   errors.email = 'Email address is required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }

  switch (attrName) {
    case 'username':
      if (!(/^[a-z]{1,1}([a-z\d.-]){0,61}$/.test(values.username))) errors.username = 'Invalid username'
      break
    case 'password':
      if (!values.password) errors.password = 'Required Password'
      else if (values.password.length < 8) errors.password = 'Password must be at least 8 characters'
      else if (values.password !== values.passwordConfirmation) errors.password = 'Passwords must match'
      break
    case 'quota':
      const maxUserQuota = 50
      const availableDomainQuota = 70
      const quota = Number(values.quota)

      // not empty value
      if (values.quota === '') errors.quota = 'Enter a number'
      // is a number
      else if (isNaN(quota)) errors.quota = 'It must be a number'
      // is an integer
      else if (!Number.isInteger(quota)) errors.quota = 'It must be a integer number'
      // is a positive number
      else if (quota < 0) errors.quota = 'It must be a positive number'
      // check available quota per domain
      else if (quota > availableDomainQuota) errors.quota = `It must be at most ${availableDomainQuota}`
      // check maximum quota allowed per user
      else if (quota > maxUserQuota) errors.quota = `It must be at most ${maxUserQuota}`
      break
    default:
      return errors
  }
  return errors
}

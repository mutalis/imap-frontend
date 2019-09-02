export const validate = (values, attrName=null) => {
  
  let errors = {} // values Errors
  const validateUsername = () => {
    if (!(/^[a-z]{1,1}([a-z\d.-]){0,61}$/.test(values.username))) errors.username = 'Invalid username'
  }

  const validateUsernameSearch = () => {
    if (!(/^[a-z]{1,1}([a-z\d.-]){0,61}$/.test(values.username))) errors.search = 'Invalid username'
  }

  const validatePassword = () => {
    if (!values.password) errors.password = 'Password is required'
    else if (values.password.length < 8) errors.password = 'Password must be at least 8 characters'
    else if (values.password !== values.passwordConfirmation) errors.passwordConfirmation = 'Passwords must match'
  }

  const validateQuota = () => {
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
  }

  if (!attrName) { // check all values attributes
    validateUsername()
    validatePassword()
    validateQuota()
  } else {
    switch (attrName) {
      case 'username':
        validateUsername()
        break
      case 'password':
        validatePassword()
        break
      case 'quota':
        validateQuota()
        break
      case 'usernamesearch':
        validateUsernameSearch()
        break
      default:
        return errors
    }
  }

  return errors
}

export const emailValidationRules = (operation, emails) => {
// returns a function based on the operation to perform.

  let errors = {} // values Errors
  const validateUsername = (values) => {
    if (!(/^[a-z]{1,1}([a-z\d.-]){0,61}$/.test(values.username))) errors.username = 'Invalid username'
  }

  const validateUsernameSearch = (values) => {
    if (!(/^[a-z]{1,1}([a-z\d.-]){0,61}$/.test(values.search))) errors.search = 'Invalid username'
    else errors.search = ''
    if (values.search === '') errors.search = ''
  }

  const validatePassword = (values) => {
    if (!values.password) errors.password = 'Password is required'
    else if (values.password.length < 8) errors.password = 'Password must be at least 8 characters'
    else if (values.password !== values.passwordConfirmation) errors.passwordConfirmation = 'Passwords must match'
  }

  const validateQuota = (values) => {
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

  switch (operation) {
    case 'create':
      const validateNew = values => {
        const emailId = emails.findIndex(e => e.username === values.username)
        const emailExists = emailId > -1
        if (emailExists) errors.username = `${values.username} already exists`
        else {// validate all the attributes
          validateUsername(values)
          validatePassword(values)
          validateQuota(values)
          return errors
        }
      }
      return validateNew
    case 'update':
      const validateUpdate = values => {
        validateQuota(values);
        (values.password || values.passwordConfirmation) && validatePassword(values)
        return errors
      }
      return validateUpdate
    case 'usernamesearch':
      const validateUserSearch = values => {
        validateUsernameSearch(values)
        return errors
      }
      return validateUserSearch
    default:
      return validateNew
  }
}

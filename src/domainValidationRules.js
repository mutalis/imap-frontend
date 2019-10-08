export const domainValidationRules = (operation, domains) => {
// returns a function based on the operation to perform.

  let errors = {} // values Errors
  const validateDomain = (values) => {
    if (!(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,13}$/.test(values.domainName))) errors.domainName = 'Invalid Domain'
  }

  const validateDomainSearch = (values) => {
    if (!(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,13}$/.test(values.search))) errors.search = 'Invalid Domain'
    else errors.search = ''
    if (values.search === '') errors.search = ''
  }

  const validateQuota = (values) => {
    const availableDomainQuota = 70
    const quota = Number(values.emailQuota)

    // not empty value
    if (values.emailQuota === '') errors.emailQuota = 'Enter a number'
    // is a number
    else if (isNaN(quota)) errors.emailQuota = 'It must be a number'
    // is an integer
    else if (!Number.isInteger(quota)) errors.emailQuota = 'It must be a integer number'
    // is a positive number
    else if (quota < 0) errors.emailQuota = 'It must be a positive number'
    // check available quota per domain
    else if (quota > availableDomainQuota) errors.emailQuota = `It must be at most ${availableDomainQuota}`
  }

  switch (operation) {
    case 'create':
      const validateNew = values => {
        const domainId = domains.findIndex(e => e.domainName === values.domainName)
        const domainExists = domainId > -1
        if (domainExists) errors.domainName = `${values.domainName} already exists`
        else {// validate all the attributes
          validateDomain(values)
          validateQuota(values)
          return errors
        }
      }
      return validateNew
    case 'update':
      const validateUpdate = values => {
        validateQuota(values)
        return errors
      }
      return validateUpdate
    case 'domainsearch':
      const validateDomainNameSearch = values => {
        validateDomainSearch(values)
        return errors
      }
      return validateDomainNameSearch
    default:
      return validateNew
  }
}

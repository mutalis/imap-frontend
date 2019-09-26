import React, { useState, useEffect } from 'react'
import { Email } from './email'
import { EmailForm } from './emailForm'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useFetch } from './useFetch'
import { emailValidationRules } from './emailValidationRules'

const fetch = require('node-fetch')

const validate = emailValidationRules('usernamesearch')

export const EmailList = ({domainName='1'}={}) => {
  const [emails, setEmails] = useState([])
  const [error, setSearchError] = useState({})
  const [email, setEmail] = useState({id: null, username: '', quota: 0, password: '', passwordConfirmation: ''})
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [createEmail, setCreateEmail] = useState(true)
  const [query, setQuery] = useState('')
  const [{data: fetchData, error: fetchError}, doFetch] = useFetch()

  useEffect(() => {
    let url = ''
    query==='' ? url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/${domainName}/emails`
    : url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/${domainName}/emails?username=${query}`

    doFetch({url, resource: {}})
  }, [domainName, doFetch, query] )

  useEffect(() => {
    setEmails(fetchData)
  }, [fetchData] )

  const modifyEmailUrl = emailId => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/${emailId}`
    return R.partial(fetch, [url])
  }

  const checkStatus = response => {
    if (response.status === 200) return Promise.resolve(response)
    else return Promise.reject(new Error(response.statusText))
  }

  const deleteEmail = emailId => {
    const config = {
      method: 'DELETE',
    }
    modifyEmailUrl(emailId)(config)
    .then(checkStatus)
    .then(response => {
      console.log(response.text())
      if (response.status === 200) setEmails(emails.filter(email => email.id !== emailId))
    })
    .catch(error => console.log('Delete Email error:',error))
  }

  const initializeEmail = (id, username, quota) => {
    setEmail({id, quota, username, password: '', passwordConfirmation: ''})
    setShowEmailForm(true)
    setCreateEmail(false)
  }

  const resetEmail = () => {
    setEmail({id: null, username: '', quota: 0, password: '', passwordConfirmation: ''})
    setShowEmailForm(false)
    setCreateEmail(true)
  }

  const emailComponents = () => emails.map(({id, username, quota}) => {
    const emailProps = {
      key: id,
      id,
      username,
      quota,
      // modifyEmailUrl: modifyEmailUrl(id),
      initializeEmail,
      deleteEmail,
    }
    return <Email {...emailProps} />
  })

  const emailFormProps = {
    initialEmail: email,
    emails,
    setEmails,
    createEmail,
    resetEmail,
  }

  return (
    <div className="container">
      <TextField
        type="text" 
        autoComplete="off"
        name="query"
        onChange={e => {setQuery(e.target.value); setSearchError(validate({search: query}))} }
        label={error.search ? error.search : 'Search by username'}
        fullWidth
        value={query}
        error={Boolean(error.search)}
      />
      <Typography align="center" variant="h5">Email List</Typography>
      { showEmailForm ? ( <EmailForm {...emailFormProps} />) :
        ( <AddCircleIcon style={{ color: 'green', float: 'right' }} onClick={() => {setShowEmailForm(true)}} />)
      }
      {emailComponents()}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Email } from './email'
import { validate } from './validationRules'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'

const fetch = require('node-fetch')

export const EmailList = ({domainName='1'}={}) => {
  const [emails, setEmails] = useState([])
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState({id: null, username: '', quota: 0, password: '', passwordConfirmation: ''})
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [createEmail, setCreateEmail] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let ignore = false
    let url = ''
    query==='' ? url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/${domainName}/emails`
    : url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/${domainName}/emails?username=${query}`

    getEmails(R.partial(fetch, [url]), ignore)

    // async function fetchData() {
    //   const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query)
    //   if (!ignore) setEmails(result.data)
    // }
    // fetchData()
    return () => { ignore = true }
  }, [domainName, query] )

  const getEmails = (listEmailsUrl, ignore) => {
    listEmailsUrl()
    .then(response => response.json())
    .then(jsonEmails => {
      console.log('Email lists:',jsonEmails)
      if (!ignore) setEmails(jsonEmails)
    })
    .catch(error => console.log('GetEmails error:',error))
    // const emails = [{id: 1, username: 'user 1', quota: 10}, {id: 2, username: 'user 2', quota: 20}]
    // setEmails(emails)
  }

  const modifyEmailUrl = emailId => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/${emailId}`
    return R.partial(fetch, [url])
  }

  const createEmailUrl = () => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/`
    return R.partial(fetch, [url])
  }

  const handleChange = event => {
    if (event) {
      event.persist()
      setEmail(prevEmail => ({
        ...prevEmail,
        [event.target.name]: event.target.value,
      }))
    }
  }

  const saveEmail = event => {
    event.preventDefault()
    let attrError = {}
    if (createEmail) {
      const emailId = emails.findIndex(e => e.username === email.username)
      const emailExists = emailId > -1
      emailExists ? attrError.username = `${email.username} already exists` : attrError = validate(email) // validate all the attributes
    } else {
      attrError = {
        ...validate(email, 'quota'),
        ...(email.password || email.passwordConfirmation) && validate(email, 'password'),
      }
    } console.log('EEE:',attrError)
    setErrors(attrError)

    if (R.isEmpty(attrError)) { // if not email errors
      if (createEmail) { // if user doesn't exist, create it
        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(email),
        }
        console.log('Body payload:',config.body)
        createEmailUrl()(config)
        .then(response => response.json())
        .then(jsonEmail => {
          setEmails(prevEmails => ([...prevEmails,jsonEmail]))
          console.log('JsonEmail:',jsonEmail)
        })
        .catch(error => console.log('Create email error:',error))
      } else { // if user exists, update it
        const payload = {quota: email.quota, ...((email.password) && {password: email.password})}
        console.log('Body:',payload)
        const config = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        }
        console.log('Body payload:',config.body)
        modifyEmailUrl(email.id)(config)
        .then(response => response.json())
        .then(jsonEmail => {
          const updatedEmails = emails.map(c => c.id === jsonEmail.id ? jsonEmail : c)
          setEmails(updatedEmails)
          console.log('JsonEmail:',jsonEmail)
        })
        .catch(error => console.log('Update email error:',error))
      }
      clearEmail()
    }
  }

  const deleteEmail = emailId => {
    // event.preventDefault()
    const config = {
      method: 'DELETE',
    }
    modifyEmailUrl(emailId)(config)
    .then(response => {
      console.log(response)
      if (response.status === 200) setEmails(emails.filter(email => email.id !== emailId))
    })
    .catch(error => console.log('Delete Email error:',error))
  }

  const initializeEmail = (id, username, quota) => {
    setEmail({id, quota, username, password: '', passwordConfirmation: ''})
    setShowEmailForm(true)
    setCreateEmail(false)
  }

  const clearEmail = () => {
    setEmail({username: '', quota: 0, password: '', passwordConfirmation: ''})
    setErrors({})
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

  return (
    <div className="container">
      <TextField
        type="text" 
        autoComplete="off"
        name="query"
        onChange={e => {setQuery(e.target.value); setErrors(validate({username: query}, 'usernamesearch'))} }
        label={errors.search ? errors.search : 'Search by username'}
        fullWidth
        value={query}
        error={Boolean(errors.search)}
      />
      <Typography align="center" variant="h5">
        Email List
      {/* New email Update email, change the quota or the password */}
      </Typography>
      { showEmailForm ? (
      <form onSubmit={saveEmail} className='form'>
        {createEmail && ( 
        <TextField
          type="text" 
          autoComplete="off"
          name="username"
          onChange={handleChange}
          label={errors.username ? errors.username : 'Insert username'}
          fullWidth
          
          value={email.username}
          error={Boolean(errors.username)}
        />)}
        <TextField
          type="password"
          autoComplete="off"
          name="password"
          onChange={handleChange}
          label={errors.password ? errors.password : 'Insert password'}
          fullWidth
          
          value={email.password}
          placeholder="At least 8 characters are required"
          error={Boolean(errors.password)}
        />
        <TextField
          type="password"
          autoComplete="off"
          name="passwordConfirmation"
          onChange={handleChange}
          label={errors.passwordConfirmation ? errors.passwordConfirmation : 'Retype password'}
          fullWidth
          
          value={email.passwordConfirmation}
          error={Boolean(errors.passwordConfirmation)}
        />
        <TextField
          type="number"
          autoComplete="off"
          name="quota"
          onChange={handleChange}
          label={errors.quota ? errors.quota : 'Enter a positive number'}
          fullWidth
          
          value={email.quota}
          error={Boolean(errors.quota)}
        />
        <div style={{ display: "flex" }}>
          <Button className="button-submit" type="submit">
            Submit
          </Button>
          <Button onClick={clearEmail} className="button-clear" type="button">
            Cancel
          </Button>
        </div>
      </form>
      ) : (
      <AddCircleIcon
        style={{ color: 'green', float: 'right' }}
        onClick={() => {setShowEmailForm(true)}}
      />
      )}
      {emailComponents()}
    </div>
  )
}

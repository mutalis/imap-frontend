import React from 'react'
import { useFormValidation } from './useFormValidation'
import { emailValidationRules } from './emailValidationRules'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as R from 'ramda'

const fetch = require('node-fetch')

const initialE = {id: null, username: '', quota: 0, password: '', passwordConfirmation: ''}

export const EmailForm = ({initialEmail=initialE, emails=[], setEmails=R.identity, createEmail=true, setEmailAction=R.identity}={}) => {

  const modifyEmailUrl = emailId => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/${emailId}`
    return R.partial(fetch, [url])
  }

  const createEmailUrl = () => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/`
    return R.partial(fetch, [url])
  }

  const checkStatus = response => {
    if (response.status === 200) return Promise.resolve(response)
    else return Promise.reject(new Error(response.statusText))
  }

  const saveEmail = () => {
    email.quota = Number(email.quota)
    if (createEmail) { // if user doesn't exist, create it
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(email),
      }
      console.log('Create Body payload:',config.body)
      createEmailUrl()(config)
      // .then(checkStatus)
      .then(response => response.json())
      .then(jsonEmail => {
        setEmails(prevEmails => ([...prevEmails,jsonEmail]))
        console.log('Fetch Create JsonEmail:',jsonEmail)
      })
      .catch(error => console.log('Create email error:',error))
    } else { // if user exists, update it
      const payload = {quota: email.quota, ...((email.password) && {password: email.password})}
      const config = {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      }
      console.log('Update Body payload:',config.body)
      modifyEmailUrl(email.id)(config)
      .then(checkStatus)
      .then(response => response.json())
      .then(jsonEmail => {
        const updatedEmails = emails.map(c => c.id === jsonEmail.id ? jsonEmail : c)
        setEmails(updatedEmails)
        console.log('Fetch Update JsonEmail:',jsonEmail)
      })
      .catch(error => console.log('Update email error:',error))
    }
    setEmailAction('')
  }

  const validate = emailValidationRules(createEmail? 'create': 'update', emails)
  const [email, errors, isDataSubmitting, handleChange, handleSubmit] = useFormValidation(initialEmail, validate, saveEmail)

  return (
    <form onSubmit={handleSubmit} className='form'>
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
        <Button disabled={isDataSubmitting} className="button-submit" type="submit">
          Submit
        </Button>
        <Button onClick={() => setEmailAction('')} className="button-clear" type="button">
          Cancel
        </Button>
      </div>
    </form>
  )
}

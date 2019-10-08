import { useFormValidation } from './useFormValidation'
import { domainValidationRules } from './domainValidationRules'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as R from 'ramda'

const fetch = require('node-fetch')

const initialD = {id: null, domainName: '', emailQuota: 0}

export const DomainForm = ({initialDomain=initialD, domains=[], setDomains=R.identity, createDomain=true, setDomainAction=R.identity}={}) => {

  const modifyDomainUrl = domainID => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/${domainID}`
    return R.partial(fetch, [url])
  }

  const createDomainUrl = () => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/`
    return R.partial(fetch, [url])
  }

  const checkStatus = response => {
    if (response.status === 200) return Promise.resolve(response)
    else return Promise.reject(new Error(response.statusText))
  }

  const saveDomain = () => {
    domain.emailQuota = Number(domain.emailQuota)
    if (createDomain) { // if user doesn't exist, create it
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(domain),
      }
      console.log('Create Body payload:',config.body)
      createDomainUrl()(config)
      // .then(checkStatus)
      .then(response => response.json())
      .then(jsonDomain => {
        setDomains(([...domains,jsonDomain]))
        console.log('Fetch Create jsonDomain:',jsonDomain)
      })
      .catch(error => console.log('Create domain error:',error))
    } else { // if user exists, update it
      const payload = {emailQuota: domain.emailQuota}
      const config = {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      }
      console.log('Update Body payload:',config.body)
      modifyDomainUrl(domain.id)(config)
      .then(checkStatus)
      .then(response => response.json())
      .then(jsonDomain => {
        const updatedDomains = domains.map(c => c.id === jsonDomain.id ? jsonDomain : c)
        setDomains(updatedDomains)
        console.log('Fetch Update jsonDomain:',jsonDomain)
      })
      .catch(error => console.log('Update domain error:',error))
    }
    setDomainAction('')
  }

  const validate = domainValidationRules(createDomain? 'create': 'update', domains)
  const [domain, errors, isDataSubmitting, handleChange, handleSubmit] = useFormValidation(initialDomain, validate, saveDomain)

  return (
    <form onSubmit={handleSubmit} className='form'>
      {createDomain && ( 
      <TextField
        type="text" 
        autoComplete="off"
        name="domainName"
        onChange={handleChange}
        label={errors.domainName ? errors.domainName : 'Enter Domain Name'}
        fullWidth
        value={domain.domainName}
        error={Boolean(errors.domainName)}
      />)}
      <TextField
        type="number"
        autoComplete="off"
        name="emailQuota"
        onChange={handleChange}
        label={errors.emailQuota ? errors.emailQuota : 'Enter a positive number'}
        fullWidth
        value={domain.emailQuota}
        error={Boolean(errors.emailQuota)}
      />
      <div style={{ display: "flex" }}>
        <Button disabled={isDataSubmitting} className="button-submit" type="submit">
          Submit
        </Button>
        <Button onClick={() => setDomainAction('')} className="button-clear" type="button">
          Cancel
        </Button>
      </div>
    </form>
  )
}
